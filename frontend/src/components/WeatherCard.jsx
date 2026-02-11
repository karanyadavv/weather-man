import { CONDITION_CONFIG } from '../config/condition';

const getCondition = (condition) =>
    CONDITION_CONFIG[condition] || { icon: '🌡️', label: condition };

const formatUpdatedAt = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        month: 'short',
        day: 'numeric',
    });
};

const StatItem = ({ label, value }) => (
    <div className="flex flex-col items-center gap-1 px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-gray-500">{label}</span>
        <span className="text-lg font-semibold text-gray-800">{value}</span>
    </div>
);

const WeatherCard = ({ data }) => {
    if (!data) return null;

    const { location, current } = data;
    const { icon, label } = getCondition(current.condition);

    return (
        <div className="w-full max-w-md mx-auto mt-8 rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden animate-fade-in">
            {/* Header – City & Condition */}
            <div className="px-6 pt-6 pb-2 text-center">
                <p className="text-sm text-gray-500 tracking-wide">
                    {location.city}, {location.country}
                </p>
                <div className="text-7xl my-3 leading-none">{icon}</div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
            </div>

            {/* Temperature */}
            <div className="text-center pb-4">
                <span className="text-6xl font-bold text-gray-800 tracking-tight">
                    {Math.round(current.tempC)}°
                </span>
                <p className="text-sm text-gray-500 mt-1">
                    Feels like {Math.round(current.feelsLikeC)}°C
                </p>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-200" />

            {/* Stats row */}
            <div className="flex justify-around py-3">
                <StatItem label="Humidity" value={`${current.humidity}%`} />
                <StatItem label="Wind" value={`${current.windKph} km/h`} />
            </div>

            {/* Footer – last updated */}
            <div className="bg-gray-100/60 px-6 py-2 text-center">
                <p className="text-xs text-gray-400">
                    Updated {formatUpdatedAt(current.updatedAt)}
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;
