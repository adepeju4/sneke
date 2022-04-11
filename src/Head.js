class Head {
  constructor(el) {
    this.node = document.createElement("img");
    this.node.setAttribute("id", "head");

    this.node.setAttribute("src", "src/assets/snake.png");

    el.appendChild(this.node);

    this.currentDirection = "none";
    this.SPEED = 250;

    this.node.style.top = "350px";
    this.node.style.left = "350px";
    console.log(this.currentDirection);

    this.counter1 = 0;
    this.counter2 = 0;
    this.prevDimensions = { top: null, left: null };
    this.next = null;
    this.gameOver = false;
    setTimeout(this.move.bind(this), this.SPEED);

    this.filledLeft = new Set();
    this.filledTop = new Set();

    this.highScore = 0;

    this.gameOver = this.alertGameOver();
  }

  move() {
    const head = this.node;
    const direction = this.currentDirection;

    let topPosition = Number(head.style.top.replace("px", ""));
    let leftPosition = Number(head.style.left.replace("px", ""));

    if (direction === "right") {
      this.prevDimensions.left = leftPosition;
      this.prevDimensions.top = topPosition;
      head.style.left = `${(leftPosition += 50)}px`;

      if (head.style.left === "700px") {
        this.currentDirection = "none";
        this.node.style.top = "350px";
        this.node.style.left = "350px";
        snakeBody.removeBody(apple);
        this.gameOver(this.highScore);
      }
    }

    if (direction === "left") {
      this.prevDimensions.left = leftPosition;
      this.prevDimensions.top = topPosition;
      head.style.left = `${(leftPosition -= 50)}px`;
      if (head.style.left === "-50px") {
        this.currentDirection = "none";
        this.node.style.top = "350px";
        this.node.style.left = "350px";
        snakeBody.removeBody(apple);
        this.gameOver(this.highScore);
      }
    }

    if (direction === "up") {
      this.prevDimensions.left = leftPosition;
      this.prevDimensions.top = topPosition;
      head.style.top = `${(topPosition -= 50)}px`;
      if (head.style.top === "-50px") {
        this.currentDirection = "none";
        this.node.style.top = "350px";
        this.node.style.left = "350px";
        snakeBody.removeBody(apple);
        this.gameOver(this.highScore);
      }
    }

    if (direction === "down") {
      this.prevDimensions.left = leftPosition;
      this.prevDimensions.top = topPosition;
      head.style.top = `${(topPosition += 50)}px`;
      if (head.style.top === "700px") {
        this.currentDirection = "none";
        this.node.style.top = "350px";
        this.node.style.left = "350px";
        snakeBody.removeBody(apple);
        this.gameOver(this.highScore);
      }
    }

    let appleTopPosition = Number(apple.node.style.top.replace("px", ""));
    let appleLeftPosition = Number(apple.node.style.left.replace("px", ""));
    if (
      appleTopPosition === topPosition &&
      appleLeftPosition === leftPosition
    ) {
      snakeBody.EatingApple(topPosition, leftPosition);
      this.highScore += 50;
      apple.setApple(topPosition, leftPosition, snakeBody.filledPositons);
    }

    snakeBody.update(this.prevDimensions);
    this.findBodyCollision(topPosition, leftPosition);

    setTimeout(this.move.bind(this), this.SPEED);
  }

  findBodyCollision(top, left) {
    let current = this.next;
    let currentTop;
    let currentLeft;
    while (current) {
      currentTop = Number(current.node.style.top.replace("px", ""));
      currentLeft = Number(current.node.style.left.replace("px", ""));
      if (top === currentTop && left === currentLeft) {
        snakeBody.removeBody(apple);
        this.node.style.top = "350px";
        this.node.style.left = "350px";
        this.currentDirection = "none";
        this.gameOver(this.highScore);
      }
      current = current.next;
    }
  }

  alertGameOver() {
    let prevHighScore = 0;
    let highScore = 0;
    let called = false;
    return (score) => {
      if (called === false) {
        highScore = score;
        called = true;
        alert(`game over! your Highscore is ${highScore}`);
        this.highScore = 0;
      } else {
        console.log(score < prevHighScore, score, highScore, prevHighScore);
        if (score < highScore) {
          alert(`game over! your score is ${score}`);
        } else {
          prevHighScore = highScore;
          highScore = score;
          alert(
            `eeeeerrrrm, game over. Your new highscore is ${highScore}, your previous score was ${prevHighScore}`
          );
        }

        this.highScore = 0;
      }
    };
  }
}
