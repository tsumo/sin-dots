import { Render } from "./render";

const init = () => {
  const canvas = document.getElementById("c");
  if (canvas === null) {
    console.error("Cannot find canvas element");
    return;
  }
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error("Element is not a canvas");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    console.error("Cannot get 2d context");
    return;
  }
  const render = new Render(canvas, ctx);
  render.dot(30, 30, 15);
};

init();
