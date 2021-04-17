const d = document,
  w = window;

export default function correctHeight() {
  w.addEventListener("resize", () => {
    let vh = w.innerHeight * 0.01;
    d.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}
