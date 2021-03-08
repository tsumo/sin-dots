import { Render } from "./render";

const { sin } = Math;

type Point = {
  readonly x: number;
  y: number;
  readonly phaseShift: number;
};

type PointRow = {
  readonly points: Point[];
  readonly yOffset: number;
  readonly amplitude: number;
  readonly radius: number;
};

export class Pattern {
  private readonly render: Render;

  private readonly columns = 8;
  private readonly rows = 8;
  private minRadius = 0.7;
  private maxRadius = 2.6;

  private pointRows: PointRow[] = [];

  constructor(render: Render) {
    this.render = render;

    for (let i = 0; i < this.rows; i += 1) {
      const points: Point[] = [];
      const yOffset = i / this.rows - 0.5 + 1 / this.rows / 2;
      const amplitude = 0.42;
      const radius = i * (this.maxRadius - this.minRadius) + this.minRadius;
      for (let j = 0; j < this.columns; j += 1) {
        points.push({
          x: j / this.columns - 0.5 + 1 / this.columns / 2,
          y: 0,
          phaseShift: j * 0.15,
        });
      }
      this.pointRows.push({
        points,
        yOffset,
        amplitude,
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
        point.y = sin(t + point.phaseShift) * row.amplitude;
      });
    });
  }

  private draw() {
    this.render.clear();
    this.pointRows.forEach((row) => {
      row.points.forEach(({ x, y }) => {
        this.render.dot(x, y + row.yOffset, row.radius);
      });
    });
  }
}
