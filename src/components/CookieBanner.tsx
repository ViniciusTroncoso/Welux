'use client';

import { useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          We use cookies to ensure that we give you the best experience on our
          website. If you continue to use this site we will assume that you are
          happy with it.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="bg-[#05d664] text-black hover:bg-transparent hover:border-[#05d664] border-2 border-[#05d664] font-medium text-sm px-5 py-2 rounded-lg transition-all duration-300"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
