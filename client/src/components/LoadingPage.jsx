export default function LoadingPage() {
  return (
    <div className="section-shell py-10">
      <div className="skeleton h-[520px] animate-shimmer rounded-[36px]" />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="skeleton h-48 animate-shimmer rounded-[28px]" />
        <div className="skeleton h-48 animate-shimmer rounded-[28px]" />
        <div className="skeleton h-48 animate-shimmer rounded-[28px]" />
      </div>
    </div>
  );
}

