/* Things I'm allowed to do:
  http://en.wikipedia.org/wiki/File:Basic-construction-demo.png

  Proof of concept code to create compass/straightedge geometrical constructs
  with HTML5 canvases. The math for finding intersections I pulled from Wolfram's
  "Math World" as well as some independent work I did here:
  http://cautery.blogspot.com/2010/09/detecting-when-mouse-cursor-is-near.html

  All work herein is freely redistributable under LGPL3.

  Curtis Autery
  June 2012

  Modernized November 2020
*/


const fullScreenBox = document.getElementById('fullScreenBox')
const ta = document.getElementById('ta')
const cnv = document.getElementById('cnv')
const ctx = cnv.getContext('2d')

const cr = Math.PI * 2
const Type = {POINT : 0, LINE : 1, CIRCLE : 2}
const pointRadius = 3
const textOffsetX = 5
const textOffsetY = -5
const highlightColor = '#0000FF'

var col, sm, interval, label
var canvasBounds = {}

function Point(x, y) {
  this.x = x
  this.y = y
  this.highlighted = false

  this.type = Type.POINT
  this.draw = function() {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, pointRadius, 0, cr, false)
    ctx.fill()
  }
}

function Circle(center, R) {
  this.center = center; // a Point
  this.R = R
  this.radius = dist(center, R)
  this.r2 = this.radius * this.radius
  this.highlighted = false

  this.type = Type.CIRCLE
  this.draw = function() {
    ctx.beginPath()
    ctx.moveTo(this.center.x + this.radius, this.center.y)
    ctx.arc(this.center.x, this.center.y, this.radius, 0, cr, false)
    ctx.stroke()
  }

  this.getCircleIntersect = function(circle) {
    var d = dist(this.center, circle.center)
    if (d > this.radius + circle.radius) {
      return new Intersect([], "Circles do not intersect")
    }
    if (d < Math.abs(this.radius - circle.radius) || d == 0) {
      return new Intersect([], "One circle encloses the other")
    }
    var a = (this.r2 - circle.r2 + d * d) / (2 * d)
    var h = Math.sqrt(this.r2 - a * a)
    var midX = this.center.x + a * (circle.center.x - this.center.x) / d
    var midY = this.center.y + a * (circle.center.y - this.center.y) / d
    var hyy = h * (circle.center.y - this.center.y) / d
    var hxx = h * (circle.center.x - this.center.x) / d
    var points = []
    points[0] = new Point(midX + hyy, midY - hxx)
    // if d = r1 + r2, circles are tangent, else add second intersect point
    if (d < this.radius + circle.radius) {
      points[1] = new Point(midX - hyy, midY + hxx)
    }
    return new Intersect(points, "")
  }

  this.getLineIntersect = function(line) {
    var x1 = line.A.x - this.center.x
    var x2 = line.B.x - this.center.x
    var y1 = line.A.y - this.center.y
    var y2 = line.B.y - this.center.y
    var dx = x2 - x1
    var dy = y2 - y1
    var dr = Math.sqrt(dx * dx + dy * dy)
    var dr2 = dr * dr
    var D = x1 * y2 - x2 * y1
    var D2 = D * D
    var sgn = dy < 0 ? -1 : 1
    var disc = this.r2 * dr2 - D2
    if (disc < 0) return new Intersect([], "Line does not intersect circle")
    var points = []
    var tmpSqrt = Math.sqrt(this.r2 * dr2 - D2)
    var x = (D * dy + sgn * dx * tmpSqrt)/ dr2 + this.center.x
    var y = (-D * dx + Math.abs(dy) * tmpSqrt) / dr2 + this.center.y
    points[0] = new Point(x, y)
    if (disc > 0) {
      x = (D * dy - sgn * dx * tmpSqrt)/ dr2 + this.center.x
      y = (-D * dx - Math.abs(dy) * tmpSqrt) / dr2 + this.center.y
      points[1] = new Point(x, y)
    }
    return new Intersect(points, "")
  }
}

function Line(A, B) {
  this.A = A; // A and B are Points
  this.B = B
  var extended = false
  this.type = Type.LINE
  this.highlighted = false

  this.extend = function() {
    if (extended) return
    extended = true
    // move points A and B to edge of canvas
    var i = this.getLineIntersect(canvasBounds.top)
    if (i.points.length == 0) i = this.getLineIntersect(canvasBounds.left)
    var j = this.getLineIntersect(canvasBounds.bottom)
    if (j.points.length == 0) j = this.getLineIntersect(canvasBounds.right)
    this.A = i.points[0]
    this.B = j.points[0]
  }

  this.draw = function() {
    ctx.beginPath()
    ctx.moveTo(this.A.x, this.A.y)
    ctx.lineTo(this.B.x, this.B.y)
    ctx.stroke()
  }

  this.getLineIntersect = function(line) {
    var x1 = this.A.x
    var x2 = this.B.x
    var x3 = line.A.x
    var x4 = line.B.x
    var y1 = this.A.y
    var y2 = this.B.y
    var y3 = line.A.y
    var y4 = line.B.y
    
    var denom = det(x1 - x2, y1 - y2, x3 - x4, y3 - y4)
    if (denom == 0) return new Intersect([], "Lines don't intersect")
    var leftA = det(x1, y1, x2, y2)
    var leftC = det(x3, y3, x4, y4)
    var x = det(leftA, x1 - x2, leftC, x3 - x4) / denom
    var y = det(leftA, y1 - y2, leftC, y3 - y4) / denom
    return new Intersect([new Point(x, y)], "")
  }
}

function det(a, b, c, d) {
// Determinate in format |a b|
//                       |c d|
  return a * d - b * c
}

function dist(A, B) {
  var x = A.x - B.x
  var y = A.y - B.y
  return Math.sqrt(x * x + y * y)
}

function Intersect(points, message) {
  this.points = points
  this.message = message
}

function clear() {
  if (interval == null) return
  clearInterval(interval)
  interval = null
}

function init() {
  clear()
  var tl = new Point(0, 0)
  var tr = new Point(cnv.width, 0)
  var bl = new Point(0, cnv.height)
  var br = new Point(cnv.width, cnv.height)
  canvasBounds.top    = new Line(tl, tr)
  canvasBounds.bottom = new Line(bl, br)
  canvasBounds.left   = new Line(tl, bl)
  canvasBounds.right  = new Line(tr, br)

  ctx.translate(.5, .5)
  ctx.font = '14px sans-serif'
  ctx.strokeStyle = "black"
  col = {}
  sm = new StepManager()
}

function frame() {
  sm.frame()
}

function drawBoard() {
// Clear board
  ctx.clearRect(0, 0, cnv.width, cnv.height)

// Draw current label, if any
  if (label != "") ctx.fillText(label, 20, 20)

// Iterate through collection (col) of points, lines and circles, and call their draw() methods
  for (var e in col) {
    var elem = col[e]
    if (elem.highlighted) {
      ctx.save()
      ctx.strokeStyle = highlightColor
      ctx.fillStyle   = highlightColor
      ctx.lineWidth = 2
      elem.draw()
      ctx.restore()
    }
    else elem.draw()
    // ...and label the points
    if (elem.type == Type.POINT) {
      ctx.fillText(e, elem.x + textOffsetX, elem.y + textOffsetY)
    }
  }
}

function run() {
  var nextStep = function() {
    cnv.onclick = null
    cnv.classList.remove('hand')
    if (sections == null || sections[index] == null) return
    var section = sections[index++]
    sm.init(section, nextStep)
  }

  label = ""
  col = {}
  clear()
  var lines = ta.value.split(/\n+/)
  var sections = []
  var index = 0
  sections[0] = {}
  sections[0].rules = []
  for (var l in lines) {
    var line = lines[l]
    if (line == '' || line.charAt(0) == '#') continue
    if (line.charAt(0) == ':') {
      sections[index].prompt = line.substr(1)
      index++
      sections[index] = {}
      sections[index].rules = []
    } else {
      sections[index].rules[sections[index].rules.length] = line
    }
  }
  index = 0
  openPromptBox()
  nextStep()
}

function StepManager() {
  var index, done, i, steps, callback, prompt

  this.init = function(s, c) {
    steps = s.rules
    prompt = s.prompt
    callback = c
    i = null
    index = 0
    done = false
    drawBoard()
    interval = setInterval(frame, document.getElementById('delay').value)
  }

  function point(x, y, name) {
    y = parseInt(y)
    if (x == 'i') col[name] = i.points[y]
    else col[name] = new Point(parseInt(x) + 192, y + 144)
  }

  function line(a, b) {
    var name = '_ln_' + a + '_' + b
    col[name] = new Line(col[a], col[b])
  }

  function extend(a, b) { 
    var name = '_ln_' + a + '_' + b
    col[name].extend()
  }

  function circle(a, b) {
    var name = '_cr_' + a + '_' + b
    col[name] = new Circle(col[a], col[b])
  }

  function getObj(type, a, b) {
    return col[nameFromElems(type, a, b)]
  }

  function intersect(typeA, a, b, typeB, c, d) {
    var objA = getObj(typeA, a, b)
    var objB = getObj(typeB, c, d)
    if (typeB == "circle") i = objA.getCircleIntersect(objB)
    else i = objA.getLineIntersect(objB)
  }

  function nameFromElems(type, a, b) {
    if (type == "circle")return '_cr_' + a + '_' + b
    if (type == "line")  return '_ln_' + a + '_' + b
    return a
  }

  function deleteObj(type, a, b) {
    delete(col[nameFromElems(type, a, b)])
  }

  function setHighlighted(type, a, b) {
    col[nameFromElems(type, a, b)].highlighted = true
  }

  function display(msg) {
    label = msg
  }

  this.frame = function() {
    if (done == true) {
      clear()
      showPrompt(prompt, callback)
      return
    }
    this.nextStep()
    drawBoard()
  }

  function showPrompt(prompt, callback) {
    if (prompt == null) {
      label = "done"
      drawBoard()
      return
    }
    label = prompt
    drawBoard()
    showArrow()
    cnv.onclick = callback
  }

  this.nextStep = function() {
    if (index >= steps.length) {
      done = true
      return
    }
    var step = steps[index++]
    var elems = step.split(/\s+/)
    switch(elems[0]) {
    case '':
    case '#':
      this.nextStep()
      break
    case 'point':
      point(elems[1], elems[2], elems[3])
      break
    case 'circle':
      circle(elems[1], elems[2])
      break
    case 'line':
      line(elems[1], elems[2])
      break
    case 'extend':
      extend(elems[1], elems[2])
      break
    case 'intersect':
      intersect(elems[1], elems[2], elems[3], elems[4], elems[5], elems[6])
      this.nextStep()
      break
    case 'delete':
      deleteObj(elems[1], elems[2], elems[3])
      break
    case 'highlight':
      setHighlighted(elems[1], elems[2], elems[3])
      break
    default:
      display("Unknown step type: " + elems[0])
      done = true
      return
    }
  }

}

function showArrow() {
  ctx.save()
  ctx.fillStyle = "#A0FFA0"
  ctx.translate(cnv.width - 50, cnv.height - 50)
  ctx.beginPath()
  ctx.moveTo( 0, 16)
  ctx.lineTo(25, 16)
  ctx.lineTo(25, 0 )
  ctx.lineTo(49, 24)
  ctx.lineTo(25, 48)
  ctx.lineTo(25, 32)
  ctx.lineTo( 0, 32)
  ctx.lineTo( 0, 16)
  ctx.fill()
  ctx.restore()
  cnv.classList.add('hand')
}

const instructions = {
  inscribedTriangle: `:Inscribe an equilateral triangle in an existing circle
point 270 240 O
point 370 240 P0
:Let O be the circle's center, and P0 be any point on the circle's edge
circle O P0
:Draw a line from O to P0, and extend it to the circle's other side to find Q
line O P0
extend O P0
intersect circle O P0 line O P0
point i 1 Q
:Draw a circle from center Q with radius O
circle Q O
:The intersection points between the two circles will be the triangle's other two points
intersect circle O P0 circle Q O
point i 1 P1
point i 0 P2
:Delete debris, connect the dots
delete circle Q O
delete point Q
delete line O P0
line P0 P1
line P1 P2
line P2 P0
`,
  bisect: `:Draw angle ABC
point 280 100 A
point 320 240 B
point 420 240 C
line A B
line B C
:Draw circle at B with C radius
circle B C
:Mark intersect point of circle and line AB as D
intersect circle B C line A B
point i 1 D
:Draw circles DB and CB
circle D B
circle C B
:Mark intersect point of two new circles (other than B) as E
intersect circle D B circle C B
point i 0 E
:Draw bisecting line BE
line B E
extend B E
:Erase chaff
delete circle D B
delete circle C B
delete point D
delete circle B C
`,
  hep: `:Draw origin and P1, circle, and diameter
point 320 300 O
point 490 300 P1
circle O P1
line O P1
extend O P1

:Find perpendicular bisector of diameter
intersect circle O P1 line O P1
point i 1 tmp
circle tmp P1
circle P1 tmp
intersect circle tmp P1 circle P1 tmp
point i 0 b1
line b1 O
intersect circle O P1 line b1 O
point i 1 B
delete circle tmp P1
delete circle P1 tmp
delete point tmp
delete line b1 O
delete point b1
line O B

:Create point J 1/4 of the way up OB
circle B O
intersect circle B O circle O P1
point i 1 b1
point i 0 b2
line b1 b2
intersect line O B line b1 b2
point i 0 tmp
delete circle B O
delete line b1 b2
delete point b1
delete point b2
circle O tmp
circle tmp O
intersect circle O tmp circle tmp O
point i 0 b1
point i 1 b2
line b1 b2
line O tmp
intersect line b1 b2 line O tmp
point i 0 J
delete circle O tmp
delete circle tmp O
delete point tmp
delete line b1 b2
delete point b1
delete point b2
delete line O tmp

:Create line JP1 and find E on bisector line where OJE is 1/4 of OJP1
line J P1
circle J O
intersect circle J O line J P1
point i 0 tmp
circle O J
circle tmp J
intersect circle O J circle tmp J
delete point tmp
point i 1 t
line J t
delete circle tmp J
intersect circle J O line J t
point i 0 tmp
line J tmp
delete line J t
delete point t
delete circle J O
circle tmp J
intersect circle O J circle tmp J
point i 1 t
line J t
delete circle O J
delete circle tmp J
delete line J tmp
delete point tmp
intersect line O P1 line J t
point i 0 E
line J E
delete line J t
delete point t

:create F on circle bisect line such that EJF is 45 degrees
circle J E
extend J E
intersect circle J E line J E
point i 1 tmp
circle tmp E
circle E tmp
intersect circle tmp E circle E tmp
point i 1 t
line J t
delete circle tmp E
delete circle E tmp
delete point tmp
line J E
intersect circle J E line J t
point i 0 tmp
delete line J t
delete point t
circle E J
circle tmp J
intersect circle E J circle tmp J
point i 0 t
line J t
delete circle E J
delete circle tmp J
delete point tmp
delete circle J E
intersect line O P1 line J t
point i 0 F
line J F
delete line J t
delete point t

:Create circle with diameter F P1
circle F P1
circle P1 F
intersect circle F P1 circle P1 F
point i 0 b1
point i 1 b2
line b1 b2
intersect line b1 b2 line O P1
point i 0 t
delete circle F P1
delete circle P1 F
delete line b1 b2
delete point b1
delete point b2
circle t P1
intersect circle t P1 line O B
point i 1 K
delete point t
circle E K
intersect circle E K line O P1
point i 0 N4

:Create perpendicular line through OP1 at N4
circle N4 E
intersect circle N4 E line O P1
point i 0 t
circle t E
circle E t
intersect circle t E circle E t
point i 1 b1
line N4 b1
delete circle t E
delete circle E t
delete circle N4 E
delete point t
extend N4 b1

:Perpendicular line at N4 cuts circle O P1 at P4
intersect circle O P1 line N4 b1
point i 1 P4
line N4 P4
delete line N4 b1
delete point b1

:Delete artifacts
delete circle t P1
delete circle E K
delete point K
delete line J F
delete point F
delete line J E
delete point E
delete line J P1
delete point J
delete line N4 P4
delete point N4
delete line O B
delete point B

:Create remaining 15 points using P1/P4 as initial radius
circle P4 P1
intersect circle O P1 circle P4 P1
point i 0 P7
delete circle P4 P1
circle P7 P4
intersect circle O P1 circle P7 P4
point i 0 P10
delete circle P7 P4
circle P10 P7
intersect circle O P1 circle P10 P7
point i 0 P13
delete circle P10 P7
circle P13 P10
intersect circle O P1 circle P13 P10
point i 0 P16
delete circle P13 P10
circle P16 P13
intersect circle O P1 circle P16 P13
point i 0 P2
delete circle P16 P13
circle P2 P16
intersect circle O P1 circle P2 P16
point i 0 P5
delete circle P2 P16
circle P5 P2
intersect circle O P1 circle P5 P2
point i 0 P8
delete circle P5 P2
circle P8 P5
intersect circle O P1 circle P8 P5
point i 0 P11
delete circle P8 P5
circle P11 P8
intersect circle O P1 circle P11 P8
point i 0 P14
delete circle P11 P8
circle P14 P11
intersect circle O P1 circle P14 P11
point i 0 P17
delete circle P14 P11
circle P17 P14
intersect circle O P1 circle P17 P14
point i 0 P3
delete circle P17 P14
circle P3 P17
intersect circle O P1 circle P3 P17
point i 0 P6
delete circle P3 P17
circle P6 P3
intersect circle O P1 circle P6 P3
point i 0 P9
delete circle P6 P3
circle P9 P6
intersect circle O P1 circle P9 P6
point i 0 P12
delete circle P9 P6
circle P12 P9
intersect circle O P1 circle P12 P9
point i 0 P15
delete circle P12 P9

:Connect the dots
line P1 P2
line P2 P3
line P3 P4
line P4 P5
line P5 P6
line P6 P7
line P7 P8
line P8 P9
line P9 P10
line P10 P11
line P11 P12
line P12 P13
line P13 P14
line P14 P15
line P15 P16
line P16 P17
line P17 P1
delete circle O P1
delete line O P1
delete point O`,
  hep2: `:Heptadecagon, Carlyle circle method
point 320 240 O
point 440 240 P0
circle O P0
line O P0
extend O P0
intersect circle O P0 line O P0
point i 1 Q
circle Q P0
circle P0 Q
intersect circle Q P0 circle P0 Q
point i 0 b1
line b1 O
delete circle Q P0
delete circle P0 Q
intersect circle O P0 line b1 O
point i 1 A
line A O
extend A O
delete line b1 O
delete point b1
circle Q O
intersect circle O P0 circle Q O
point i 1 b1
point i 0 b2
line b1 b2
intersect line O P0 line b1 b2
point i 0 Q'
delete point b1
delete point b2
delete circle Q O
circle Q' P0
intersect circle Q' P0 line b1 b2
point i 0 M0
delete line b1 b2
delete circle Q' P0
line Q' M0
circle M0 A
intersect circle M0 A line O P0
point i 0 H0,2
point i 1 H1,2
delete circle M0 A
delete line Q' M0
delete point Q'
delete point M0
circle O H1,2
circle H1,2 O
intersect circle O H1,2 circle H1,2 O
point i 1 b1
point i 0 b2
line b1 b2
delete circle O H1,2
delete circle H1,2 O
delete point H1,2
intersect line b1 b2 line O P0
point i 0 M1,2
circle O H0,2
circle H0,2 O
intersect circle O H0,2 circle H0,2 O
point i 1 b1
point i 0 b2
line b1 b2
delete circle O H0,2
delete circle H0,2 O
delete point H0,2
intersect line b1 b2 line O P0
point i 0 M0,2
delete point b1
delete point b2
delete line b1 b2
circle M0,2 A
intersect circle M0,2 A line O P0
point i 0 H0,4
delete circle M0,2 A
delete point M0,2
circle M1,2 A
intersect circle M1,2 A line O P0
point i 0 H1,4
delete circle M1,2 A
delete point M1,2
circle O H1,4
circle H1,4 O
intersect circle O H1,4 circle H1,4 O
point i 0 F
line F O
line F H1,4
delete circle O H1,4
delete circle H1,4 O
extend F O
extend F H1,4
circle H1,4 Q
intersect circle H1,4 Q line F H1,4
point i 0 G
circle F G
delete circle H1,4 Q
intersect circle F G line F O
point i 0 L
delete circle F G
delete point G
delete line F H1,4
delete point F
circle O L
intersect circle O L line A O
point i 1 Y
delete line F O
delete circle O L
delete point L
line Y H0,4
circle Y H0,4
circle H0,4 Y
intersect circle Y H0,4 circle H0,4 Y
point i 0 b1
point i 1 b2
line b1 b2
delete circle Y H0,4
delete circle H0,4 Y
intersect line Y H0,4 line b1 b2
point i 0 M0,4
delete line b1 b2
delete point b1
delete point b2
circle M0,4 A
intersect circle M0,4 A line O P0
point i 0 H0,8
delete circle M0,4 A
delete point M0,4
delete line Y H0,4
delete point H0,4
delete point H1,4
delete point Y
delete point Q
delete point A
circle P0 H0,8
circle H0,8 P0
intersect circle P0 H0,8 circle H0,8 P0
point i 0 F
line F P0
line F H0,8
delete circle P0 H0,8
delete circle H0,8 P0
extend F P0
extend F H0,8
intersect circle O P0 line F P0
point i 0 G
circle F G
intersect circle F G line F H0,8
point i 0 L
delete circle F G
delete point G
delete line F P0
circle H0,8 L
intersect circle O P0 circle H0,8 L
point i 0 P1
point i 1 P16
delete circle H0,8 L
delete point L
delete point F
delete line F H0,8
delete point H0,8
delete line A O
delete line O P0
delete point O
circle P1 P0
intersect circle O P0 circle P1 P0
point i 0 P2
delete circle P1 P0
circle P2 P1
intersect circle O P0 circle P2 P1
point i 0 P3
delete circle P2 P1
circle P3 P2
intersect circle O P0 circle P3 P2
point i 0 P4
delete circle P3 P2
circle P4 P3
intersect circle O P0 circle P4 P3
point i 0 P5
delete circle P4 P3
circle P5 P4
intersect circle O P0 circle P5 P4
point i 0 P6
delete circle P5 P4
circle P6 P5
intersect circle O P0 circle P6 P5
point i 0 P7
delete circle P6 P5
circle P7 P6
intersect circle O P0 circle P7 P6
point i 0 P8
delete circle P7 P6
circle P8 P7
intersect circle O P0 circle P8 P7
point i 0 P9
delete circle P8 P7
circle P9 P8
intersect circle O P0 circle P9 P8
point i 0 P10
delete circle P9 P8
circle P10 P9
intersect circle O P0 circle P10 P9
point i 0 P11
delete circle P10 P9
circle P11 P10
intersect circle O P0 circle P11 P10
point i 0 P12
delete circle P11 P10
circle P12 P11
intersect circle O P0 circle P12 P11
point i 0 P13
delete circle P12 P11
circle P13 P12
intersect circle O P0 circle P13 P12
point i 0 P14
delete circle P13 P12
circle P14 P13
intersect circle O P0 circle P14 P13
point i 0 P15
delete circle P14 P13
line P0 P1
line P1 P2
line P2 P3
line P3 P4
line P4 P5
line P5 P6
line P6 P7
line P7 P8
line P8 P9
line P9 P10
line P10 P11
line P11 P12
line P12 P13
line P13 P14
line P14 P15
line P15 P16
line P16 P0
delete circle O P0
`,
  triangle: `:Draw origin and P0, circle, and diameter
point 320 300 O
point 490 300 P0
circle O P0
line O P0
extend O P0

:Find perpendicular bisector of diameter
intersect circle O P0 line O P0
point i 1 tmp
circle tmp P0
circle P0 tmp
intersect circle tmp P0 circle P0 tmp
point i 0 b1
line b1 O
intersect circle O P0 line b1 O
point i 1 B
delete circle tmp P0
delete circle P0 tmp
delete point tmp
delete line b1 O
delete point b1
line O B

:Circle BO cuts circle O P0 at top two points of triangle
circle B O
intersect circle O P0 circle B O
point i 0 P1
point i 1 P2
line P1 P2
delete circle B O

:Extend line OB to other end of circle to find final point of triangle
extend O B
intersect circle O P0 line O B
point i 0 P3
line P1 P3
line P3 P2
delete line O B
delete point B
delete line O P0
delete point P0
delete point O
delete circle O P0`,
  b1p1: `:Book I, Proposition I, to describe an equilateral triangle upon a given finite straight line
:Let AB be the given straight line. It is required to describe an equilateral triangle upon AB
point 270 240 A
point 370 240 B
line A B
:From the center A at the distance AB, describe a circle
circle A B
:From the center B at the distance BA, describe a circle
circle B A
:Call the topmost intersection of the two circles point C
intersect circle A B circle B A
point i 0 C
:Draw the straight lines CA, CB to the points A, B
line C A
line C B
:Then ABC shall be an equilateral triangle
highlight line C A
highlight line A B
highlight circle A B
:The circle with center A has radius lines AB and CA which are equal
circle A B
line C A
highlight line C B
highlight circle B A
:and the circle with center B has radius lines AB and CB which are equal
circle B A
highlight line C A
:Therefore AB = CB = CA, and triangle ABC is equilateral
`,
  b1p2: `:Book I, Proposition II. From a given point, to draw a straight line equal to the given straight line
:Let A be the given point, and BC the given straight line. It is required to draw from the point A a straight line equal to BC
point 320 260 A
point 270 300 B
point 170 300 C
line B C
:From the point A to B draw the straight line AB
line A B
:Upon AB describe the equilateral triangle ABD
circle A B
circle B A
intersect circle A B circle B A
point i 1 D
line D A
line D B
delete circle A B
delete circle B A
:Extend lines DA and DB
extend D A
extend D B
:From the center B at the distance BC, describe a circle, cutting line DB at G
circle B C
intersect circle B C line D B
point i 0 G
delete line D B
line D G
:From the center D at the distance DG, describe a circle, cutting line DA at L
circle D G
intersect circle D G line D A
point i 0 L
delete line D A
line D L
highlight circle B C
highlight line B C
line B G
highlight line B G
:Circle with center B has radius lines BC and BG, which are equal
circle B C
line B C
line B G
highlight circle D G
highlight line D L
highlight line D G
:Circle with center D has radius lines DL and DG, which are equal
circle D G
line D L
line D G
line D A
line D B
highlight line D A
highlight line D B
:Lines DA and DB are equal, being legs of the equilateral triangle
delete line D A
delete line D B
line A L
highlight line A L
highlight line B G
:Therefore the remainders AL and BG are equal
highlight line B C
:Therefore BC = BG = AL
`,
  b1p3: `:Book I, Proposition III. From the greater of two given straight lines to cut off a part equal to the less
:Let AB and C1C2 be the two given straight lines, of which AB is the greater
point 320 240 A
point 470 240 B
line A B
point 250 200 C1
point 250 300 C2
line C1 C2
:From the point A draw the straight line AD equal to C1C2
line A C1
circle A C1
circle C1 A
intersect circle A C1 circle C1 A
point i 1 t
line t C1
line t A
delete circle A C1
delete circle C1 A
extend t A
extend t C1
circle C1 C2
intersect circle C1 C2 line t C1
point i 0 G
circle t G
intersect circle t G line t A
point i 0 D
delete circle t G
delete circle C1 C2
delete point G
delete line t C1
line A D
delete line t A
delete point t
delete line A C1
:From the center A at the distance AD, describe a circle cutting line A B at point E
circle A D
intersect circle A D line A B
point i 0 E
line A E
highlight line A D
highlight line C1 C2
:From bk I prop II, line AD equals line C1C2
line C1 C2
highlight circle A D
highlight line A E
:Circle with center A has radius points AD and AE, which are equal
circle A D
highlight line C1 C2
:Therefore C1C2 = AD = AE
`,
  b1p9: `:Book I, Proposition IX - To bisect a given rectilineal angle, that is, to divide it into two equal angles
:Let BAC be the given rectilineal angle. It is required to bisect it
point 320 150 A
point 280 240 B
point 370 250 C
line A B
line A C
:Create point D on AB and point E on AC of equal length
point 370 165 t
line A t
circle A t
intersect circle A t line A B
point i 0 D
intersect circle A t line A C
point i 0 E
delete line A t
delete point t
delete circle A t
:Describe the equilateral triangle DEF, pointed away from A
line D E
circle D E
circle E D
intersect circle D E circle E D
point i 1 F
line F D
line F E
delete circle D E
delete circle E D
line A F
:The straight line AF shall bisect the angle BAC
line A D
line A E
highlight line A D
highlight line A E
highlight line A F
:Because AD equals AE, and AF is common to the two triangles DAF, EAF
delete line A D
delete line A E
line A F
line D F
line E F
highlight line D F
highlight line E F
:And the base DF is equal to the base EF
line D F
line E F
highlight line A B
highlight line A C
highlight line A F
:Therefore the angle DAF is equal to the angle EAF, wherefor the angle BAC is bisected by AF
`,
  b1p10: `:Book I, Proposition X - To bisect a given finite straight line, that is, to divide it into two equal parts
:Let AB be the given straight line
point 270 240 A
point 370 240 B
line A B
:Upon AB describe the equilateral triangle ABC
circle A B
circle B A
intersect circle A B circle B A
point i 0 C
delete circle A B
delete circle B A
line C A
line C B
:Bisect the angle ACB by the straight line CD, meeting AB in the point D
circle A B
circle B A
intersect circle A B circle B A
point i 1 t
line t A
line t B
delete circle A B
delete circle B A
line C t
intersect line C t line A B
point i 0 D
line C D
delete line C t
delete line t A
delete line t B
delete point t
:Then AB shall be cut into two equal parts in the point D.
highlight line C A
highlight line C B
highlight line C D
:Because AC = CB, and CD is common to the two triangles ACD, BCD; and the angle ACD is equal to BCD;
line C A
line C B
line C D
highlight line A B
:Therefore the base AD = the base BD, wherefore the straight line AB is divided into two equal parts in the point D.
`,
  b1p11: `:Book I, Proposition XI - To draw a straight line at right angles to a given straight line, from a given point in the same.
:Let AB be a line, and C a given point in it. It is required to draw a straight line from the point C at right angles to point AB
point 150 240 A
point 390 240 B
point 300 240 C
line A B
:In AC, take any point D and make CE equal to CD
circle A C
circle C A
intersect circle A C circle C A
point i 0 t
point i 1 z
line t z
intersect line A B line t z
point i 0 D
delete line t z
delete point t
delete point z
delete circle A C
delete circle C A
circle C D
intersect circle C D line A B
point i 0 E
delete circle C D
:Upon DE describe the equilateral triangle DEF, and join CF
circle D E
circle E D
intersect circle D E circle E D
point i 0 F
line F D
line F E
delete circle D E
delete circle E D
line F C
line D C
line E C
highlight line D C
highlight line E C
highlight line F C
:Then CF shall be at right angles to AB. Because DC is equal to EC, and FC is common to the two triangles DCF, ECF;
line F C
line D C
line E C
highlight line F D
highlight line F E
:And the base DF is equal to the base EF, therefore DCF = ECF:
line F D
line F E
highlight line D C
highlight line E C
highlight line F C
:...and since DCF and ECF are equal, adjacent angles, on the same line, they are both right angles
`,
  euclid: `:Pentagon, Euclid's method. Create line F G, divided at C so that FC/CG = the golden ratio
point 150 200 F
point 150 275 G
line F G
circle F G
extend F G
intersect circle F G line F G
point i 1 t
circle t G
circle G t
intersect circle t G circle G t
point i 0 u
line F u
delete circle t G
delete circle G t
delete point t
intersect circle F G line F u
point i 0 C
delete point u
delete line F u
delete circle F G
line F C
delete circle F G
line F G
circle F C
circle C F
intersect circle F C circle C F
point i 0 b1
point i 1 b2
line b1 b2
intersect line F C line b1 b2
point i 0 E
delete point b1
delete point b2
delete line b1 b2
delete circle F C
delete circle C F
line G E
circle E G
extend F C
intersect circle E G line F C
point i 1 I
delete circle E G
circle F I
intersect circle F I line F G
point i 0 C
delete circle F I
delete point E
delete line G E
delete line F C
delete point I
:Construct golden triangle FGH
circle F G
circle C G
circle G C
intersect circle C G circle G C
point i 1 t
line t C
line t G
extend t C
extend t G
delete circle C G
delete circle G C
circle C F
intersect circle C F line t C
point i 1 u
delete circle C F
circle t u
intersect circle t u line t G
point i 0 v
delete circle t u
delete line t C
delete point u
circle G v
intersect circle F G circle G v
point i 0 H
delete circle G v
delete point v
delete line t G
delete point t
line G H
line H F
delete point C
delete circle F G
:Construct circle which will contain inscribed pentagon, and tangent line LAN
point 400 290 O
point 500 290 R
point 300 190 L
circle O R
line O L
circle O L
intersect circle O R line O L
point i 1 t
circle t L
intersect circle t L line O L
point i 0 u
delete circle t L
circle L u
circle u L
intersect circle L u circle u L
point i 0 b1
line t b1
extend t b1
intersect circle O L line t b1
point i 1 v
delete line b1 b2
delete point b1
delete point b2
delete circle L u
delete circle u L
delete point u
delete line t b1
line t v
line O v
intersect circle O R line O v
point i 1 A
line L A
extend L A
intersect circle O L line L A
point i 0 N
delete line L A
line L N
delete circle O L
delete line t v
delete line O v
delete point v
delete line O L
delete point t
delete point R
:Create angle NAD equal to FGH
line H A
circle H A
circle A H
intersect circle H A circle A H
point i 1 b
line b H
line b A
extend b H
extend b A
delete circle H A
delete circle A H
circle H F
intersect circle H F line b H
point i 0 c
circle b c
intersect circle b c line b A
point i 1 d
circle A d
intersect circle A d line L N
point i 1 M
delete circle A d
delete point c
delete point d
delete circle b c
delete circle H F
circle H G
intersect circle H G line b H
point i 0 c
circle b c
delete circle H G
intersect circle b c line b A
point i 1 d
circle A d
delete circle b c
delete line b c
delete point c
delete line b H
circle M A
intersect circle M A circle A d
point i 0 e
delete line H A
delete line b A
delete point b
line A e
delete circle M A
extend A e
intersect circle O R line A e
point i 0 D
delete point e
delete line A e
line A D
:Create angle LAC equal to angle FHG
circle A M
intersect circle A M line L N
point i 0 b
delete circle A M
circle b A
intersect circle b A circle A d
point i 1 e
delete circle A d
delete point d
delete circle b A
delete point b
delete point M
line A e
extend A e
intersect circle O R line A e
point i 0 C
delete point e
delete line A e
line A C
:Connect C to D to create inscribed golden triangle, bisect larger angles
line C D
delete line L N
delete point L
delete point N
circle C D
intersect circle C D line A C
point i 1 t
circle t C
circle D C
intersect circle t C circle D C
point i 0 E
line C E
delete circle t C
intersect circle D C line A D
point i 1 t
delete circle D C
circle t D
intersect circle t D circle C D
point i 1 B
line D B
delete circle C D
delete circle t D
delete point t
:Remove debris, connect the dots
delete point O
delete line C E
delete line D B
delete line A C
delete line A D
line A B
line B C
line D E
line E A
`,
  phi: `:Pentagon, Phi method. Start by creating unit circle at O with diameter Q-P0
point 320 240 O
point 420 240 P0
circle O P0
line O P0
extend O P0
intersect circle O P0 line O P0
point i 1 Q
:Create line AO at circle's top, perpendicular to diameter line
circle Q P0
circle P0 Q
intersect circle Q P0 circle P0 Q
point i 0 b1
line b1 O
intersect circle O P0 line b1 O
point i 1 A
line A O
delete circle Q P0
delete circle P0 Q
delete line b1 O
delete point b1
:Create circle with center B at midpoint of AO, with diameter AO
circle A O
intersect circle A O circle O P0
point i 0 b1
point i 1 b2
line b1 b2
intersect line A O line b1 b2
point i 0 B
delete circle A O
delete line A O
delete line b1 b2
delete point b1
delete point b2
circle B A
:Connect Q to B, extend, and find intersection points M and N in smaller circle
line Q B
extend Q B
intersect circle B A line Q B
point i 0 M
point i 1 N
line Q N
delete line Q B
delete point B
:Draw circles from center Q to radius M and N. These intersect unit circle at pentagon's vertex points 
circle Q M
circle Q N
delete circle B A
delete point A
intersect circle O P0 circle Q N
point i 1 P1
point i 0 P4
intersect circle O P0 circle Q M
point i 1 P2
point i 0 P3
:Clear artifacts, connect the dots
delete line Q N
delete point M
delete point N
delete circle Q M
delete circle Q N
delete point Q
line P0 P1
line P1 P2
line P2 P3
line P3 P4
line P4 P0
delete circle O P0
delete point O
`,
  cosine: `:Pentagon, Cosine method. Draw unit circle with origin O and radius point P0 on x axis
point 320 240 O
point 420 240 P0
circle O P0
line O P0
extend O P0
:Find perpendicular bisector of diameter
intersect circle O P0 line O P0
point i 1 tmp
circle tmp P0
circle P0 tmp
intersect circle tmp P0 circle P0 tmp
point i 0 b1
line b1 O
intersect circle O P0 line b1 O
point i 1 B
delete circle tmp P0
delete circle P0 tmp
delete point tmp
delete line b1 O
delete point b1
line O B
:Bisect line OB at point D, connect to P0
circle B O
intersect circle B O circle O P0
point i 1 b1
point i 0 b2
line b1 b2
intersect line O B line b1 b2
point i 0 D
delete circle B O
delete line b1 b2
delete point b1
delete point b2
line D P0
:Bisect angle ODP0, connect to line OP0 as N2
circle D O
intersect circle D O line D P0
point i 0 tmp
delete circle D O
circle O D
circle tmp D
intersect circle O D circle tmp D
point i 1 t
line D t
delete circle O D
delete circle tmp D
delete point tmp
intersect line O P0 line D t
point i 0 N2
line D N2
delete line D t
delete point t
:Line at N2 perpendicular to line OP0 is point P1
circle N2 O
intersect circle N2 O line O P0
point i 0 t
circle O t
circle t O
delete circle N2 O
intersect circle O t circle t O
point i 0 b1
line b1 N2
extend b1 N2
delete circle O t
delete circle t O
delete point t
intersect circle O P0 line b1 N2
point i 1 P1
delete point b1
line N2 P1
delete line b1 N2
:Delete artifacts
delete line N2 P1
delete line D N2
delete point N2
delete line D P0
delete point D
delete line O B
delete point B
:Create remaining 3 points using P0/P1 as initial radius
circle P1 P0
intersect circle O P0 circle P1 P0
point i 0 P2
delete circle P1 P0
circle P2 P1
intersect circle O P0 circle P2 P1
point i 0 P3
delete circle P2 P1
circle P3 P2
intersect circle O P0 circle P3 P2
point i 0 P4
delete circle P3 P2
:Connect the dots
line P0 P1
line P1 P2
line P2 P3
line P3 P4
line P4 P0
delete line O P0
delete circle O P0
delete point O
`,
  carlyle: `:Pentagon, Carlyle circle method
point 320 240 O
point 420 240 P0
circle O P0
line O P0
extend O P0
intersect circle O P0 line O P0
point i 1 Q
circle Q P0
circle P0 Q
intersect circle Q P0 circle P0 Q
point i 0 b1
point i 1 b2
line b1 b2
intersect circle O P0 line b1 b2
point i 1 A
delete circle Q P0
delete circle P0 Q
circle Q O
intersect circle O P0 circle Q O
point i 1 b1
point i 0 b2
line b1 b2
intersect line b1 b2 line O P0
point i 0 M
delete point b1
delete point b2
delete line b1 b2
delete circle Q O
circle M A
intersect circle M A line O P0
point i 0 H0
point i 1 H1
delete circle M A
circle Q H1
circle H1 Q
intersect circle Q H1 circle H1 Q
point i 1 F
delete circle Q H1
delete circle H1 Q
line F Q
line F H1
extend F Q
extend F H1
circle Q O
intersect circle O P0 circle Q O
point i 0 G
delete circle Q O
circle F G
intersect circle F G line F H1
point i 0 L
delete circle F G
delete point F
delete point G
delete line F Q
circle H1 L
delete line F H1
delete point L
intersect circle O P0 circle H1 L
point i 1 P2
point i 0 P3
delete circle H1 L
circle P2 P3
intersect circle O P0 circle P2 P3
point i 1 P1
delete circle P2 P3
circle P3 P2
intersect circle O P0 circle P3 P2
point i 0 P4
delete circle P3 P2
delete point H0
delete point H1
delete point M
delete point A
delete point Q
delete point O
line P0 P1
line P1 P2
line P2 P3
line P3 P4
line P4 P0
delete circle O P0
`
}

function openPromptBox() {
  fullScreenBox.style.display = 'block'
}

function closePromptBox() {
  clear()
  fullScreenBox.style.display = 'none'
}

init()

function load(key) {
  ta.value = instructions[key]
}
