import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { userSignIn, userSignUp, loading } from "../store";

export const Login: Component = () => {
  const [isLoggingIn, setIsLoggingIn] = createSignal(false);

  let inputRefSignIn: unknown;
  let inputRefSignUp: unknown;

  const handleSignUp = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const userEmail = formData.get("signup-email") as string;
    // "signup-email" es el name del input

    let userPassword = formData.get("signup-password") as string;
    // "signup-password" es el name del input
    // console.log({ user: userEmail, password: userPassword });

    userPassword = userPassword.trim();

    if (userPassword.length < 6) {
      alert("The password must be at least 6 characters.");

      (e.target as HTMLFormElement).reset();

      (inputRefSignUp as HTMLInputElement).focus();

      return;
    }

    await userSignUp(userEmail, userPassword);

    (e.target as HTMLFormElement).reset();
  };

  const handleSignIn = async (e: Event) => {
    setIsLoggingIn(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const userEmail = formData.get("signin-email") as string;
    // "signin-email" es el name del input

    const userPassword = formData.get("signin-password") as string;
    // "signin-password" es el name del input
    // console.log({ user: userEmail, password: userPassword });

    await userSignIn(userEmail, userPassword);

    (e.target as HTMLFormElement).reset();
    (inputRefSignIn as HTMLInputElement).focus();

    setIsLoggingIn(false);
  };

  return (
    <div class="mx-auto w-full">
      <div class="mx-auto w-full">
        <label
          class="text-xl font-semibold flex justify-end"
          for="signin-email"
        >
          SignIn
        </label>

        <hr class="mb-4 border-t-2" />

        <form
          class="flex justify-center items-end gap-4 mb-8"
          onsubmit={handleSignIn}
        >
          <div class="flex flex-col gap-4">
            <input
              autofocus
              ref={inputRefSignIn as HTMLInputElement}
              class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
              id="signin-email"
              name="signin-email"
              type="email"
              required
              placeholder="Enter your email…"
            />

            <input
              class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
              id="signin-password"
              name="signin-password"
              type="password"
              required
              placeholder="Enter your password…"
            />
          </div>

          <button
            title="SignIn"
            class="bg-sky-600 hover:bg-sky-400 rounded-md text-xl px-4 py-2"
          >
            {loading() && isLoggingIn() ? (
              "Loading…"
            ) : (
              <svg class="w-7" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 11H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 \
		19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V13H10V16L15 12L10 8V11Z"
                />
              </svg>
            )}
          </button>
        </form>

        <label
          class="text-xl font-semibold flex justify-between"
          for="signup-email"
        >
          <span class="text-sm text-slate-600 font-semibold">
            If you don't have an account yet…
          </span>
          SignUp
        </label>

        <hr class="mb-4 border-t-2" />

        <form
          class="flex justify-center items-end gap-4"
          onsubmit={handleSignUp}
        >
          <div class="flex flex-col gap-4">
            <input
              ref={inputRefSignUp as HTMLInputElement}
              class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
              id="signup-email"
              name="signup-email"
              type="email"
              required
              placeholder="Enter your email…"
            />

            <input
              class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
              id="signup-password"
              name="signup-password"
              type="password"
              required
              placeholder="Enter your password…"
            />
          </div>

          <button
            title="SignIn"
            class="bg-lime-500 hover:bg-lime-400 rounded-md text-xl px-4 py-2"
          >
            {loading() && !isLoggingIn() ? (
              "Loading…"
            ) : (
              <svg class="w-7" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 11H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 \
		19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V13H10V16L15 12L10 8V11Z"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

/*
 * ASOCIACIÓN DE BUTTON Y FORMULARIO & FORMDATA. VER:
 * https://developer.mozilla.org/en-US/docs/Web/API/FormData/get
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes
 *
 * CREACIÓN DE PÁGINA DE LOGIN CON SOLIDJS/SUPABASE. VER:
 * https://supabase.com/docs/guides/getting-started/tutorials/with-solidjs#set-up-a-login-component
 * https://supabase.com/docs/guides/auth/auth-magic-link
 */
