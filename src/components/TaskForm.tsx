import type { Component } from "solid-js";
import { adding, createTask } from "../store";

export const TaskForm: Component = () => {
  let inputRef: unknown;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    let taskName = formData.get("task-name") as string;
    // "task-name" es el name del input

    taskName = taskName.trim();

    if (taskName.length === 0) {
      alert("This field cannot contain only blank spaces.");

      (e.target as HTMLFormElement).reset();

      (inputRef as HTMLInputElement).focus();

      return;
    }

    await createTask(taskName);

    (e.target as HTMLFormElement).reset();

    (inputRef as HTMLInputElement).focus();
  };

  return (
    <div class="mx-auto w-full">
      <label class="text-lg" for="task-name">
        Add Task
      </label>

      <hr class="mb-4 border-t-2" />

      <form
        class="flex justify-center items-center gap-4"
        onsubmit={handleSubmit}
      >
        <input
          ref={inputRef as HTMLInputElement}
          autofocus
          class="rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-56 md:w-full text-xl px-4 py-2 bg-slate-700"
          id="task-name"
          name="task-name"
          type="text"
          required
          placeholder="Enter a task name…"
        />

        <button
          disabled={adding()}
          title="Add ToDo"
          class="bg-sky-600 hover:bg-sky-400 rounded-md text-xl px-4 py-2"
        >
          {adding() ? (
            "Adding…"
          ) : (
            <svg class="w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 18H12V20H2V18ZM2 11H22V13H2V11ZM2 4H22V6H2V4ZM18 18V15H20V18H23V20H20V23H18V20H15V18H18Z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

/*
 * REFERENCIA. VER:
 * https://www.youtube.com/watch?v=I1zzgAfSUBQ
 *
 * HTTP 201. VER:
 * https://developer.mozilla.org/es/docs/Web/HTTP/Status/201
 *
 * CAMBIOS EN LA BIBLIOTECA CLIENTE. VER:
 * https://supabase.com/docs/reference/javascript/upsert
 *
 * USO DEL ATRIBUTO REF EN SOLIDJS, PARTICULARMENTE CON INPUTS. VER:
 * https://dev.to/devsmitra/solidjs-and-reactjs-difference-and-comparison-1p3e
 *
 * LA DIFERENCIA ES QUE EN TYPESCRIPT HAY QUE DECLARAR EL REF COMO DE TIPO UNKOWN
 * Y LUEGO CASTEARLO COMO HTMLInputElement PARA OPERAR CON ÉL, COMO, POR EJEMPLO,
 * CON EL MÉTODO focus()
 */
