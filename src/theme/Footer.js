import OriginalFooter from '@theme-original/Footer';
import React from 'react';

export default function Footer(props) {
  return (
    <footer className="w-full border-t">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-3">
        <div className="text-sm grid ml-2 md:grid-cols-2">
          <span className="md:border-r pr-3 text-gray-700">&copy; 2021 Symbiosis. All rights reserved.</span>
          <span className="md:block hidden pl-3">
            Contact{" "}
            <span className="ml-1 font-medium">
              info@stim.dev
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
