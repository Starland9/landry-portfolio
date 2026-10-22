// Runs in <head> before the first paint: applies a saved manual theme choice.
// Without a choice (or without JS) <html data-theme="auto"> follows the system.
const script = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
