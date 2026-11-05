/** localStorage key and default theme shared by the head script and `ThemeProvider`. */
export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME = "system";

/**
 * Applies the saved theme to `<html>` from `<head>`, before `<body>` exists.
 *
 * next-themes injects the same logic, but inside `<body>`. When the HTML
 * arrives in more than one network chunk, the browser can paint the empty
 * body in the wrong theme before that script arrives, which flashes white on
 * every load in dark mode. Running it in `<head>` means the first paint
 * already has the right theme. next-themes still takes over after hydration.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})||${JSON.stringify(
  DEFAULT_THEME,
)};if(t==="system")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t!=="light"&&t!=="dark")return;d.classList.remove("light","dark");d.classList.add(t);d.style.colorScheme=t}catch(e){}})()`;
