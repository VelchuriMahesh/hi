import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  createPost,
  deletePost,
  duplicatePost,
  fetchAdminPosts,
  fetchBlogSettings,
  updateBlogSettings as updateBlogSettingsApi,
  updatePost
} from '../services/api';
import { uploadImageToImgbb } from '../services/uploaders';
import {
  BLOG_BASE_PATH,
  BLOG_STATUSES,
  DEFAULT_BLOG_AUTHOR,
  DEFAULT_BLOG_SETTINGS,
  calculateReadingTime,
  createEmptyBlogPost,
  createEmptyImage,
  encodeSimpleBlogContent,
  formatDate,
  getPostUrl,
  normalizeBlogSettings,
  normalizeImage,
  normalizePost,
  slugify
} from '../utils/blog';

const SECTION_COUNT = 5;
const AUTO_SAVE_KEY = 'shrusara-simple-blog-draft';
const LIVE_SITE_URL = 'https://www.shrusara.com';

function inputClass(extra = '') {
  return `w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa ${extra}`;
}

function labelClass() {
  return 'block space-y-2 text-sm font-medium text-stone-700';
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getPlainText(html = '') {
  if (typeof document !== 'undefined') {
    const element = document.createElement('div');
    element.innerHTML = html;
    return (element.textContent || element.innerText || '').trim();
  }

  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getLivePreviewUrl(pathOrUrl = '') {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    const url = new URL(pathOrUrl);
    url.protocol = 'https:';
    url.hostname = 'www.shrusara.com';
    return url.toString();
  }

  return new URL(pathOrUrl || '/', LIVE_SITE_URL).toString();
}

function getSectionHtml(source = {}) {
  if (source.html) return source.html;
  if (source.paragraph || source.text) return `<p>${escapeHtml(source.paragraph || source.text)}</p>`;
  return '';
}

function createSection(index, source = {}, fallbackAlt = '') {
  const html = getSectionHtml(source);

  return {
    id: source.id || `section-${index + 1}`,
    paragraph: source.paragraph || source.text || getPlainText(html),
    html,
    textType: source.textType || 'paragraph',
    textStyle: source.textStyle || 'classic',
    alignment: source.alignment || 'left',
    image: normalizeImage(source.image || source.imageUrl || '', source.image?.alt || source.alt || fallbackAlt),
    caption: source.caption || source.image?.caption || ''
  };
}

function normalizeSimpleForm(post = {}) {
  const normalized = normalizePost(post);
  const altText = normalized.altText || normalized.featuredImage?.alt || normalized.title || '';
  const rawFeaturedImage = normalizeImage(post.featuredImage || '', altText);
  const rawCoverImage = normalizeImage(post.coverImage || '', altText);
  const featuredImage = rawFeaturedImage.url ? rawFeaturedImage : rawCoverImage;
  const simpleSections = Array.from({ length: SECTION_COUNT }, (_, index) =>
    createSection(index, normalized.simpleSections?.[index], altText)
  );

  return {
    ...normalized,
    title: normalized.title || normalized.seoTitle || '',
    seoTitle: normalized.seoTitle || normalized.title || '',
    metaTitle: normalized.metaTitle || normalized.seoTitle || normalized.title || '',
    metaDescription: normalized.metaDescription || normalized.excerpt || '',
    featuredImage,
    altText,
    simpleSections
  };
}

function buildSimplePayload(form) {
  const title = (form.seoTitle || form.title || '').trim();
  const altText = (form.altText || title).trim();
  const simpleSections = Array.from({ length: SECTION_COUNT }, (_, index) => {
    const section = createSection(index, form.simpleSections?.[index], altText);
    const image = normalizeImage(section.image, altText);
    const html = section.html || (section.paragraph ? `<p>${escapeHtml(section.paragraph)}</p>` : '');
    const paragraph = getPlainText(html || section.paragraph);

    return {
      ...section,
      paragraph,
      html,
      caption: section.caption.trim(),
      image: {
        ...image,
        alt: image.alt || altText,
        caption: section.caption || image.caption
      }
    };
  });
  const uploadedHeroImage = normalizeImage(form.featuredImage || form.coverImage || '', altText);
  const firstSectionImage = simpleSections.find((section) => section.image.url)?.image || createEmptyImage({ alt: altText });
  const heroImage = uploadedHeroImage.url
    ? {
        ...uploadedHeroImage,
        alt: uploadedHeroImage.alt || altText,
        loading: 'eager'
      }
    : firstSectionImage;
  const paragraphs = simpleSections.map((section) => section.paragraph).filter(Boolean);
  const contentHtml = simpleSections.map((section) => section.html || (section.paragraph ? `<p>${escapeHtml(section.paragraph)}</p>` : '')).filter(Boolean).join('');
  const blocks = simpleSections.flatMap((section, index) => {
    const items = [];

    if (section.paragraph) {
      items.push({
        id: `${section.id}-paragraph`,
        type: 'paragraph',
        text: section.paragraph,
        html: section.html
      });
    }

    if (section.image.url) {
      items.push({
        id: `${section.id}-image`,
        type: 'image',
        image: section.image
      });
    }

    if (!items.length) {
      items.push({
        id: `${section.id}-empty`,
        type: 'paragraph',
        text: ''
      });
    }

    return items.map((item) => ({ ...item, order: index }));
  });

  return {
    ...form,
    title,
    seoTitle: title,
    metaTitle: title,
    metaDescription: form.metaDescription.trim(),
    excerpt: form.metaDescription.trim(),
    altText,
    slug: slugify(form.slug || title),
    author: form.author || DEFAULT_BLOG_AUTHOR,
    simpleSections,
    content: encodeSimpleBlogContent({
      metaDescription: form.metaDescription.trim(),
      altText,
      simpleSections
    }),
    contentHtml,
    blocks,
    featuredImage: heroImage,
    coverImage: heroImage.url,
    images: simpleSections.map((section) => section.image).filter((image) => image.url),
    openGraph: {
      ...(form.openGraph || {}),
      title,
      description: form.metaDescription.trim(),
      image: heroImage
    },
    twitter: {
      ...(form.twitter || {}),
      title,
      description: form.metaDescription.trim(),
      image: heroImage
    },
    facebook: {
      ...(form.facebook || {}),
      title,
      description: form.metaDescription.trim(),
      image: heroImage
    },
    social: {
      ...(form.social || {}),
      pinterestImage: heroImage
    }
  };
}

function sortPosts(items) {
  return [...items].sort((left, right) => {
    const leftDate = new Date(left.updatedAt || left.createdAt || 0).getTime();
    const rightDate = new Date(right.updatedAt || right.createdAt || 0).getTime();
    return rightDate - leftDate;
  });
}

function createNewSimpleBlog() {
  return normalizeSimpleForm({
    ...createEmptyBlogPost(),
    status: 'published',
    publishedAt: new Date().toISOString()
  });
}

function createInitialForm() {
  if (typeof window !== 'undefined') {
    try {
      const draft = window.localStorage.getItem(AUTO_SAVE_KEY);
      if (draft) return normalizeSimpleForm(JSON.parse(draft));
    } catch {
      window.localStorage.removeItem(AUTO_SAVE_KEY);
    }
  }

  return createNewSimpleBlog();
}

const textTypeOptions = [
  { value: 'paragraph', label: 'Paragraph', block: 'p' },
  { value: 'heading', label: 'Heading', block: 'h2' },
  { value: 'subheading', label: 'Sub Heading', block: 'h3' },
  { value: 'quote', label: 'Quote', block: 'blockquote' }
];

const textStyleOptions = [
  { value: 'classic', label: 'Classic' },
  { value: 'lead', label: 'Large Lead' },
  { value: 'highlight', label: 'Highlight Box' },
  { value: 'note', label: 'Soft Note' }
];

const alignOptions = [
  { value: 'left', label: 'Left', command: 'justifyLeft' },
  { value: 'center', label: 'Center', command: 'justifyCenter' },
  { value: 'right', label: 'Right', command: 'justifyRight' }
];

function RichTextSectionEditor({ index, section, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const nextHtml = section.html || '';
    if (document.activeElement !== editor && editor.innerHTML !== nextHtml) {
      editor.innerHTML = nextHtml;
    }
  }, [section.html]);

  function emit(extra = {}) {
    const editor = editorRef.current;
    const html = editor?.innerHTML || '';
    const paragraph = getPlainText(html);
    onChange({
      ...section,
      html,
      paragraph,
      ...extra
    });
  }

  function runCommand(command, value = null, extra = {}) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    emit(extra);
  }

  function applyTextType(value) {
    const option = textTypeOptions.find((item) => item.value === value) || textTypeOptions[0];
    runCommand('formatBlock', option.block, { textType: value });
  }

  function applyAlignment(value) {
    const option = alignOptions.find((item) => item.value === value) || alignOptions[0];
    runCommand(option.command, null, { alignment: value });
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-ink/10 bg-linen p-2">
        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none"
          value={section.textType || 'paragraph'}
          onChange={(event) => applyTextType(event.target.value)}
        >
          {textTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>

        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none"
          value={section.textStyle || 'classic'}
          onChange={(event) => emit({ textStyle: event.target.value })}
        >
          {textStyleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>

        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none"
          value={section.alignment || 'left'}
          onChange={(event) => applyAlignment(event.target.value)}
        >
          {alignOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>

        {[
          ['bold', 'B'],
          ['italic', 'I'],
          ['underline', 'U']
        ].map(([command, label]) => (
          <button
            key={command}
            className="min-w-10 rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-cocoa hover:text-cocoa"
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => runCommand(command)}
          >
            {label}
          </button>
        ))}

        <button
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:border-cocoa hover:text-cocoa"
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => runCommand('removeFormat')}
        >
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        className="min-h-72 rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm leading-7 text-ink outline-none transition focus:border-cocoa focus:ring-4 focus:ring-cocoa/10"
        contentEditable
        data-placeholder={`Write section ${index + 1} text here`}
        suppressContentEditableWarning
        onInput={() => emit()}
        onBlur={() => emit()}
        style={{ textAlign: section.alignment || 'left' }}
      />

      <p className="text-xs text-stone-500">
        Use paragraph type, text style, bold, italic, underline, and alignment. The same styling appears on the user blog page.
      </p>
    </div>
  );
}

function BlogImageInput({ index, section, altText, uploading, onChange, onUpload }) {
  const image = normalizeImage(section.image, altText);

  function updateImage(nextImage) {
    onChange({
      ...section,
      image: normalizeImage(nextImage, altText)
    });
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border-[6px] border-white bg-linen shadow-soft">
        {image.url ? (
          <img className="h-64 w-full object-cover" src={image.url} alt={image.alt || altText} />
        ) : (
          <div className="flex h-64 items-center justify-center px-6 text-center text-sm text-stone-500">
            Upload image {index + 1}
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-cocoa/50 bg-white px-3 py-3 text-sm font-semibold text-cocoa transition hover:bg-linen">
        {uploading ? 'Uploading...' : 'Upload or Replace Image'}
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(event) => onUpload(event.target.files?.[0], index)}
        />
      </label>

      <label className={labelClass()}>
        Image URL
        <input
          className={inputClass()}
          value={image.url}
          onChange={(event) => updateImage({ ...image, url: event.target.value })}
          placeholder="https://..."
        />
      </label>

      <label className={labelClass()}>
        Image File Name
        <input
          className={inputClass()}
          value={image.fileName}
          onChange={(event) => updateImage({ ...image, fileName: event.target.value })}
          placeholder="bridal-blouse-design-bangalore.webp"
        />
      </label>

      <label className={labelClass()}>
        Image Alt Text
        <input
          className={inputClass()}
          value={image.alt}
          onChange={(event) => updateImage({ ...image, alt: event.target.value })}
          placeholder={altText || `Describe image ${index + 1}`}
        />
      </label>

      <label className={labelClass()}>
        Caption
        <input
          className={inputClass()}
          value={section.caption || ''}
          onChange={(event) => onChange({ ...section, caption: event.target.value })}
          placeholder="Optional image caption"
        />
      </label>
    </div>
  );
}

function HeroImageInput({ image, altText, uploading, onChange, onUpload }) {
  const normalizedImage = normalizeImage(image, altText);

  function updateImage(nextImage) {
    onChange(normalizeImage(nextImage, altText));
  }

  return (
    <div className="space-y-3 rounded-2xl border border-ink/10 bg-linen p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">Hero Image</p>
        <p className="mt-1 text-xs leading-5 text-stone-500">
          Controls the public blog header and thumbnail. Section images remain separate below.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-soft">
        {normalizedImage.url ? (
          <img className="h-56 w-full object-cover" src={normalizedImage.url} alt={normalizedImage.alt || altText} />
        ) : (
          <div className="flex h-56 items-center justify-center px-6 text-center text-sm text-stone-500">
            Upload hero image
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-cocoa/50 bg-white px-3 py-3 text-sm font-semibold text-cocoa transition hover:bg-linen">
        {uploading ? 'Uploading...' : normalizedImage.url ? 'Replace Hero Image' : 'Upload Hero Image'}
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(event) => onUpload(event.target.files?.[0])}
        />
      </label>

      <label className={labelClass()}>
        Hero Image URL
        <input
          className={inputClass()}
          value={normalizedImage.url}
          onChange={(event) => updateImage({ ...normalizedImage, url: event.target.value })}
          placeholder="https://..."
        />
      </label>

      <label className={labelClass()}>
        Hero Image File Name
        <input
          className={inputClass()}
          value={normalizedImage.fileName}
          onChange={(event) => updateImage({ ...normalizedImage, fileName: event.target.value })}
          placeholder="bridal-fashion-blog-hero.webp"
        />
      </label>

      <label className={labelClass()}>
        Hero Image Alt Text
        <input
          className={inputClass()}
          value={normalizedImage.alt}
          onChange={(event) => updateImage({ ...normalizedImage, alt: event.target.value })}
          placeholder={altText || 'Describe the hero image'}
        />
      </label>

      <label className={labelClass()}>
        Hero Image Caption
        <input
          className={inputClass()}
          value={normalizedImage.caption}
          onChange={(event) => updateImage({ ...normalizedImage, caption: event.target.value })}
          placeholder="Optional hero caption"
        />
      </label>
    </div>
  );
}

const landingPageLabels = {
  bridal: 'Bridal blouse landing page',
  designer: 'Designer outfits landing page',
  occasionWear: 'Occasion wear landing page',
  readyToWearSaree: 'Ready to wear saree landing page'
};

function BlogSettingsPanel({
  settings,
  saving,
  message,
  onFieldChange,
  onLandingPageChange,
  onCategoryFieldChange,
  onCategoryFaqChange,
  onSave
}) {
  const normalized = normalizeBlogSettings(settings);

  return (
    <details open className="mb-6 rounded-[28px] bg-white p-5 shadow-soft md:p-7">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">CMS Settings</p>
            <h2 className="mt-1 font-heading text-3xl text-ink">Blog Settings &amp; Category Library</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Control public blog author content, contact CTA, WhatsApp message, category FAQs, primary CTAs, and blog landing links from one place.
            </p>
          </div>
          <button
            className="button-primary"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSave();
            }}
            disabled={saving}
          >
            {saving ? 'Saving Settings...' : 'Save Blog Settings'}
          </button>
        </div>
      </summary>

      {message ? (
        <div className="mt-5 rounded-2xl border border-cocoa/20 bg-linen px-4 py-3 text-sm font-medium text-ink">
          {message}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <label className={labelClass()}>
          About Author Heading
          <input
            className={inputClass()}
            value={normalized.aboutAuthorHeading}
            onChange={(event) => onFieldChange('aboutAuthorHeading', event.target.value)}
          />
        </label>

        <label className={labelClass()}>
          WhatsApp Button Text
          <input
            className={inputClass()}
            value={normalized.whatsappButtonText}
            onChange={(event) => onFieldChange('whatsappButtonText', event.target.value)}
          />
        </label>

        <label className={`${labelClass()} lg:col-span-2`}>
          About the Author
          <textarea
            className={inputClass('min-h-28')}
            value={normalized.aboutAuthor}
            onChange={(event) => onFieldChange('aboutAuthor', event.target.value)}
          />
        </label>

        <label className={labelClass()}>
          Contact Heading
          <input
            className={inputClass()}
            value={normalized.contactHeading}
            onChange={(event) => onFieldChange('contactHeading', event.target.value)}
          />
        </label>

        <label className={labelClass()}>
          WhatsApp Number
          <input
            className={inputClass()}
            value={normalized.whatsappNumber}
            onChange={(event) => onFieldChange('whatsappNumber', event.target.value)}
            placeholder="919741827558"
          />
        </label>

        <label className={`${labelClass()} lg:col-span-2`}>
          Contact Section Text
          <textarea
            className={inputClass('min-h-24')}
            value={normalized.contactText}
            onChange={(event) => onFieldChange('contactText', event.target.value)}
          />
        </label>

        <label className={`${labelClass()} lg:col-span-2`}>
          WhatsApp Message
          <textarea
            className={inputClass('min-h-20')}
            value={normalized.whatsappMessage}
            onChange={(event) => onFieldChange('whatsappMessage', event.target.value)}
          />
        </label>

        <label className={`${labelClass()} lg:col-span-2`}>
          Author Signature
          <textarea
            className={inputClass('min-h-28')}
            value={normalized.authorSignature}
            onChange={(event) => onFieldChange('authorSignature', event.target.value)}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['homepageUrl', 'Homepage URL'],
          ['aboutUrl', 'About URL'],
          ['contactUrl', 'Contact URL']
        ].map(([field, label]) => (
          <label key={field} className={labelClass()}>
            {label}
            <input
              className={inputClass()}
              value={normalized[field]}
              onChange={(event) => onFieldChange(field, event.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Landing Page URLs</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {Object.entries(normalized.landingPages).map(([key, value]) => (
            <label key={key} className={labelClass()}>
              {landingPageLabels[key] || key}
              <input
                className={inputClass()}
                value={value}
                onChange={(event) => onLandingPageChange(key, event.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Category FAQs &amp; CTAs</p>
        {Object.entries(normalized.categories).map(([category, config]) => (
          <details key={category} className="rounded-2xl border border-ink/10 bg-linen p-4">
            <summary className="cursor-pointer font-heading text-xl text-ink">{category}</summary>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className={`${labelClass()} lg:col-span-2`}>
                Category Purpose
                <input
                  className={inputClass()}
                  value={config.purpose}
                  onChange={(event) => onCategoryFieldChange(category, 'purpose', event.target.value)}
                />
              </label>
              <label className={labelClass()}>
                Primary CTA
                <input
                  className={inputClass()}
                  value={config.primaryCta}
                  onChange={(event) => onCategoryFieldChange(category, 'primaryCta', event.target.value)}
                />
              </label>
              <label className={labelClass()}>
                Primary CTA Link
                <input
                  className={inputClass()}
                  value={config.primaryCtaLink}
                  onChange={(event) => onCategoryFieldChange(category, 'primaryCtaLink', event.target.value)}
                />
              </label>
              <label className={`${labelClass()} lg:col-span-2`}>
                CTA Description
                <textarea
                  className={inputClass('min-h-20')}
                  value={config.ctaDescription}
                  onChange={(event) => onCategoryFieldChange(category, 'ctaDescription', event.target.value)}
                />
              </label>
              <label className={`${labelClass()} lg:col-span-2`}>
                Developer Note
                <input
                  className={inputClass()}
                  value={config.developerNote}
                  onChange={(event) => onCategoryFieldChange(category, 'developerNote', event.target.value)}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-4">
              {config.faqs.map((faq, index) => (
                <div key={faq.id || index} className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">FAQ {index + 1}</p>
                  <div className="mt-3 grid gap-3 lg:grid-cols-2">
                    <label className={labelClass()}>
                      Question
                      <input
                        className={inputClass()}
                        value={faq.question}
                        onChange={(event) => onCategoryFaqChange(category, index, 'question', event.target.value)}
                      />
                    </label>
                    <label className={labelClass()}>
                      Answer
                      <textarea
                        className={inputClass('min-h-20')}
                        value={faq.answer}
                        onChange={(event) => onCategoryFaqChange(category, index, 'answer', event.target.value)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </details>
  );
}

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(createInitialForm);
  const [blogSettings, setBlogSettings] = useState(() => normalizeBlogSettings(DEFAULT_BLOG_SETTINGS));
  const [selectedId, setSelectedId] = useState(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  const token = getAdminToken();

  useEffect(() => {
    loadPosts();
    loadBlogSettings();
  }, []);

  useEffect(() => {
    const draft = buildSimplePayload(form);
    window.localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(draft));
  }, [form]);

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const items = sortPosts(posts);

    if (!term) return items;

    return items.filter((post) =>
      [post.title, post.seoTitle, post.metaDescription, post.category, post.author, post.status]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [posts, query]);

  const normalizedBlogSettings = useMemo(() => normalizeBlogSettings(blogSettings), [blogSettings]);
  const categoryNames = useMemo(() => Object.keys(normalizedBlogSettings.categories), [normalizedBlogSettings]);
  const relatedCandidates = useMemo(
    () => sortPosts(posts).filter((post) => post.id && post.id !== selectedId),
    [posts, selectedId]
  );
  const previewUrl = form.slug ? getLivePreviewUrl(getPostUrl(form)) : getLivePreviewUrl(`${BLOG_BASE_PATH}/new-blog`);
  const completedSections = form.simpleSections.filter((section) => section.paragraph || section.html || section.image?.url).length;

  async function loadPosts() {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetchAdminPosts(token);
      setPosts((response.items || []).map(normalizeSimpleForm));
    } catch (error) {
      setMessage(error.message || 'Unable to load blogs.');
    } finally {
      setLoading(false);
    }
  }

  async function loadBlogSettings() {
    try {
      const response = await fetchBlogSettings();
      setBlogSettings(normalizeBlogSettings(response.item));
    } catch {
      setBlogSettings(normalizeBlogSettings(DEFAULT_BLOG_SETTINGS));
    }
  }

  function updateBlogSettingsField(field, value) {
    setBlogSettings((current) => normalizeBlogSettings({
      ...current,
      [field]: value
    }));
  }

  function updateLandingPage(key, value) {
    setBlogSettings((current) => {
      const settings = normalizeBlogSettings(current);
      return normalizeBlogSettings({
        ...settings,
        landingPages: {
          ...settings.landingPages,
          [key]: value
        }
      });
    });
  }

  function updateCategoryField(category, field, value) {
    setBlogSettings((current) => {
      const settings = normalizeBlogSettings(current);
      return normalizeBlogSettings({
        ...settings,
        categories: {
          ...settings.categories,
          [category]: {
            ...settings.categories[category],
            [field]: value
          }
        }
      });
    });
  }

  function updateCategoryFaq(category, index, field, value) {
    setBlogSettings((current) => {
      const settings = normalizeBlogSettings(current);
      const config = settings.categories[category] || {};
      const faqs = [...(config.faqs || [])];
      faqs[index] = {
        ...(faqs[index] || { id: `faq-${index + 1}`, question: '', answer: '' }),
        [field]: value
      };

      return normalizeBlogSettings({
        ...settings,
        categories: {
          ...settings.categories,
          [category]: {
            ...config,
            faqs
          }
        }
      });
    });
  }

  async function saveBlogSettings() {
    setSettingsSaving(true);
    setSettingsMessage('');

    try {
      const payload = normalizeBlogSettings(blogSettings);
      delete payload.id;
      delete payload.createdAt;
      delete payload.updatedAt;
      const response = await updateBlogSettingsApi(token, payload);
      setBlogSettings(normalizeBlogSettings(response.item || payload));
      setSettingsMessage(
        response.localOnly
          ? 'Blog settings saved for this local preview. Public blog pages in this browser now use these CMS values.'
          : 'Blog settings saved. Public blog pages now use these CMS values.'
      );
    } catch (error) {
      setSettingsMessage(error.message || 'Unable to save blog settings.');
    } finally {
      setSettingsSaving(false);
    }
  }

  function startNewBlog() {
    setSelectedId(null);
    setSlugEdited(false);
    setMessage('');
    setForm(createNewSimpleBlog());
  }

  function editPost(post) {
    setSelectedId(post.id);
    setSlugEdited(Boolean(post.slug));
    setMessage('');
    setForm(normalizeSimpleForm(post));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateTitle(value) {
    setForm((current) => ({
      ...current,
      title: value,
      seoTitle: value,
      metaTitle: value,
      slug: slugEdited ? current.slug : slugify(value)
    }));
  }

  function updateSection(index, nextSection) {
    setForm((current) => ({
      ...current,
      simpleSections: current.simpleSections.map((section, currentIndex) =>
        currentIndex === index ? createSection(index, nextSection, current.altText) : section
      )
    }));
  }

  function updateRelatedPost(index, value) {
    setForm((current) => {
      const relatedPostIds = [...(current.relatedPostIds || [])];
      relatedPostIds[index] = value;
      const selectedIds = relatedPostIds.filter(Boolean);

      return {
        ...current,
        relatedMode: selectedIds.length ? 'manual' : 'auto',
        relatedPostIds: selectedIds
      };
    });
  }

  async function uploadHeroImage(file) {
    if (!file) return;

    setUploadingHeroImage(true);
    setMessage('');

    try {
      const uploaded = await uploadImageToImgbb(file);
      setForm((current) => ({
        ...current,
        featuredImage: createEmptyImage({
          url: uploaded.url,
          alt: current.altText || current.seoTitle || current.title,
          fileName: file.name,
          format: file.type.split('/')[1] || '',
          loading: 'eager'
        })
      }));
    } catch (error) {
      setMessage(error.message || 'Hero image upload failed.');
    } finally {
      setUploadingHeroImage(false);
    }
  }

  async function uploadSectionImage(file, index) {
    if (!file) return;

    setUploadingIndex(index);
    setMessage('');

    try {
      const uploaded = await uploadImageToImgbb(file);
      setForm((current) => ({
        ...current,
        simpleSections: current.simpleSections.map((section, currentIndex) =>
          currentIndex === index
            ? {
                ...section,
                image: createEmptyImage({
                  url: uploaded.url,
                  alt: current.altText || current.seoTitle || current.title,
                  fileName: file.name,
                  format: file.type.split('/')[1] || '',
                  loading: 'lazy'
                })
              }
            : section
        )
      }));
    } catch (error) {
      setMessage(error.message || 'Image upload failed.');
    } finally {
      setUploadingIndex(null);
    }
  }

  async function persistPost() {
    setSaving(true);
    setMessage('');

    try {
      const payload = buildSimplePayload(form);

      if (!payload.title) {
        setMessage('SEO Title is required.');
        return null;
      }

      const response = selectedId
        ? await updatePost(token, selectedId, payload)
        : await createPost(token, payload);

      const savedPost = normalizeSimpleForm(response.item);
      setSelectedId(savedPost.id);
      setSlugEdited(true);
      setForm(savedPost);
      setPosts((current) => {
        const withoutSaved = current.filter((post) => post.id !== savedPost.id);
        return sortPosts([savedPost, ...withoutSaved]);
      });
      window.localStorage.removeItem(AUTO_SAVE_KEY);
      setMessage('Blog saved. It will reflect on the user blog page when published.');
      return savedPost;
    } catch (error) {
      setMessage(error.message || 'Unable to save blog.');
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function savePost(event) {
    event.preventDefault();
    await persistPost();
  }

  async function saveAndPreview() {
    const previewWindow = window.open('about:blank', '_blank');
    const savedPost = await persistPost();

    if (savedPost?.slug) {
      if (previewWindow) {
        previewWindow.location.href = getLivePreviewUrl(getPostUrl(savedPost));
      } else {
        window.location.href = getLivePreviewUrl(getPostUrl(savedPost));
      }
    } else if (previewWindow) {
      previewWindow.close();
    }
  }

  async function removePost(post) {
    if (!window.confirm(`Delete "${post.title}"?`)) return;

    setMessage('');

    try {
      await deletePost(token, post.id);
      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (selectedId === post.id) startNewBlog();
      setMessage('Blog deleted.');
    } catch (error) {
      setMessage(error.message || 'Unable to delete blog.');
    }
  }

  async function duplicateExistingPost(post) {
    setMessage('');

    try {
      const response = await duplicatePost(token, post.id);
      const copy = normalizeSimpleForm(response.item);
      setPosts((current) => sortPosts([copy, ...current]));
      editPost(copy);
      setMessage('Blog duplicated as a draft.');
    } catch (error) {
      setMessage(error.message || 'Unable to duplicate blog.');
    }
  }

  return (
    <>
      <PageMeta
        title="Simple Blog Manager | Shrusara Admin"
        description="Create SEO-friendly Shrusara blog posts with five image and paragraph sections."
        robots="noindex,nofollow"
      />

      <main className="min-h-screen bg-linen px-4 py-8 text-ink">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cocoa">Admin Blog</p>
              <h1 className="mt-2 font-heading text-4xl text-ink">Simple Blog Editor</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                Add SEO title, meta description, one alt text, and five paragraph/image sections. Published blogs appear automatically on the public blog page.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link className="button-secondary" to="/admin">Back to Dashboard</Link>
              <button className="button-primary" type="button" onClick={startNewBlog}>New Blog</button>
            </div>
          </div>

          {message ? (
            <div className="mb-5 rounded-2xl border border-cocoa/20 bg-white px-4 py-3 text-sm font-medium text-ink shadow-soft">
              {message}
            </div>
          ) : null}

          <BlogSettingsPanel
            settings={normalizedBlogSettings}
            saving={settingsSaving}
            message={settingsMessage}
            onFieldChange={updateBlogSettingsField}
            onLandingPageChange={updateLandingPage}
            onCategoryFieldChange={updateCategoryField}
            onCategoryFaqChange={updateCategoryFaq}
            onSave={saveBlogSettings}
          />

          <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <aside className="space-y-4">
              <div className="rounded-[28px] bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-heading text-2xl">Blogs</h2>
                  <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa">{posts.length}</span>
                </div>
                <input
                  className={`${inputClass()} mt-4`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search blogs"
                />

                <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10">
                  {loading ? (
                    <p className="bg-white p-4 text-sm text-stone-500">Loading blogs...</p>
                  ) : filteredPosts.length ? (
                    filteredPosts.map((post) => (
                      <article key={post.id} className="border-b border-ink/10 bg-white p-4 last:border-b-0">
                        <button className="block w-full text-left" type="button" onClick={() => editPost(post)}>
                          <span className="text-sm font-semibold text-ink">{post.title || 'Untitled blog'}</span>
                          <span className="mt-1 block text-xs text-stone-500">
                            {post.category} | {post.status} | {formatDate(post.updatedAt || post.createdAt)}
                          </span>
                        </button>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink" type="button" onClick={() => editPost(post)}>Edit</button>
                          <a className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink" href={getLivePreviewUrl(getPostUrl(post))} target="_blank" rel="noreferrer">Preview</a>
                          <button className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink" type="button" onClick={() => duplicateExistingPost(post)}>Duplicate</button>
                          <button className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600" type="button" onClick={() => removePost(post)}>Delete</button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="bg-white p-4 text-sm text-stone-500">No blogs found.</p>
                  )}
                </div>
              </div>
            </aside>

            <form className="space-y-6" onSubmit={savePost}>
              <section className="rounded-[28px] bg-white p-5 shadow-soft md:p-7">
                <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-4">
                    <label className={labelClass()}>
                      SEO Title
                      <input
                        className={inputClass()}
                        value={form.seoTitle}
                        onChange={(event) => updateTitle(event.target.value)}
                        placeholder="Example: Bridal Blouse Designs in Bangalore"
                        required
                      />
                    </label>

                    <label className={labelClass()}>
                      Meta Description
                      <textarea
                        className={inputClass('min-h-28')}
                        value={form.metaDescription}
                        onChange={(event) => updateField('metaDescription', event.target.value)}
                        placeholder="Write the short Google description for this blog."
                      />
                    </label>

                    <label className={labelClass()}>
                      Alt Text
                      <input
                        className={inputClass()}
                        value={form.altText}
                        onChange={(event) => updateField('altText', event.target.value)}
                        placeholder="Describe the blog images for SEO and accessibility"
                      />
                    </label>

                    <HeroImageInput
                      image={form.featuredImage}
                      altText={form.altText || form.seoTitle || form.title}
                      uploading={uploadingHeroImage}
                      onChange={(nextImage) => updateField('featuredImage', nextImage)}
                      onUpload={uploadHeroImage}
                    />
                  </div>

                  <div className="rounded-2xl bg-linen p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Publish</p>
                    <label className={`${labelClass()} mt-4`}>
                      Status
                      <select className={inputClass()} value={form.status} onChange={(event) => updateField('status', event.target.value)}>
                        {BLOG_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </label>
                    <label className={`${labelClass()} mt-4`}>
                      URL Slug
                      <input
                        className={inputClass()}
                        value={form.slug}
                        onChange={(event) => {
                          setSlugEdited(true);
                          updateField('slug', slugify(event.target.value));
                        }}
                      />
                    </label>
                    <label className={`${labelClass()} mt-4`}>
                      Category
                      <select className={inputClass()} value={form.category} onChange={(event) => updateField('category', event.target.value)}>
                        {categoryNames.map((category) => <option key={category} value={category}>{category}</option>)}
                      </select>
                    </label>
                    <label className={`${labelClass()} mt-4`}>
                      Author
                      <input className={inputClass()} value={form.author} onChange={(event) => updateField('author', event.target.value)} />
                    </label>
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-medium text-stone-700">Related Blogs</p>
                      {[0, 1, 2].map((index) => (
                        <label key={index} className={labelClass()}>
                          Related Blog {index + 1}
                          <select
                            className={inputClass()}
                            value={form.relatedPostIds?.[index] || ''}
                            onChange={(event) => updateRelatedPost(index, event.target.value)}
                          >
                            <option value="">Auto / None</option>
                            {relatedCandidates.map((post) => (
                              <option key={post.id} value={post.id}>{post.title || 'Untitled blog'}</option>
                            ))}
                          </select>
                        </label>
                      ))}
                    </div>
                    <div className="mt-5 rounded-xl bg-white p-4 text-sm text-stone-600">
                      <p><span className="font-semibold text-ink">URL:</span> {previewUrl}</p>
                      <p className="mt-2"><span className="font-semibold text-ink">Sections:</span> {completedSections}/5</p>
                      <p className="mt-2"><span className="font-semibold text-ink">Reading time:</span> {calculateReadingTime(buildSimplePayload(form))} min read</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                {form.simpleSections.map((section, index) => (
                  <article key={section.id} className="rounded-[28px] bg-white p-5 shadow-soft md:p-7">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">Blog Section {index + 1}</p>
                        <h2 className="mt-1 font-heading text-2xl text-ink">Paragraph + Image</h2>
                      </div>
                      <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-stone-600">Frame {index + 1}</span>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-stone-700">Text {index + 1}</p>
                        <RichTextSectionEditor
                          index={index}
                          section={section}
                          onChange={(nextSection) => updateSection(index, nextSection)}
                        />
                      </div>

                      <BlogImageInput
                        index={index}
                        section={section}
                        altText={form.altText || form.seoTitle}
                        uploading={uploadingIndex === index}
                        onChange={(nextSection) => updateSection(index, nextSection)}
                        onUpload={uploadSectionImage}
                      />
                    </div>
                  </article>
                ))}
              </section>

              <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-soft backdrop-blur">
                <div className="text-sm text-stone-600">
                  <span className="font-semibold text-ink">{selectedId ? 'Editing existing blog' : 'Creating new blog'}</span>
                  <span className="ml-2">Autosaved locally while you type.</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="button-secondary" type="button" onClick={saveAndPreview} disabled={saving}>
                    Save & Preview
                  </button>
                  <button className="button-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving...' : selectedId ? 'Update Blog' : 'Publish Blog'}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
