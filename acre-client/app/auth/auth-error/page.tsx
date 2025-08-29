"use client";

// import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  // const searchParams = useSearchParams();
  // const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h2 className="text-xl font-semibold mb-2 text-red-600">
          Authentication Error
        </h2>

          <p className="text-gray-700 mb-4">
            Something went wrong during login. Please try again.
          </p>

        <a
          href="/login"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
