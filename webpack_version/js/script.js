import utils from './utils';
import Shape from './shape';
import { writeFile } from 'fs-web';

let _App = {

  seed: 243,
  init: function(){
    this.imgList = ["asd"];
    utils.initSeed(this.seed);
    console.log("inittttt");
    this.canvas = document.getElementById('c');
    this.imgObj = new Image();
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w/2;
    this.centerh = this.h/2;
    this.ctx = _App.canvas.getContext("2d");
    //
    this.ctx.beginPath();

    this.ctx.imageSmoothingEnabled = true;
    //
    //
    //
    this.ctx.fillStyle="rgb(100,150,0)";
    this.ctx.globalCompositeOperation = "soft-light";
    this.colorsArr =["rgba(10,10,0, 0.006)","rgba(0,111,0, 0.01z0)","rgba(9,123,0, 0.008)","rgba(0,11,111, 0.0059)"]
    // // // //
    // //style 1
    this.ctx.fillStyle="rgb(235,10,210)";
    this.ctx.globalCompositeOperation = "screen";
    this.colorsArr =["rgba(105,105,105, 0.006)","rgba(110,111,0, 0.01)","rgba(199,43,10, 0.008)","rgba(0,111,211, 0.0059)"]
    // // // // //
    // //style 2
    // this.ctx.fillStyle="rgb(255,222,110)";
    // this.ctx.globalCompositeOperation = "color-burn";
    // this.colorsArr =["rgba(105,0,105, 0.026)","rgba(255,151,0, 0.01)","rgba(199,43,10, 0.008)","rgba(50,111,211, 0.0059)"]
    // // // // //
    // this.ctx.fillStyle="rgb(220,155,110)";
    // this.ctx.globalCompositeOperation = "screen";
    // // console.log(utils.blendModeArr.length);
    // this.ctx.globalCompositeOperation = utils.blendModeArr[Math.round(Math.random()*utils.blendModeArr.length)];
    // this.colorsArr =["rgba(0,0,05, 0.926)","rgba(110,151,0, 0.01)","rgba(199,43,10, 0.008)","rgba(0,111,211, 0.0059)"]



    this.ctx.fillRect(0,0,this.w, this.h);

    // this.loadImg("src/img_src/-computer-equipment-325223.jpg");
    this.loadImg("src/img_src/ad-tablet-technology-touch.jpg");
    // this.loadImg("src/img_src/-pattern-technology-440313.jpg");
    // this.loadImg("src/img_src/-biking-bike-biking-71104.jpeg");
    // this.loadImg("src/img_src/artphone-wristwatch-325153.jpg");
    this.createShape();

    // this.drawShape();
  },
  createShape:function(){
    console.log("createShape");
    for (var j = 0; j < this.colorsArr.length; j++) {
      if(j==0){
        //this.ctx.arc(this.centerw, this.centerh, 555, 0, Math.PI * 2, true);
        //this.ctx.clip();

      }
      var nm = "n"+j;
      // console.log(nm);
      const nm = new Shape(_App, this.colorsArr[j]);
      // console.log(nm);
      for (var k = 0; k < 10; k++) {
        for (var i = 0; i < 7; i++) {
          nm.generateLayer(i);
        }
        for (var s in nm.shapes) {
            nm.drawShape(nm.shapes[s]);
            // utils.debug(nm.baseShape, nm.color, this.ctx);
        }
      }
    }
  },
/*  createImgList:function(_arr){
    //
    let dir = "src/img_src";
    console.log(fs);
    fs.writeFile('foo/some-file.txt', 'foo')
      .then(function(){
        return fs.readdir('foo');
      })
      .then(function(files){
        files // -> [ {some-file.txt} ]
    });
    console.log(_arr);
  },
*/
  loadImg:function(str){
    // console.log("loading it", this.imgObj);
    this.imgObj.onload = function(){
      console.log("imgloaded");
      _App.ctx.globalCompositeOperation = "hard-light";
      _App.ctx.drawImage(_App.imgObj, 0,0, _App.w, _App.h);
      //
    }
    _App.imgObj.src = str;

  }
}
_App.init();
