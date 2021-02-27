export class Render {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

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
  }
}
