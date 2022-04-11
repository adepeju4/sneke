class NodeBody {
  constructor(el, count, cache) {
    this.node = document.createElement("div");
    this.node.setAttribute("class", "body");
    const list = this.node.classList;
    let className = "body" + count;
    list.add(className);
    el.appendChild(this.node);
    this.next = null;
    cache[className] = true;
  }
}
class Body {
  constructor(el, head, apple) {
    this.node = document.createElement("div");

    this.el = el;
    this.head = head;
    this.tail = null;

    this.SPEED = 250;
    this.topPosition2 = Number(head.node.style.top.replace("px", ""));
    this.leftPosition2 = Number(head.node.style.left.replace("px", ""));
    this.appleTopPosition2 = Number(apple.node.style.top.replace("px", ""));
    this.appleLeftPosition2 = Number(apple.node.style.left.replace("px", ""));
    this.currentPosition = {
      top: this.topPosition2,
      left: this.leftPosition2,
    };
    this.index = 1;
    this.counter = 0;
    this.segment = null;
    this.currentSnake = {};
    this.filledPositons = {};
    this.filledLeft = new Set();
    this.filledTop = new Set();
  }

  populateFilled(filledPositions) {
    for (let body in filledPositions) {
      if (body) {
        this.filledLeft.add(filledPositions[body].left);
        this.filledTop.add(filledPositions[body].top);
      }
    }
  }

  IncreaseBody() {
    if (this.counter > 0) {
      this.counter++;
      this.segment = new NodeBody(this.el, this.counter, this.currentSnake);
      let current = this.head;
      let parent = null;
      while (current) {
        parent = current;
        current = current.next;
      }
      parent.next = this.segment;
    }
    this.tail = this.segment;
    return this.segment;
  }

  EatingApple(top, left) {
    if (this.counter === 0) {
      this.counter++;
    }
    if (this.counter >= 0) {
      this.node = this.IncreaseBody().node;
      if (head.currentDirection === "right") {
        this.currentPosition.left = left;
        this.node.style.left = `${left}px`;
        this.currentPosition.top = top;
        this.node.style.top = `${top}px`;
      }
      if (head.currentDirection === "left") {
        this.currentPosition.left = left;
        this.node.style.left = `${left}px`;
        this.currentPosition.top = top;
        this.node.style.top = `${top}px`;
      }
      if (head.currentDirection === "up") {
        this.currentPosition.left = left;
        this.node.style.left = `${left}px`;
        this.currentPosition.top = top;
        this.node.style.top = `${top}px`;
      }
      if (head.currentDirection === "down") {
        this.currentPosition.left = left;
        this.node.style.left = `${left}px`;
        this.currentPosition.top = top;
        this.node.style.top = `${top}px`;
      }
    }
  }

  MoveTo(segment, prevDimensions) {
    const { top, left } = prevDimensions;

    segment.node.style.top = top + "px";
    segment.node.style.left = left + "px";
    this.filledLeft.add(left);
    this.filledTop.add(top);
  }

  update({ top, left }) {
    let current = this.head.next;
    let prevTop;
    let prevLeft;

    while (current) {
      prevTop = Number(current.node.style.top.replace("px", ""));
      prevLeft = Number(current.node.style.left.replace("px", ""));

      this.MoveTo(current, { top, left });
      top = prevTop;
      left = prevLeft;
      apple.filledTop = new Set();
      apple.filledLeft = new Set();
      current = current.next;
    }
  }

  removeBody(apple) {
    let current = this.head.next;

    while (current) {
      current.node.remove();
      this.counter--;
      this.head.next = null;
      this.filledPositons[current.node.classList[1]];

      current = current.next;
    }
    this.filledPositons = {};
    apple.filledTop = new Set();
    apple.filledLeft = new Set();
  }
}
