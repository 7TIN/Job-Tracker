"use client";

import { useEffect} from "react";

export default function ExtensionAuthSuccess() {

  useEffect(() => {
      setTimeout(() => {
        window.close();
      }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
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
      </div>
    </div>
  );
}
