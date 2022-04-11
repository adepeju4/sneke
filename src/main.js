document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const board = document.querySelector("#board");

  head = new Head(board);
  apple = new Apple(board);
  snakeBody = new Body(board, head, apple);
  gameOver = false;

  body.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      console.log("pressed left");
      head.currentDirection =
        head.currentDirection !== "right" ? "left" : "right";
    }
    if (e.code === "ArrowRight") {
      console.log("pressed right");
      head.currentDirection =
        head.currentDirection !== "left" ? "right" : "left";
    }
    if (e.code === "ArrowUp") {
      console.log("pressed up");
      head.currentDirection = head.currentDirection !== "down" ? "up" : "down";
    }
    if (e.code === "ArrowDown") {
      console.log("pressed down");
      head.currentDirection = head.currentDirection !== "up" ? "down" : "up";
    }
  });
});
