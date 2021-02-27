export class Render {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  private halfWidth: number = 0;
  private halfHeight: number = 0;

  private readonly boundResizeListener: VoidFunction;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.updateCanvasDimensions();

    this.boundResizeListener = this.updateCanvasDimensions.bind(this);
    window.addEventListener("resize", this.boundResizeListener);
  }

  private updateCanvasDimensions() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.halfWidth = rect.width / 2;
    this.halfHeight = rect.height / 2;
  }

  dot(x: number, y: number, r: number) {
    this.ctx.beginPath();
    this.ctx.arc(
      (x + 1) * this.halfWidth,
      (y + 1) * this.halfHeight,
      r,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
