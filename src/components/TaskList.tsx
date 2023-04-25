import type { Component } from "solid-js";
import { For, on, createEffect } from "solid-js";
import {
  taskList,
  loading,
  getTasks,
  deleteTask,
  deleting,
  updating,
  updateTask,
  showTasksDone,
} from "../store";
import { Task } from "../models";
import { convertDate } from "../helpers";

export const TaskList: Component = () => {
  createEffect(on(showTasksDone, async () => await getTasks()));

  return (
    <ul>
      <span>{loading() && "Loading…"}</span>
      <span>{updating() && "Updating…"}</span>
      <span>{deleting() && "Deleting…"}</span>

      <For each={taskList}>
        {(task: Task) => (
          <li>
            <div class="flex flex-col my-2 pl-4 py-1 border rounded border-gray-700 hover:-translate-y-1.5 ease-in duration-300">
              <div class="flex items-center">
                <input
                  id={task.id.toString()}
                  type="checkbox"
                  checked={task.done}
                  class="w-5 h-5 accent-purple-600"
                  onclick={() => updateTask(task.id, task.done)}
                />

                <label
                  for={task.id.toString()}
                  title={task.name}
                  class={`w-full p-3 ml-2 text-lg truncate ${
                    task.done ? "text-gray-600 line-through" : ""
                  }`}
                >
                  {task.name}
                </label>
              </div>

              <div class="flex justify-between items-center px-2 pb-2">
                <p class="text-sm text-gray-600 font-bold">
                  {convertDate(task.created_at)}
                </p>
                <button
                  disabled={deleting()}
                  title="Remove Todo"
                  onclick={() => deleteTask(task.id)}
                  class="bg-red-600 hover:bg-red-500 px-2.5 py-1.5 rounded"
                >
                  <svg class="w-5" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 \
                          1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 \
                          0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 \
                          8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
};
