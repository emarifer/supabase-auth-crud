import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { Routes, Route, useNavigate } from "@solidjs/router";

import logo from "./assets/task-done-flat.svg";
import { Home, Login, NotFound } from "./pages";
import { supabase } from "./supabase/client";
import { Navbar } from "./components";

const App: Component = () => {
  const navigate = useNavigate();

  onMount(() =>
    supabase.auth.onAuthStateChange((_event, session) => {
      !session ? navigate("/login") : navigate("/");
    })
  );

  return (
    <>
      <Navbar />

      <div class="flex flex-col mt-14 w-72 md:w-[400px] mx-auto gap-6">
        <header class="flex flex-col mx-auto w-full">
          <h1 class="text-3xl text-center font-black mb-5">Whattodo!</h1>

          <img
            class="w-32 mb-8 mx-auto hover:scale-110 ease-in-out duration-500"
            src={logo}
            alt="Todo App logo"
          />
        </header>

        <main class="mx-auto w-full my-4">
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
          </Routes>
        </main>

        <footer class="mt-3 mb-6 text-center">
          <a
            class="italic tracking-wider hover:text-sky-500 ease-in duration-300"
            href="https://github.com/emarifer?tab=repositories"
            target="_blank"
          >
            MIT Licensed | Copyright © {new Date().getFullYear()} Enrique Marín
          </a>
        </footer>
      </div>
    </>
  );
};

export default App;

/*
 * REFERENCIA:
 * https://github.com/FaztWeb/react-supabase-auth-crud
 *
 * createEffect. VER:
 * https://www.youtube.com/watch?v=yP7pGbs5UtA
 *
 * https://10minutemail.com/
 *
 * CONFIGURAR NETLIFY PARA QUE FUNCIONE CON SPA. VER:
 * https://ridbay.medium.com/react-routing-and-netlify-redirects-fd1f00eeee95
 * https://answers.netlify.com/t/support-guide-direct-links-to-my-single-page-app-spa-dont-work/126
 */
