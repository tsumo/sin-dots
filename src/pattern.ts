import { Render } from "./render";

const { sin } = Math;

type Point = {
  x: number;
  y: number;
  phaseShift: number;
};

type PointRow = {
  points: Point[];
  xOffset: number;
  yOffset: number;
  amplitude: number;
  repeats: number;
  radius: number;
};

export class Pattern {
  private readonly render: Render;

  private pointRows: PointRow[] = [];

  constructor(render: Render) {
    this.render = render;

    for (let i = 0; i <= 1; i += 0.05) {
      const points: Point[] = [];
      const xOffset = 0;
      const yOffset = i - 0.5;
      const amplitude = 0.2;
      const repeats = 4.4;
      const radius = i * 5 + 5;
      for (let j = -1; j <= 1; j += 0.1) {
        points.push({
          x: j + xOffset,
          y: yOffset,
          phaseShift: j * repeats,
        });
      }
      this.pointRows.push({
        points,
        xOffset,
        yOffset,
        amplitude,
        repeats,
        radius,
      });
    }
    // console.log(this.pointRows);

    const tick = () => {
      this.updatePoints(performance.now() * 0.002);
      this.draw();
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  private updatePoints(t: number) {
    this.pointRows.forEach((row) => {
      row.points.forEach((point) => {
        point.y = sin(t + point.phaseShift) * row.amplitude + row.yOffset;
      });
    });
  }

  private draw() {
    this.render.clear();
    this.pointRows.forEach((row) => {
      row.points.forEach(({ x, y }) => {
        this.render.dot(x, y, row.radius);
      });
    });
  }
}
