import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
                {/* 404 Icon */}
                <div className="flex justify-center mb-4">
                    <span className="text-6xl font-bold text-red-500">404</span>
                </div>

                {/* Page Not Found Message */}
                <h2 className="text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mt-2">
                    Sorry, the page you are looking for does not exist.
                </p>

                {/* Go Back Home Button */}
                <Link
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}