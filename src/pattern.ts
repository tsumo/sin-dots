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

  private readonly columns = 30;
  private readonly rows = 20;
  private minRadius = 1.0;
  private maxRadius = 3.3;

  private pointRows: PointRow[] = [];

  constructor(render: Render) {
    this.render = render;

    for (let i = 0; i < this.rows; i += 1) {
      const iRatio = i / (this.rows - 1);
      const points: Point[] = [];
      const yOffset = iRatio * 2 - 1;
      const amplitude = 0.12;
      const radius =
        iRatio * (this.maxRadius - this.minRadius) + this.minRadius;
      for (let j = 0; j < this.columns; j += 1) {
        const jRatio = j / (this.columns - 1);
        points.push({
          x: jRatio * 2 - 1,
          y: 0,
          phaseShift: j * 0.45,
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
      // this.updatePoints(performance.now() * 0.002);
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
