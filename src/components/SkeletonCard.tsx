export default function SkeletonCard() {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
        <div className="skeleton h-3 w-8 rounded" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
      </div>
      <div className="flex gap-1.5">
        <div className="skeleton h-5 w-12 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-10 rounded-full" />
      </div>
      <div className="flex justify-between pt-3 border-t border-white/5">
        <div className="skeleton h-3 w-12 rounded" />
        <div className="skeleton h-3 w-14 rounded" />
      </div>
    </div>
  );
}
