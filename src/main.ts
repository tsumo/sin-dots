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
};

init();
