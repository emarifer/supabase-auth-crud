import type { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";
import { TaskForm, TaskList } from "../components";
import { setThereIsUser, showTasksDone, setShowTasksDone } from "../store";
import { supabase } from "../supabase/client";

export const Home: Component = () => {
  const [thereIsSession, setThereIsSession] = createSignal(false);

  onMount(() =>
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setThereIsUser(true);
        setThereIsSession(true);
      }
    })
  );

  // onMount(async () => {
  //   // const userData = await supabase.auth.getUser();
  //   // if (userData.data.user) setThereIsUser(true);
  // });{

  return (
    <>
      <TaskForm />

      <div class="flex flex-row justify-between items-center mb-2 mt-8">
        <h2 class="text-xl font-black">Task List</h2>
        <button
          title={`${!showTasksDone() ? "All Tasks" : "Done Tasks"}`}
          onclick={() => setShowTasksDone(!showTasksDone())}
          class={`${
            !showTasksDone()
              ? "bg-amber-700 hover:bg-amber-500"
              : "bg-[#9333ea] hover:bg-[#A668DE]"
          } rounded-md text-xl px-2 py-1`}
        >
          <svg class="w-6" fill="currentColor" viewBox="0 0 16 16">
            {!showTasksDone() ? (
              <>
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                />
                <path
                  d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 \
	      1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 \
	      7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                />
              </>
            ) : (
              <path
                d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 \
		1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 \
		1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 \
		9.417l-.485-.486-.943 1.179z"
              />
            )}
          </svg>
        </button>
      </div>

      <hr class="mb-6 border-t-2" />

      {thereIsSession() && <TaskList />}
    </>
  );
};
