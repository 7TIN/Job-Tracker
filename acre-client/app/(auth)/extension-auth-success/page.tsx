"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExtensionAuthSuccess() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      // Put tokens into the URL hash (so extension can read them)
      window.location.hash = `access_token=${accessToken}&refresh_token=${refreshToken}`;
      setStatus("success");

      // Auto-close after 3s (optional)
      setTimeout(() => {
        window.close();
      }, 2000);
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Setting up extension...</h2>
            <p className="text-gray-600">Please wait while we connect your extension.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              Extension Connected!
            </h2>
            <p className="text-gray-600 mb-4">
              Your browser extension has been successfully authenticated.
            </p>
            <p className="text-sm text-gray-500">
              This tab will close automatically...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Authentication Failed
            </h2>
            <p className="text-gray-600">
              Please try connecting your extension again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
