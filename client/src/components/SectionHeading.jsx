export default function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} space-y-4`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <div className="space-y-3">
        <h2 className="font-heading text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
        {description ? (
          <p className="text-base leading-7 text-stone-600 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

