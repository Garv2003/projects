export const ErrorBoundary = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">Oops!</h1>
                <p className="mt-2 text-lg text-gray-600">Something went wrong.</p>
            </div>
        </div>
    );
};