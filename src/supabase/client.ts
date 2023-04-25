import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/*
 * VARIABLES DE ENTORNO EN VITE/SOLIDJS. VER:
 * https://es.vitejs.dev/guide/env-and-mode.html#variables-y-modos-de-entorno
 */
