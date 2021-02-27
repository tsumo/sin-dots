import { Render } from "./render";

const { sin } = Math;

export class Pattern {
  private readonly render: Render;

  constructor(render: Render) {
    this.render = render;

    const tick = () => {
      this.draw();
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  private draw() {
    this.render.clear();
    this.render.dot(0, sin(performance.now() * 0.002), 10);
  }
}
