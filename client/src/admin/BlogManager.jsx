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
  getBlogCategoryConfig,
  getPostUrl,
  normalizeBlogSettings,
  normalizeImage,
  normalizePost,
  slugify
} from '../utils/blog';

const SECTION_COUNT = 5;
const AUTO_SAVE_KEY = 'shrusara-simple-blog-draft';
const LIVE_SITE_URL = 'https://www.shrusara.com';
const BLOG_PAGE_SIZES = [10, 25, 50];
const BLOG_SORT_OPTIONS = [
  { value: 'updated-desc', label: 'Recently Updated' },
  { value: 'created-desc', label: 'Newest Created' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'status-asc', label: 'Status' }
];

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

function sanitizeSectionHtml(html = '') {
  return String(html || '')
    .replace(/\s(?:class|style|id|dir|lang|face|size|color)=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/<\/?font\b[^>]*>/gi, '')
    .replace(/<\/?span\b[^>]*>/gi, '');
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
  if (source.html) return sanitizeSectionHtml(source.html);
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
  const title = (form.title || form.seoTitle || '').trim();
  const seoTitle = (form.seoTitle || title).trim();
  const metaTitle = seoTitle;
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
    seoTitle,
    metaTitle,
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
      title: seoTitle,
      description: form.metaDescription.trim(),
      image: heroImage
    },
    twitter: {
      ...(form.twitter || {}),
      title: seoTitle,
      description: form.metaDescription.trim(),
      image: heroImage
    },
    facebook: {
      ...(form.facebook || {}),
      title: seoTitle,
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

function sortBlogs(items, sortMode = 'updated-desc') {
  return [...items].sort((left, right) => {
    if (sortMode === 'title-asc') {
      return String(left.title || left.seoTitle || '').localeCompare(String(right.title || right.seoTitle || ''));
    }

    if (sortMode === 'status-asc') {
      return String(left.status || '').localeCompare(String(right.status || ''))
        || String(left.title || '').localeCompare(String(right.title || ''));
    }

    const leftDateField = sortMode === 'created-desc' ? left.createdAt : left.updatedAt || left.createdAt;
    const rightDateField = sortMode === 'created-desc' ? right.createdAt : right.updatedAt || right.createdAt;
    return new Date(rightDateField || 0).getTime() - new Date(leftDateField || 0).getTime();
  });
}

function getStatusBadgeClass(status = '') {
  if (status === 'published') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'draft') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (status === 'scheduled') return 'border-sky-200 bg-sky-50 text-sky-700';
  if (status === 'private') return 'border-stone-200 bg-stone-100 text-stone-600';
  return 'border-ink/10 bg-linen text-stone-600';
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
    const html = sanitizeSectionHtml(editor?.innerHTML || '');
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

  function handlePaste(event) {
    const text = event.clipboardData?.getData('text/plain');
    if (!text) return;

    event.preventDefault();
    const html = text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
      .join('');

    document.execCommand('insertHTML', false, html);
    emit();
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
        onPaste={handlePaste}
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">CMS Global Fields</p>
            <h2 className="mt-1 font-heading text-3xl text-ink">Editable Blog Settings &amp; Category Library</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Edit the About the Author text, contact section, WhatsApp message, category FAQs, CTAs, and blog landing links from one place.
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
          About the Author Text
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
          Contact Text
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

      <div className="mt-6 flex justify-end">
        <button
          className="button-primary"
          type="button"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving Settings...' : 'Save Blog Settings'}
        </button>
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
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortMode, setSortMode] = useState('updated-desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter, categoryFilter, sortMode, pageSize]);

  const normalizedBlogSettings = useMemo(() => normalizeBlogSettings(blogSettings), [blogSettings]);
  const categoryNames = useMemo(() => Object.keys(normalizedBlogSettings.categories), [normalizedBlogSettings]);
  const blogStats = useMemo(() => {
    const statusCounts = posts.reduce((counts, post) => {
      const status = post.status || 'draft';
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    return {
      total: posts.length,
      published: statusCounts.published || 0,
      draft: statusCounts.draft || 0,
      scheduled: statusCounts.scheduled || 0,
      private: statusCounts.private || 0
    };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const items = sortBlogs(posts, sortMode);

    return items.filter((post) => {
      const matchesSearch = !term || [post.title, post.seoTitle, post.metaDescription, post.category, post.author, post.status, post.slug]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term);
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, query, statusFilter, categoryFilter, sortMode]);

  const selectedCategoryConfig = useMemo(
    () => getBlogCategoryConfig(normalizedBlogSettings, form.category),
    [normalizedBlogSettings, form.category]
  );
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * pageSize;
  const pageEndIndex = Math.min(pageStartIndex + pageSize, filteredPosts.length);
  const paginatedPosts = filteredPosts.slice(pageStartIndex, pageEndIndex);
  const relatedCandidates = useMemo(
    () => sortPosts(posts).filter((post) => post.id && post.id !== selectedId),
    [posts, selectedId]
  );
  const cleanPreviewSlug = slugify(form.slug || form.title || form.seoTitle);
  const previewUrl = cleanPreviewSlug
    ? getLivePreviewUrl(getPostUrl({ ...form, slug: cleanPreviewSlug }))
    : getLivePreviewUrl(`${BLOG_BASE_PATH}/new-blog`);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  function updateBlogTitle(value) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugEdited ? current.slug : slugify(value)
    }));
  }

  function updateSeoTitle(value) {
    setForm((current) => ({
      ...current,
      seoTitle: value,
      metaTitle: value
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
          alt: current.altText || current.title || current.seoTitle,
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
                  alt: current.altText || current.title || current.seoTitle,
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
        setMessage('Blog Title/H1 is required.');
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
        title="Advanced Blog Manager | Shrusara Admin"
        description="Create, filter, edit, and publish SEO-friendly Shrusara blog posts from the admin panel."
        robots="noindex,nofollow"
      />

      <main className="min-h-screen bg-linen px-4 py-8 text-ink">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 rounded-[32px] bg-white p-5 shadow-soft md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cocoa">Admin Blog</p>
                <h1 className="mt-2 font-heading text-4xl text-ink">Advanced Blog Manager</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                  Create, search, filter, duplicate, and update 100+ blogs without losing your place.
                  Category CTA and Q&A content auto-load from Blog Settings.
              </p>
            </div>
              <div className="flex flex-wrap gap-2">
              <Link className="button-secondary" to="/admin">Back to Dashboard</Link>
                <button className="button-primary" type="button" onClick={startNewBlog}>
                  + Create New Blog
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ['Total Blogs', blogStats.total],
                ['Published', blogStats.published],
                ['Drafts', blogStats.draft],
                ['Scheduled', blogStats.scheduled],
                ['Private', blogStats.private]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-ink/10 bg-linen px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{label}</p>
                  <p className="mt-1 font-heading text-3xl text-ink">{value}</p>
                </div>
              ))}
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
            <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[28px] bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">Blog Library</p>
                    <h2 className="mt-1 font-heading text-2xl">Manage Blogs</h2>
                  </div>
                  <button
                    className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-soft"
                    type="button"
                    onClick={startNewBlog}
                  >
                    + New
                  </button>
                </div>

                <input
                  className={`${inputClass()} mt-4`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, slug, category, status..."
                />

                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    Status
                    <select className={`${inputClass()} mt-1`} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                      <option value="all">All Statuses</option>
                      {BLOG_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </label>

                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    Category
                    <select className={`${inputClass()} mt-1`} value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                      <option value="all">All Categories</option>
                      {categoryNames.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </label>

                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    Sort
                    <select className={`${inputClass()} mt-1`} value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
                      {BLOG_SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </label>

                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    Per Page
                    <select className={`${inputClass()} mt-1`} value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                      {BLOG_PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                    </select>
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-stone-500">
                  <span>
                    Showing {filteredPosts.length ? pageStartIndex + 1 : 0}-{pageEndIndex} of {filteredPosts.length}
                  </span>
                  <button
                    className="text-cocoa"
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setStatusFilter('all');
                      setCategoryFilter('all');
                      setSortMode('updated-desc');
                    }}
                  >
                    Clear filters
                  </button>
                </div>

                <div className="mt-4 max-h-[68vh] overflow-y-auto rounded-2xl border border-ink/10">
                  {loading ? (
                    <p className="bg-white p-4 text-sm text-stone-500">Loading blogs...</p>
                  ) : paginatedPosts.length ? (
                    paginatedPosts.map((post) => {
                      const isSelected = selectedId === post.id;

                      return (
                        <article
                          key={post.id}
                          className={`border-b border-ink/10 bg-white p-4 transition last:border-b-0 ${isSelected ? 'bg-linen ring-2 ring-cocoa/25' : 'hover:bg-linen/60'}`}
                        >
                          <button className="block w-full text-left" type="button" onClick={() => editPost(post)}>
                            <span className="line-clamp-2 text-sm font-semibold leading-5 text-ink">{post.title || 'Untitled blog'}</span>
                            <span className="mt-2 flex flex-wrap items-center gap-2">
                              <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${getStatusBadgeClass(post.status)}`}>
                                {post.status || 'draft'}
                              </span>
                              <span className="rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                                {post.category || 'No category'}
                              </span>
                            </span>
                            <span className="mt-2 block text-xs text-stone-500">
                              Updated {formatDate(post.updatedAt || post.createdAt)}
                            </span>
                          </button>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink" type="button" onClick={() => editPost(post)}>Edit</button>
                            <a className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink" href={getLivePreviewUrl(getPostUrl(post))} target="_blank" rel="noreferrer">Preview</a>
                            <button className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink" type="button" onClick={() => duplicateExistingPost(post)}>Duplicate</button>
                            <button className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-600" type="button" onClick={() => removePost(post)}>Delete</button>
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <div className="bg-white p-5 text-sm text-stone-500">
                      <p>No blogs found for these filters.</p>
                      <button className="mt-3 text-sm font-semibold text-cocoa" type="button" onClick={startNewBlog}>
                        Create a new blog
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink disabled:opacity-40"
                    type="button"
                    disabled={safeCurrentPage <= 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  >
                    Previous
                  </button>
                  <span className="text-xs font-semibold text-stone-500">
                    Page {safeCurrentPage} of {totalPages}
                  </span>
                  <button
                    className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink disabled:opacity-40"
                    type="button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </aside>

            <form className="space-y-6" onSubmit={savePost}>
              <section className="rounded-[28px] bg-white p-5 shadow-soft md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
                      {selectedId ? 'Editing Blog' : 'Create New Blog'}
                    </p>
                    <h2 className="mt-2 font-heading text-3xl text-ink">
                      {form.title || 'Untitled Blog Draft'}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {selectedId
                        ? 'Update the article details below. Changes are saved when you click Update Blog.'
                        : 'Fill the SEO details, choose a category, add images and sections, then create the blog.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusBadgeClass(form.status)}`}>
                      {form.status || 'draft'}
                    </span>
                    {selectedId ? (
                      <button className="button-secondary" type="button" onClick={startNewBlog}>
                        + Create Another
                      </button>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] bg-white p-5 shadow-soft md:p-7">
                <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-4">
                    <label className={labelClass()}>
                      Blog Title / H1
                      <input
                        className={inputClass()}
                        value={form.title}
                        onChange={(event) => updateBlogTitle(event.target.value)}
                        placeholder="Example: Bridal Blouse Bangalore - A Simple Guide"
                        required
                      />
                      <span className="block text-xs font-normal leading-5 text-stone-500">
                        This is the title readers see on the blog page.
                      </span>
                    </label>

                    <label className={labelClass()}>
                      SEO Title
                      <input
                        className={inputClass()}
                        value={form.seoTitle}
                        onChange={(event) => updateSeoTitle(event.target.value)}
                        placeholder="Example: Bridal Blouse Designs in Bangalore | Shrusara"
                      />
                      <span className="block text-xs font-normal leading-5 text-stone-500">
                        Used only for page title, meta SEO, and social preview title. If blank, Blog Title is used.
                      </span>
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
                      altText={form.altText || form.title || form.seoTitle}
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
                          updateField('slug', event.target.value.toLowerCase());
                        }}
                        onBlur={() => updateField('slug', slugify(form.slug || form.title || form.seoTitle))}
                        placeholder="best-bridal-blouse-design"
                      />
                      <span className="block text-xs font-normal leading-5 text-stone-500">
                        Type 3-4 words with spaces, hyphens, or symbols. It saves as a clean hyphen URL.
                      </span>
                    </label>
                    <label className={`${labelClass()} mt-4`}>
                      Category
                      <select className={inputClass()} value={form.category} onChange={(event) => updateField('category', event.target.value)}>
                        {categoryNames.map((category) => <option key={category} value={category}>{category}</option>)}
                      </select>
                    </label>
                    <div className="mt-4 rounded-2xl border border-cocoa/15 bg-white p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">Auto-loaded category content</p>
                          <h3 className="mt-2 font-heading text-xl text-ink">{selectedCategoryConfig.name}</h3>
                          <p className="mt-1 text-sm leading-6 text-stone-600">
                            These FAQ and CTA fields load from the selected category and are editable here.
                          </p>
                        </div>
                        <button
                          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          type="button"
                          onClick={saveBlogSettings}
                          disabled={settingsSaving}
                        >
                          {settingsSaving ? 'Saving...' : 'Save CMS'}
                        </button>
                      </div>

                      <label className={`${labelClass()} mt-4`}>
                        Category Purpose
                        <input
                          className={inputClass()}
                          value={selectedCategoryConfig.purpose || ''}
                          onChange={(event) => updateCategoryField(selectedCategoryConfig.name, 'purpose', event.target.value)}
                        />
                      </label>

                      <div className="mt-4 grid gap-3">
                        <label className={labelClass()}>
                          CTA Text
                          <input
                            className={inputClass()}
                            value={selectedCategoryConfig.primaryCta || ''}
                            onChange={(event) => updateCategoryField(selectedCategoryConfig.name, 'primaryCta', event.target.value)}
                          />
                        </label>
                        <label className={labelClass()}>
                          CTA Link
                          <input
                            className={inputClass()}
                            value={selectedCategoryConfig.primaryCtaLink || ''}
                            onChange={(event) => updateCategoryField(selectedCategoryConfig.name, 'primaryCtaLink', event.target.value)}
                          />
                        </label>
                        <label className={labelClass()}>
                          CTA Description
                          <textarea
                            className={inputClass('min-h-20')}
                            value={selectedCategoryConfig.ctaDescription || ''}
                            onChange={(event) => updateCategoryField(selectedCategoryConfig.name, 'ctaDescription', event.target.value)}
                          />
                        </label>
                      </div>

                      <div className="mt-4 space-y-3">
                        {(selectedCategoryConfig.faqs || []).map((faq, index) => (
                          <div key={faq.id || index} className="rounded-xl border border-ink/10 bg-linen p-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">FAQ {index + 1}</p>
                            <label className={`${labelClass()} mt-3`}>
                              Question
                              <input
                                className={inputClass()}
                                value={faq.question || ''}
                                onChange={(event) => updateCategoryFaq(selectedCategoryConfig.name, index, 'question', event.target.value)}
                              />
                            </label>
                            <label className={`${labelClass()} mt-3`}>
                              Answer
                              <textarea
                                className={inputClass('min-h-20')}
                                value={faq.answer || ''}
                                onChange={(event) => updateCategoryFaq(selectedCategoryConfig.name, index, 'answer', event.target.value)}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
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
                        altText={form.altText || form.title || form.seoTitle}
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
                    {saving ? 'Saving...' : selectedId ? 'Update Blog' : 'Create Blog'}
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
