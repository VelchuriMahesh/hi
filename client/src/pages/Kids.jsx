import HeroBanner from '../components/HeroBanner';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import SectionCta from '../components/SectionCta';
import SectionHeading from '../components/SectionHeading';
import { heroContent, kidsHighlights } from '../data/content';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';

export default function Kids() {
  const { media: heroMedia } = useHeroMedia('kids');
  const { images: kidsGallery, loading } = useMergedGallery('kids');

  return (
    <>
      <PageMeta
        title="Kids Outfits Boutique in Bangalore | Shrusara Fashion Boutique"
        description="Custom and ready kids outfits in Bangalore with premium boutique finishing for festive and family occasions."
        keywords="Kids outfits boutique Bangalore, custom kids outfits Bangalore, festive kids wear Bangalore"
        canonicalPath="/kids-outfits-bangalore"
      />

      <HeroBanner
        eyebrow={heroContent.kids.eyebrow}
        title={heroContent.kids.title}
        description={heroContent.kids.description}
        image="/videos/kids.png"
        videoUrl={heroMedia?.videoUrl || heroContent.kids.videoUrl}
        primaryLabel="Order now"
      />

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {kidsHighlights.map((item) => (
            <article key={item.title} className="luxury-card">
              <h2 className="font-heading text-2xl text-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">{item.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Kids Gallery"
          title="Festive outfits for little ones"
          description="Static premium references appear first, followed by any kids styles uploaded from the admin panel."
        />
        <div className="mt-10">
          <ImageGrid
            images={kidsGallery.slice(0, 8)}
            loading={loading}
            columnsClassName="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </Reveal>

      <SectionCta
        title="Order kids outfits on WhatsApp"
        description="Send age, occasion, preferred colors, and whether you need custom or ready styles."
        primaryLabel="Order now"
      />
    </>
  );
}
