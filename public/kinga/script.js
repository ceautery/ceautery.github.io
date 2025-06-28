const heart = `..xx...xx..
.xxxx.xxxx.
xxxxxxxxxxx
xxxxxxxxxxx
xxxxxxxxxxx
 xxxxxxxxx
  xxxxxxx
   xxxxx
    xxx
     x`;

canvas.width = innerWidth;
canvas.height = innerHeight;
const pen = canvas.getContext("2d");
let interval;

const pieces = [];
function draw() {
  pen.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(drawPiece);
}

pen.font = "40px monospace";
function drawPiece(p) {
  if (p == null) return;
  const letter = p.letter || "\u25cf";
  pen.translate(p.x, p.y);
  pen.fillStyle = p.color;
  pen.fillText(letter, 0, 0);
  pen.resetTransform();
}

function color() {
  const r = Math.random();
  return r < 0.05
    ? "rebeccapurple"
    : r < 0.1
      ? "deepskyblue"
      : r < 0.15
        ? "gold"
        : r < 0.2
          ? "orange"
          : r < 0.6
            ? "green"
            : "red";
}

const offset = canvas.width / 2;
const sep = 50;

const start = offset - 265;
heart.split("\n").forEach((row, y) => {
  row.split("").forEach((letter, x) => {
    if (letter != "x") return;
    pieces.push({
      x: start + sep * x,
      y: 0,
      color: color(),
      goalY: 100 + sep * y,
    });
  });
});

"I love you, Kinga!".split("").forEach((letter, index) => {
  pieces.push({
    x: offset - 335 + index * 40,
    y: 0,
    color: color(),
    goalY: 650,
    letter: letter,
  });
});

for (let n = 0; n < pieces.length; n++) {
  const pieceNum = Math.floor(Math.random() * (pieces.length - n + 1));
  const piece = pieces.splice(pieceNum, 1)[0];
  pieces.push(piece);
}

const queue = pieces.slice();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class Dropper {
  constructor(timeout, blink) {
    _defineProperty(this, "dropPieces", () => {
      if (this.piece.y >= this.piece.goalY) {
        this.piece = queue.shift();

        if (this.piece == null) {
          clearInterval(this.interval);
          console.log("done");

          if (this.blink) {
            setInterval(this.blinkLight, 100);
          }

          return;
        }
      }

      this.piece.y += 5;
      draw();
    });

    _defineProperty(this, "blinkLight", () => {
      const pieceNum = Math.floor(Math.random() * pieces.length);
      pieces[pieceNum].color = color();
      draw();
    });

    this.blink = blink;
    this.piece = queue.shift();
    if (this.piece == null) return;
    this.interval = setInterval(this.dropPieces, timeout);
  }
}

let started = false;
const player = document.querySelector("audio");
player.oncanplay = showPlayButton;
player.innerHTML =
  '<source src="/kinga/k.mp3" type="audio/mpeg"><source src="/kinga/k.m4a" type="audio/m4a">';

function showPlayButton() {
  pen.fillStyle = "green";
  pen.fillText("\u25B6", canvas.width / 2, canvas.height / 2);
  canvas.onclick = toggleAction;
}

function toggleAction() {
  if (!started) {
    new Dropper(11);
    new Dropper(13);
    new Dropper(17);
    new Dropper(23);
    new Dropper(31);
    new Dropper(37, true);
  }

  if (player.paused) player.play();
  else player.pause();
}
