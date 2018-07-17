var utils = require('./utils');

class Shape {
  constructor(app, color) {
    this.maxPoints= 10000;
    this.subdivisions = 0;
    this.totalPoints = 0;
    this.app = app;
    this.color = color;
    this.shapes = { shapeArr_0: [] };
    this.initStartingPoints();
    // this.createBaseShape();
  }

  initStartingPoints() {
    // console.log("initStartingPoints() called");
    let num_pts = 9;
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

  createBaseShape() {
    console.log("createBaseShape() called....");
    // console.log(this.shapes);
    for (var i = 0; i < 4; i++) {
        this.subdivisions++;
        this.shapes["shapeArr_"+this.subdivisions] = this.subDivide(this.shapes["shapeArr_"+i]);
    }

    this.baseShape = this.shapes["shapeArr_"+this.subdivisions].slice();
    // this.shapes = {};
    // this.subdivisions = 0;
    console.log("createBaseShape completed, baseShape has  ",this.baseShape.length, "  points now");
  }

  subDivide(arr) {
    // console.log("subdivide", arr.length);

    var tmparr=arr.slice();
    // console.log("start",tmparr.length);
    var newArr = [];
    for (var i = 0; i < tmparr.length; i++) {

      if(i==0){
        //*|* first one
        newArr.push(tmparr[i]);
      }else{
        //*|* main loop
        var newPt = utils.createNewPoint(tmparr[i], tmparr[i-1]);
        // console.log(newPt,"<<<<<");
        //push new point, then push older existing point
        newArr.push(newPt);
        newArr.push(arr[i]);
      }
      // console.log("end",newArr.length);
    }
    //*|* last one! Wrap back to connect to the first point at the end of the loop
    var newPt = utils.createNewPoint(arr[arr.length-1], arr[0], 1);
    newArr.push(newPt);
    // console.log(newArr.length);
    return newArr;
  }
/*
  generateLayer(pos) {
    console.log("generateLayer");
    var tmparr = this.baseShape.slice();

    for (var i = 0; i < 3; i++) {
      tmparr = this.subDivide(tmparr);
    }

    this.shapes["shapeArr_"+pos]=tmparr.slice();
  }*/
  drawShape(_arr) {
    // _arr = this.shapes[0];
      this.app.ctx.fillStyle=this.color;
      this.app.ctx.beginPath();
      this.app.ctx.moveTo(_arr[0].x, _arr[0].y);
      for (var i = 1; i < _arr.length; i++) {
        var itm = _arr[i];
        this.app.ctx.lineTo(itm.x, itm.y);
      }
      this.app.ctx.fill();
  }
  drawShapeTest(){
    console.log("drawShapeTest called");
    // console.log(this.shapes);
    var shapeData={};
    this.createBaseShape();
    // console.log(this.shapes);
    var arr = this.baseShape;
    //arr = this.subDivide(arr);
    this.app.ctx.beginPath();
    // console.log(this.shapes);
    // var obj = this.shapes;
    // Object.keys(obj).forEach(function(key){
    //   console.log(key, obj[key]);
    // })
    // return;
		for (var p in this.shapes) {
      if (this.shapes.hasOwnProperty(p)) {
        var curArr = this.shapes[p];
        this.app.ctx.fillStyle="rgba("+Math.round(Math.random()*200)+","+Math.round(Math.random()*200)+",200,0.08)";

        //console.log(this.shapes[p].length);
        for (var i = 0; i < curArr.length; i++) {
          var itm = {x:curArr[i].x, y:curArr[i].y};
          this.app.ctx.lineTo(itm.x, itm.y);
        }
        this.app.ctx.fill();
      }
    }




  }
  test(){
    console.log('testing from shape is a success!!!!');
  }

}

module.exports = Shape;
