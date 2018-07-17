var utils = require('./utils');

class ShapeMaker {
  constructor(app) {
    this.maxPoints= 10000;
    this.subdivisions = 0;
    this.totalPoints = 0;
    this.app = app;
    this.shapes = { shapeArr_0: [] };


  }
  generateStartingPoints() {
    let num_pts = 7;
    let ang = 0;
    let rad = this.app.w*0.5;
    let step = (2*Math.PI)/num_pts;
    for (var i = 0; i < num_pts; i++) {
      var _x = this.app.w/2+Math.cos(ang)*rad*utils.getRandom();
      var _y = this.app.h/2+Math.sin(ang)*rad;
      ang+=step;
      this.shapes.shapeArr_0.push({x:_x, y:_y});
    }
  }

  generateBaseShape() {
    for (var i = 0; i < 7; i++) {
        this.subdivisions++;
        this.shapes["shapeArr_"+this.subdivisions] = this.subDivide(this.shapes["shapeArr_"+i]);
    }

    this.baseShape = this.shapes["shapeArr_"+this.subdivisions].slice();
    this.shapes={};
  }

  subDivide(arr) {

    var tmparr=arr.slice();
    var newArr = [];
    for (var i = 0; i < tmparr.length; i++) {

      if(i==0){
        //*|* first one
        newArr.push(tmparr[i]);
      }else{
        //*|* main loop
        var newPt = utils.createNewPoint(tmparr[i], tmparr[i-1]);
        //push new point, then push older existing point
        newArr.push(newPt);
        newArr.push(arr[i]);
      }

    }
    //*|* last one! Wrap back to connect to the first point at the end of the loop
    var newPt = utils.createNewPoint(arr[arr.length-1], arr[0], 1);
    newArr.push(newPt);
    return newArr;
  }

  drawShape(color){
    this.generateStartingPoints();
    this.generateBaseShape();
    this.generateLayers(12, 3);
    this.app.ctx.globalCompositeOperation = "overlay";
    var shapeData={};
    var arr = this.baseShape;
    this.app.ctx.fillStyle=color;
    this.app.ctx.beginPath();
    for (var p in this.shapes) {
      if (this.shapes.hasOwnProperty(p)) {
        var curArr = this.shapes[p];
        for (var i = 0; i < curArr.length; i++) {
          var itm = {x:curArr[i].x, y:curArr[i].y};
          this.app.ctx.lineTo(itm.x, itm.y);
        }
        this.app.ctx.fill();
      }
    }

  }
  generateLayers(count, detail) {
    console.log("generateLayers");
    var startArr = this.baseShape;
    for (var i = 0; i < count; i++) {
      var tmparr = this.baseShape.slice();
      //create new layer
      for (var j = 0; j < detail; j++) {
        tmparr = this.subDivide(tmparr);
      }
      this.shapes["shapeArr_"+i]=tmparr.slice();
    }
    // console.log(this.shapes);
  }



}

module.exports = ShapeMaker;
