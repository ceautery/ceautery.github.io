const canvas = document.getElementById('canvas')
canvas.width = 200
canvas.height = 300
const pen = canvas.getContext('2d')
pen.strokeStyle = 'grey'
pen.font = '14px sans-serif'
pen.textAlign = 'center'
pen.textBaseline = 'middle'

const segments = [
  { name: 'a', x: 100, y:  35 },
  { name: 'b', x: 155, y:  90, vertical: true },
  { name: 'c', x: 155, y: 200, vertical: true },
  { name: 'd', x: 100, y: 255 },
  { name: 'e', x:  45, y: 200, vertical: true },
  { name: 'f', x:  45, y:  90, vertical: true },
  { name: 'g', x: 100, y: 145 }
]

const patterns = {
  a: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
  b: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
  c: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  d: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  e: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  f: [1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
  g: [0, 0, 1, 1, 1, 1, 1, 0, 1, 1]
}

function drawSegment(segment) {
  const { x, y, vertical, lighted } = segment

  pen.save()
  pen.translate(x, y)
  if (vertical) pen.rotate(Math.PI / 2)
  pen.beginPath()
  pen.moveTo(-50,   0)
  pen.lineTo(-30, -20)
  pen.lineTo( 30, -20)
  pen.lineTo( 50,   0)
  pen.lineTo( 30,  20)
  pen.lineTo(-30,  20)
  pen.lineTo(-50,   0)
  pen.stroke()
  if (lighted) {
    pen.fillStyle = 'red'
    pen.fill()
    pen.fillStyle = 'black'
  }
  pen.fillText(segment.name, 0, 0)
  pen.restore()
}

function drawNumber(e) {
  const number = e.target.textContent | 0
  pen.clearRect(0, 0, canvas.width, canvas.height)
  segments.forEach((segment) => {
    const pattern = patterns[segment.name]
    segment.lighted = pattern[number]
    drawSegment(segment)
  })	
}

document.querySelectorAll('button').forEach(button => button.onclick = drawNumber)
segments.forEach(drawSegment)
