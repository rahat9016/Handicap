"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
                {/* Error Icon */}
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>

                {/* Error Message */}
                <h2 className="text-2xl font-semibold text-gray-800">
                    Oops! Something went wrong.
                </h2>
                <p className="text-gray-600 mt-2">
                    An unexpected error occurred in the <span className="font-semibold">main route</span>.
                </p>

                {/* Error Details (if available) */}
                {error.message && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                        Error: {error.message}
                    </p>
                )}

                {/* Reset Button */}
                <button
                    onClick={() => reset()}
                    className="mt-6 px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
