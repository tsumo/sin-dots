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

  private readonly columns = 8;
  private readonly rows = 8;

  private pointRows: PointRow[] = [];

  constructor(render: Render) {
    this.render = render;

    for (let i = 0; i < this.rows; i += 1) {
      const points: Point[] = [];
      const xOffset = 0;
      const yOffset = 0;
      const amplitude = 0.2;
      const repeats = 4.4;
      const radius = i * 1.8 + 0.7;
      for (let j = 0; j < this.columns; j += 1) {
        points.push({
          x: j / this.columns - 0.5 + 1 / this.columns / 2,
          y: i / this.rows - 0.5 + 1 / this.rows / 2,
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
      // this.updatePoints(performance.now() * 0.002);
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
        this.render.dot(x + row.xOffset, y + row.yOffset, row.radius);
      });
    });
  }
}
