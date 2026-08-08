import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] p-4 sm:p-8 space-y-16 max-w-7xl mx-auto overflow-hidden animate-pulse">
      {/* Top Navbar Skeleton */}
      <div className="flex items-center justify-between py-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
          <div className="space-y-1.5">
            <div className="w-28 h-4 rounded-md skeleton-shimmer" />
            <div className="w-16 h-2.5 rounded-md skeleton-shimmer" />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200/80 bg-white/80">
          <div className="w-12 h-3 rounded-full skeleton-shimmer" />
          <div className="w-12 h-3 rounded-full skeleton-shimmer" />
          <div className="w-12 h-3 rounded-full skeleton-shimmer" />
          <div className="w-12 h-3 rounded-full skeleton-shimmer" />
          <div className="w-12 h-3 rounded-full skeleton-shimmer" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-24 h-9 rounded-full skeleton-shimmer" />
          <div className="w-28 h-9 rounded-full skeleton-shimmer hidden sm:block" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="w-48 h-7 rounded-full skeleton-shimmer" />
          <div className="space-y-3">
            <div className="w-3/4 h-12 rounded-xl skeleton-shimmer" />
            <div className="w-1/2 h-12 rounded-xl skeleton-shimmer" />
          </div>
          <div className="space-y-2 max-w-xl">
            <div className="w-full h-4 rounded-md skeleton-shimmer" />
            <div className="w-5/6 h-4 rounded-md skeleton-shimmer" />
            <div className="w-2/3 h-4 rounded-md skeleton-shimmer" />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="w-36 h-12 rounded-xl skeleton-shimmer" />
            <div className="w-36 h-12 rounded-xl skeleton-shimmer" />
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
            <div className="w-20 h-4 rounded-md skeleton-shimmer" />
            <div className="w-8 h-8 rounded-lg skeleton-shimmer" />
            <div className="w-8 h-8 rounded-lg skeleton-shimmer" />
            <div className="w-8 h-8 rounded-lg skeleton-shimmer" />
          </div>
        </div>

        {/* Right Photo Card Skeleton */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm h-80 sm:h-96 rounded-3xl skeleton-shimmer border border-slate-200/80 shadow-lg relative p-6 flex flex-col justify-end">
            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-32 h-4 rounded-md skeleton-shimmer" />
              <div className="w-48 h-3 rounded-md skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
            <div className="w-20 h-8 rounded-lg skeleton-shimmer" />
            <div className="w-28 h-3 rounded-md skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Bento Grid Skeleton */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <div className="w-32 h-6 rounded-full skeleton-shimmer mx-auto" />
          <div className="w-64 h-8 rounded-lg skeleton-shimmer mx-auto" />
          <div className="w-80 h-4 rounded-md skeleton-shimmer mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
                <div className="w-32 h-5 rounded-md skeleton-shimmer" />
              </div>
              <div className="space-y-2">
                <div className="w-full h-3.5 rounded-md skeleton-shimmer" />
                <div className="w-4/5 h-3.5 rounded-md skeleton-shimmer" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="w-16 h-6 rounded-full skeleton-shimmer" />
                <div className="w-20 h-6 rounded-full skeleton-shimmer" />
                <div className="w-14 h-6 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
