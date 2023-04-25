import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { Task } from "../models";
import { supabase } from "../supabase/client";
import Swal from "sweetalert2";

const errorAlert = (error: string) =>
  Swal.fire({
    background: "#292b2c",
    color: "white",
    title: "Error",
    text: error,
    icon: "error",
    confirmButtonText: "Ok",
  });

const successAlert = (message: string) =>
  Swal.fire({
    background: "#292b2c",
    color: "white",
    title: "Action Completed",
    text: message,
    icon: "success",
    confirmButtonText: "Ok",
  });

export const warningAlert = (info: string) =>
  Swal.fire({
    background: "#292b2c",
    color: "white",
    title: "Warning",
    text: info,
    icon: "warning",
    confirmButtonText: "Ok",
  });

export const [taskList, setTaskList] = createStore([] as Task[]);

export const [thereIsUser, setThereIsUser] = createSignal(false);
export const [logingOut, setLogingOut] = createSignal(false);
export const [loading, setLoading] = createSignal(false);
export const [adding, setAdding] = createSignal(false);
export const [deleting, setDeleting] = createSignal(false);
export const [updating, setUpdating] = createSignal(false);
export const [showTasksDone, setShowTasksDone] = createSignal(false);

export const userSignUp = async (userEmail: string, userPassword: string) => {
  setLoading(true);

  try {
    setLoading(true);
    // const { error } = await supabase.auth.signInWithOtp({
    //   email: userEmail,
    // });
    const { error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });

    if (error) throw new Error(error.message);

    successAlert("User created successfully!");

    setThereIsUser(true);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setLoading(false);
  }
};

export const userSignIn = async (userEmail: string, userPassword: string) => {
  setLoading(true);

  try {
    setLoading(true);
    // const { error } = await supabase.auth.signInWithOtp({
    //   email: userEmail,
    // });
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (error) throw new Error(error.message);

    successAlert("Login successful!");

    setThereIsUser(true);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setLoading(false);
  }
};

export const logout = async () => {
  setLogingOut(true);

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    setThereIsUser(false);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setLogingOut(false);
  }
};

export const createTask = async (taskName: string): Promise<void> => {
  setAdding(true);

  try {
    const userData = await supabase.auth.getUser();

    if (userData.data.user) {
      const id = userData.data.user.id;
      const { data, error } = await supabase
        .from("tasks")
        .insert({ name: taskName, userId: id })
        .select(); // Necesario para obtener los datos; si no data = null.
      // select() devuelve un array

      if (error) throw new Error(error.message);

      if (data) setTaskList([data[0] as Task, ...taskList]);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setAdding(false);
  }
};

export const getTasks = async (): Promise<void> => {
  setLoading(true);

  try {
    const userData = await supabase.auth.getUser();

    if (userData.data.user) {
      const id = userData.data.user.id;
      const { data, error } = !showTasksDone()
        ? await supabase
            .from("tasks")
            .select("id, name, done, created_at")
            .eq("userId", id)
            .order("id", { ascending: false })
        : await supabase
            .from("tasks")
            .select("id, name, done, created_at")
            .eq("userId", id)
            .eq("done", true)
            .order("id", { ascending: false });

      // console.log(data);

      if (error) throw new Error(error.message);

      if (data) setTaskList(data as Task[]);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setLoading(false);
  }
};

export const updateTask = async (
  id: number,
  doneStatus: boolean
): Promise<void> => {
  setUpdating(true);

  try {
    const userData = await supabase.auth.getUser();

    if (userData.data.user) {
      const userId = userData.data.user.id;
      const { data, error } = await supabase
        .from("tasks")
        .update({ done: !doneStatus })
        .eq("userId", userId)
        .eq("id", id)
        .select();

      if (error) throw new Error(error.message);

      if (!data[0]) throw new Error("Unknown error: could not update the item");

      setTaskList(
        (task) => task.id === id,
        "done",
        (done) => !done
      );
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setUpdating(false);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  setDeleting(true);

  try {
    const userData = await supabase.auth.getUser();

    if (userData.data.user) {
      const userId = userData.data.user.id;
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("userId", userId)
        .eq("id", id)
        .select();

      if (error) throw new Error(error.message);

      if (data) {
        setTaskList(
          taskList.filter((task) => task.id !== (data[0] as Task).id)
        );
      }
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    errorAlert(message);
  } finally {
    setDeleting(false);
  }
};

/*
 * MANEJO DE ERRORES EN TYPESCRIPT. VER:
 * https://stackoverflow.com/questions/64452484/how-can-i-safely-access-caught-error-properties-in-typescript
 *
 * INICIO DE SESIÓN CON EMAIL/PASSWORD. VER:
 * https://supabase.com/docs/reference/javascript/auth-signinwithpassword
 *
 * CREACIÓN DE NUEVO USUARIO. VER:
 * https://supabase.com/docs/reference/javascript/v1/auth-signup
 *
 * CREACIÓN DE PÁGINA DE LOGIN CON SOLIDJS/SUPABASE. VER:
 * https://supabase.com/docs/guides/getting-started/tutorials/with-solidjs#set-up-a-login-component
 * https://supabase.com/docs/guides/auth/auth-magic-link
 */
