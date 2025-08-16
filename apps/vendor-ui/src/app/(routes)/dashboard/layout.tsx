
'use client';

import SidebarBarWrapper from 'apps/vendor-ui/src/shared/components/sidebar/sidebar';

import React, { useState } from 'react';


function _layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex h-full min-h-screen bg-black text-white">

      {/* Sidebar (Overlay on mobile) */}
      {/* Mobile Hamburger Button */}
<button
  onClick={() => setMobileOpen(true)}
  className="xl:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-800 text-white hover:bg-slate-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>

    
<aside
  className={`fixed z-50 top-0 left-0 h-screen w-[250px] bg-slate-900 transition-transform duration-300 xl:sticky xl:top-0 xl:h-screen xl:z-auto ${
    mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
  }`}
>
  <SidebarBarWrapper mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
 
</aside>

      {/* Overlay backdrop on mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
        />
      )}

      {/* Main content */}
      <main
      className={`flex-1 transition-all duration-300 px-4 py-6 ${
        mobileOpen ? "pointer-events-none select-none blur-sm xl:blur-0" : ""
      }`}
      
      >
        <div className="overflow-auto max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

export default _layout;
