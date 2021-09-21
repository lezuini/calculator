const d = document,
  w = window,
  de = d.documentElement,
  storage = w.localStorage;

const light = "theme--light";
const dark = "theme--dark";

export default function switchTheme(btn = "themeBtn") {
  const $btn = d.getElementById(btn);

  d.addEventListener("click", (e) => {
    if (e.target === $btn) {
      if (de.classList.contains(dark)) {
        storage.setItem("theme", light);
        de.classList.replace(dark, light);
        $btn.textContent = "Switch to Dark Theme";
      } else {
        console.log("a");
        storage.setItem("theme", dark);
        de.classList.replace(light, dark);
        $btn.textContent = "Switch to Light Theme";
      }
    }
  });

  if (!de.classList.contains(dark)) {
    $btn.textContent = "Switch to Dark Theme";
  }
}
