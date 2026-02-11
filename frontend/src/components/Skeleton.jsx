const SkeletonBlock = ({ className = '' }) => (
    <div className={`bg-gray-300/60 rounded-md animate-pulse ${className}`} />
);

const WeatherCardSkeleton = () => (
    <div className="w-full max-w-md mx-auto mt-8 rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex flex-col items-center gap-3">
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-16 w-16 rounded-full" />
            <SkeletonBlock className="h-4 w-20" />
        </div>

        {/* Temperature */}
        <div className="flex flex-col items-center pb-4 gap-2">
            <SkeletonBlock className="h-14 w-32" />
            <SkeletonBlock className="h-3 w-24" />
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-200" />

        {/* Stats row */}
        <div className="flex justify-around py-4">
            <div className="flex flex-col items-center gap-2">
                <SkeletonBlock className="h-3 w-14" />
                <SkeletonBlock className="h-5 w-10" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <SkeletonBlock className="h-3 w-14" />
                <SkeletonBlock className="h-5 w-16" />
            </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100/60 px-6 py-3 flex justify-center">
            <SkeletonBlock className="h-3 w-36" />
        </div>
    </div>
);

const ForecastSkeleton = () => (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
        <SkeletonBlock className="h-5 w-36 mb-4" />
        <div className="flex flex-col gap-5">
            {[1, 2, 3].map((day) => (
                <div key={day}>
                    <SkeletonBlock className="h-4 w-20 mb-2" />
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white/60 px-4 py-3"
                            >
                                <SkeletonBlock className="h-3 w-10" />
                                <SkeletonBlock className="h-6 w-6 rounded-full" />
                                <SkeletonBlock className="h-4 w-8" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export { WeatherCardSkeleton, ForecastSkeleton };
