$(function() {
// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.StaticCanvas('c');

var CELLS_PER_ROW = 8
var WIDTH_OF_ROW = 400
var HEIGHT_OF_ROW = 30


function widthOfCell() {
  return WIDTH_OF_ROW / CELLS_PER_ROW;
}

function positionOfCell(position) {
  return [position % CELLS_PER_ROW * widthOfCell(),
    Math.floor(position / CELLS_PER_ROW) * HEIGHT_OF_ROW];
}

function middleOfCell(position) {
  var topLeft = positionOfCell(position);
  return [topLeft[0] + widthOfCell() * 0.45, topLeft[1] + HEIGHT_OF_ROW * 0.45]
}

var drawCell = function(position, value) {
  var groupArray = []

  if (value === undefined) {
    var rect = new fabric.Rect({
      fill: 'white',
      stroke: 'black',
      width: widthOfCell() * 0.9,
      height: HEIGHT_OF_ROW * 0.9
    });

    groupArray.push(rect);
  }
  else if (value[0] === "literal") {
    var rect = new fabric.Rect({
      fill: 'white',
      stroke: 'red',
      width: widthOfCell() * 0.9,
      height: HEIGHT_OF_ROW * 0.9
    });

    groupArray.push(rect);

    var text = new fabric.Text(" "+value[1], {
      fontSize: 12,
      fill: 'black'
    });

    groupArray.push(text);
  }
  else if (value[0] === "pointer") {
    var rect = new fabric.Rect({
      fill: 'white',
      stroke: 'green',
      width: widthOfCell() * 0.9,
      height: HEIGHT_OF_ROW * 0.9
    });

    groupArray.push(rect);
  }

  var pos = positionOfCell(position)

  var group = new fabric.Group(groupArray, {
    left: pos[0],
    top: pos[1],
  })

  // rect.animate('angle', 45, {
  //   onChange: canvas.renderAll.bind(canvas)
  // });

  canvas.add(group);
}

function postDrawCell(position, value) {
  if (value && value[0] == "pointer") {
    var oldPos = middleOfCell(position);
    var newPos = middleOfCell(value[1]);

    canvas.add(new fabric.Line(oldPos.concat(newPos), { stroke: "red", left: oldPos[0], top: oldPos[1]}));
    console.log(oldPos.concat(newPos))
  }
}

var drawAFuckingLine = function(x1, y1, x2, y2) {
  canvas.add(new fabric.Line([x1,y1,x2,y2], { stroke: "red", left: x1, top: y1 }));
}

memory = [["pointer", 0]];

var renderMemory = function () {
  canvas.dispose();
  for(var i = 0; i < 50; i ++) {
    drawCell(i, memory[i]);
  }

  for(var i = 0; i < 50; i ++) {
    postDrawCell(i, memory[i]);
  }
}

setInterval(function () {
  renderMemory();
  memory[0][1] = memory[0][1] + 1;
}, 100);




// var rect = new fabric.Rect({ width: 100, height: 50, fill: 'green' });
// rect.on('click', function() {
//   console.log('selected a rectangle');
// });

// var circle = new fabric.Circle({ radius: 75, fill: 'blue' });
// circle.on('click', function() {
//   console.log('selected a circle');
// });

// var text = new fabric.Text('hello world', {
//   fontSize: 30
// });

// var circle = new fabric.Circle({
//   radius: 100,
//   fill: '#eef',
//   scaleY: 0.5
// });

// var group = new fabric.Group([ text, circle ], {
//   left: 150,
//   top: 100,
//   angle: -10
// });


// // "add" rectangle onto canvas
// canvas.add(rect, circle, group);
})

