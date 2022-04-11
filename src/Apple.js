class Apple {
  constructor(el) {
    this.node = document.createElement("img");
    this.node.setAttribute("id", "apple");
    this.node.setAttribute("src", "src/assets/apple.jpg");

    el.appendChild(this.node);

    this.filledLeft = new Set();
    this.filledTop = new Set();

    this.setApple();
  }

  populateFilled(filledPositions) {
    for (let body in filledPositions) {
      if (body) {
        this.filledLeft.add(filledPositions[body].left);
        this.filledTop.add(filledPositions[body].top);
      }
    }
  }

  setApple(snakeTop, snakeLeft, filledPositons) {
    this.populateFilled(filledPositons);
    let appleLeft = Math.floor(Math.random() * 14) * 50;
    let appleTop = Math.floor(Math.random() * 14) * 50;
    while (
      snakeTop === appleTop &&
      snakeLeft === appleLeft &&
      this.filledLeft.has(appleLeft) &&
      this.filledRight.has(appleRight)
    ) {
      appleLeft = Math.floor(Math.random() * 14) * 50;
      appleTop = Math.floor(Math.random() * 14) * 50;
    }
    this.node.style.left = appleLeft + "px";
    this.node.style.top = appleTop + "px";
  }
}
