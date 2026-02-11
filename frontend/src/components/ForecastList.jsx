import { CONDITION_CONFIG } from '../config/condition';

const getCondition = (condition) =>
    CONDITION_CONFIG[condition] || { icon: '🌡️', label: condition };

const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
    });
};

const formatDay = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
};

/** Group flat forecast array into { "Today": [...], "Tomorrow": [...], ... } */
const groupByDay = (forecast) => {
    const groups = {};
    forecast.forEach((item) => {
        const dayLabel = formatDay(item.time);
        if (!groups[dayLabel]) groups[dayLabel] = [];
        groups[dayLabel].push(item);
    });
    return groups;
};

const ForecastItem = ({ item }) => {
    const { icon } = getCondition(item.condition);
    return (
        <div className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 min-w-[80px]">
            <span className="text-xs text-gray-500">{formatTime(item.time)}</span>
            <span className="text-2xl leading-none">{icon}</span>
            <span className="text-sm font-semibold text-gray-800">
                {Math.round(item.tempC)}°
            </span>
        </div>
    );
};

const ForecastList = ({ data }) => {
    if (!data) return null;

    const { forecast } = data;
    const grouped = groupByDay(forecast);

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h2>

            <div className="flex flex-col gap-5">
                {Object.entries(grouped).map(([day, items]) => (
                    <div key={day}>
                        <p className="text-sm font-medium text-gray-500 mb-2">{day}</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {items.map((item) => (
                                <ForecastItem key={item.time} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastList;
