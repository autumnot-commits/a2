export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24" role="status">
      <span className="size-8 animate-spin rounded-full border-4 border-line border-t-primary" aria-hidden="true" />
      <span className="sr-only">불러오는 중</span>
    </div>
  );
}
