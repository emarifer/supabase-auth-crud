import type { Component } from "solid-js";
import { logout, logingOut, thereIsUser } from "../store";

export const Navbar: Component = () => {
  return (
    <nav class="w-full h-16 px-6 md:px-12 flex justify-between items-center bg-slate-800 fixed top-0 left-0 right-0 z-50">
      <span class="text-2xl font-black cursor-pointer">Whattodo!</span>

      {thereIsUser() && (
        <button
          onclick={logout}
          title="Logout"
          class="px-4 py-2 bg-sky-600 hover:bg-sky-400 rounded-md my-6"
        >
          {logingOut() ? (
            "Loading…"
          ) : (
            <svg class="w-7" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 \
	      20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
              />
            </svg>
          )}
        </button>
      )}
    </nav>
  );
};
