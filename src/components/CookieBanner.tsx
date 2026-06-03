'use client';

import { useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Usamos cookies para garantir que você tenha a melhor experiência no
          nosso site. Se você continuar a usar este site, vamos assumir que está
          de acordo com isso.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-medium text-sm px-5 py-2 rounded-lg"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}
