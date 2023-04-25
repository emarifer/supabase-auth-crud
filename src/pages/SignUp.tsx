import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { userSignUp, loading, warningAlert } from "../store";

export const SignUp: Component = () => {
  const [displayInput, setDisplayInput] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  let inputRefEmail: any = null;
  let inputRefPassword: any = null;

  const handleEmail = () => {
    if (!RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(email())) {
      warningAlert("You have entered an invalid email address!");
      inputRefEmail.value = "";
      (inputRefEmail as HTMLInputElement).focus();

      return;
    }

    setDisplayInput(true);
    (inputRefPassword as HTMLInputElement).focus();
  };

  const handleSignUp = async () => {
    if (0 <= password().trim().length && password().trim().length <= 5) {
      warningAlert("The password must be at least 6 characters!");
      inputRefPassword.value = "";
      (inputRefPassword as HTMLInputElement).focus();

      return;
    }

    await userSignUp(email(), password());

    // console.log({
    //   email: email(),
    //   password: password(),
    // });
  };

  return (
    <div class="mx-auto w-full">
      <div class="mx-auto w-full">
        <label class="text-xl font-semibold" for="signup-email">
          SignUp
        </label>

        <hr class="mb-4 border-t-2" />

        <div class="flex justify-center items-end gap-4 mb-8">
          <div class="flex flex-col gap-4">
            {!displayInput() ? (
              <input
                autofocus
                ref={inputRefEmail}
                class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
                id="signup-email"
                type="email"
                required
                onchange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email…"
              />
            ) : (
              <input
                autofocus
                ref={inputRefPassword}
                class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
                type="password"
                required
                onchange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password…"
              />
            )}
          </div>

          {!displayInput() ? (
            <button
              title="Next"
              onClick={handleEmail}
              class="bg-sky-600 hover:bg-sky-400 rounded-md text-xl px-4 py-2"
            >
              <svg class="w-7" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 \
	        	2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 \
			7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                />
              </svg>
            </button>
          ) : (
            <button
              title="SignUp"
              onClick={handleSignUp}
              class="bg-sky-600 hover:bg-sky-400 rounded-md text-xl px-4 py-2"
            >
              {loading() ? (
                "Loading…"
              ) : (
                <svg class="w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 \
		  22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 \
		  2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
