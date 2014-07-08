$(function() {
  var canvas = new fabric.Canvas('c');

  canvas.selection = false;

  var allObjects = [];
  var lines = []

  window.rerender = function() {
    for (var i = lines.length - 1; i >= 0; i--) {
      canvas.remove(lines[i])
    };
    for (var i = allObjects.length - 1; i >= 0; i--) {
      allObjects[i].drawLines();
    };
  }

  canvas.on('object:modified', function(e) {
    var owner = e.target.owner;

    owner.setX(e.target.left);
    owner.setY(e.target.top);
    // e.target.lockMovementX = true;
    // e.target.lockMovementY = true;
    // e.target.set('fill', 'black');
    rerender();
  });

  window.canvas = canvas
  var WIDTH = 500;
  var HEIGHT = 500;

  var TEXT_SIZE = 20;

  window.OSObject = function() {};

  OSObject.prototype.coords = function () {
    return [this.x, this.y];
  }

  OSObject.prototype.add = function() {
    allObjects.push(this);
    this.draw();
  }

  OSObject.prototype.setX = function(x) {
    this.x = x;
  };

  OSObject.prototype.setY = function(y) {
    this.y = y;
  };

  OSObject.prototype.drawLines = function () {};

  window.OSNumber = function(value) {
    this.value = value;
    this.x = 20;
    this.y = 20;
  }
  OSNumber.prototype = new OSObject();

  OSNumber.prototype.toString = function () {
    return this.value + "";
  }

  OSNumber.prototype.draw = function() {
    canvas.add(new fabric.Text('' + this.value, {left: this.x, top: this.y,
        // originX: 'center',
        // originY: 'center',
        owner: this,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        hasControls: false,
        hasBorders: false,
        // color: 'green'
      }))
  };

  window.OSArray = function(values) {
    this.values = values;
    this.setX(20);
    this.setY(20);
  }

  OSArray.prototype = new OSObject()

  OSArray.prototype.toString = function() {
    if (this.values.length != 0) {
      return '[' + new Array(this.values.length).join("?,")+"?]";
    }
    else {
      return "[]";
    }
  };

  OSArray.prototype.draw = function () {
    this.drawLines();

    var text = new fabric.Text(
              this.toString(),
              { fontFamily: 'monospace',
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true,
                hasBorders: false,
                owner: this,
                hasControls: false,
                hasBorders: false,
                top: this.y - OSArray.yOffset,
                left: this.x - OSArray.xOffset,
                // fill: 'green'
              });

    canvas.add(text);
  };

  OSArray.prototype.setX = function(x) {
    this.x = x - OSArray.xOffset;
  };

  OSArray.prototype.setY = function(y) {
    this.y = y - OSArray.yOffset;
  };

  OSArray.xOffset = -10;
  OSArray.yOffset = -20;
  OSArray.xElementOffset = 35;
  OSArray.yElementOffset = 30;
  OSArray.xElementSize = 48;

  OSArray.prototype.drawLines = function() {
    for (var i = this.values.length - 1; i >= 0; i--) {
      drawArrow(this.x + OSArray.xOffset + OSArray.xElementOffset + i*OSArray.xElementSize,
                       this.y + OSArray.yOffset + OSArray.yElementOffset,
                       this.values[i].x, this.values[i].y)
    };
  };

  var drawAFuckingLine = function(x1, y1, x2, y2) {
    var line = new fabric.Line([x1,y1,x2,y2], { stroke: "red",
              originX: 'center',
              originY: 'center',
              fill: 'red',
              stroke: 'red',
              strokeWidth: 5,
              selectable: false })
    lines.push(line);
    canvas.add(line);
    canvas.sendToBack(line);
  }

  var drawArrow = function(x1, y1, x2, y2) {
    drawAFuckingLine(x1, y1, x2, y2);
    var vector = [x2 - x1, y2 - y1];

    var rotatedVector1 = [ vector[0] - vector[1], vector[0] + vector[1] ];
    var lengthOfVector = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]) / 10;
    var scaledVector1 = _.map(rotatedVector1, function(x) { return x/lengthOfVector; })
    drawAFuckingLine(x2,y2, x2 -scaledVector1[0], y2 - scaledVector1[1])


    var rotatedVector1 = [ - vector[0] - vector[1], - vector[0] + vector[1] ];
    var lengthOfVector = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]) / 10;
    var scaledVector1 = _.map(rotatedVector1, function(x) { return x/lengthOfVector; })
    drawAFuckingLine(x2,y2, x2 + scaledVector1[0], y2 - scaledVector1[1])
  }



});

