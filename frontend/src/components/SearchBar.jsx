import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = city.trim();
        if (!trimmed) return;
        onSearch(trimmed);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
            <div className="flex items-center gap-2 rounded-md bg-white/10 backdrop-blur-lg border border-gray-400 px-4 py-2">
                {/* Search icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0 text-black/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                </svg>

                {/* City input */}
                <input
                    id="city-input"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city…"
                    autoComplete="off"
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-800/40 text-base outline-none py-2"
                />

                {/* Submit button */}
                <button
                    id="search-button"
                    type="submit"
                    className="shrink-0 rounded-md px-5 py-2 text-sm font-semibold text-white shadow-md duration-200 active:scale-95 bg-gray-800 cursor-pointer"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
