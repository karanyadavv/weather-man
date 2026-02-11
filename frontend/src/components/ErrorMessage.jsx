const ErrorMessage = ({ message, onRetry }) => (
    <div className="w-full max-w-md mx-auto mt-8 rounded-2xl border border-red-200 bg-red-50/70 backdrop-blur-sm px-6 py-8 text-center animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Something went wrong
        </h3>
        <p className="text-sm text-gray-500 mb-4">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="rounded-md bg-gray-800 px-5 py-2 text-sm font-semibold text-white cursor-pointer active:scale-95 duration-200"
            >
                Try again
            </button>
        )}
    </div>
);

export default ErrorMessage;
