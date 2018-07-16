var utils = require('./utils');
//static class variables (internal)
//global (to this module)
const maxPoints= 10000;


function createBaseShape(s) {
  console.log("createBaseShape");
  // console.log(this.shapes["shapeArr_0"]);
  for (var i = 0; i < 4; i++) {
    // if(this.totalPoints<this.maxPoints){
      s.subdivisions++;
      // console.log(i,subdivisions, s.shapes);
      s.shapes["shapeArr_"+s.subdivisions] = s.subDivide(s.shapes["shapeArr_"+i], i);
      // this.totalPoints+=shapes["shapeArr_"+this.subdivisions].length;
    // }else{
      // console.log(this.totalPoints,"hey we're jammed up w a ton of points so gonna chill rn");
    // }
  }
  s.baseShape = s.shapes["shapeArr_"+s.subdivisions].slice();
  s.shapes = {};
  s.subdivisions = 0;
}
// new
class Shape {
  constructor(app, color) {
    this.subdivisions = 0;
    this.totalPoints = 0;
    this.app = app;
    this.color = color;
    this.shapes = { shapeArr_0: [] };
    this.createStartingPoints();
    // createBaseShape(this);
  }
  createStartingPoints() {
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
  subDivide(arr) {
    // console.log("subdivide", arr);
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

  generateLayer(pos) {
    console.log("generateLayer");
    var tmparr = this.baseShape.slice();

    for (var i = 0; i < 3; i++) {
      tmparr = this.subDivide(tmparr);
    }

    this.shapes["shapeArr_"+pos]=tmparr.slice();
  }
  drawShape(_arr) {
    // _arr = this.shapes[0];
    return;
      this.app.ctx.fillStyle=this.color;
      // this.app.ctx.fillStyle="rgba(155,10,10,0.013324)";

      // this.app.ctx.fillStyle= "rgba(150,"+Math.round(Math.random()*255)+",255,0.025)";
      // console.log(_arr, "$$$$$$$$$$$$$$$$$$$$$$$$$");
      this.app.ctx.beginPath();
      this.app.ctx.moveTo(_arr[0].x, _arr[0].y);
      for (var i = 1; i < _arr.length; i++) {
        var itm = _arr[i];
        this.app.ctx.lineTo(itm.x, itm.y);
      }
      this.app.ctx.fill();
  }
  test(){
    console.log('testing from shape is a success!!!!');
  }

}

module.exports = Shape;
