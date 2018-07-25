import utils from './utils';
import Shape from './shape';
import imgList from './myjsonfile';
import { writeFile } from 'fs-web';

let _App = {

  seed: 243,
  init: function(){
    // console.log("inittttt");

    var b = document.getElementById('btn').onclick=function(){
      _App.init();
    };
    // console.log(this);
    this.createNewCanvas();
    this.imgList = [""];
    utils.initSeed(this.seed);

    this.imgObj = new Image();
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w/2;
    this.centerh = this.h/2;
    //
    this.ctx.beginPath();

    this.ctx.imageSmoothingEnabled = true;
    //
    //
    //
    this.ctx.fillStyle="rgb(100,150,0)";
    this.ctx.globalCompositeOperation = document.getElementById("blendmode").value;
  //  console.log("blend mode is >> ",document.getElementById("blendmode").value);
    // this.ctx.globalCompositeOperation = "soft-light";
    this.colors =[
      ["rgba(10,10,0, 0.006)","rgba(0,111,0, 0.01z0)","rgba(9,123,0, 0.008)","rgba(0,11,111, 0.059)"],
      ["rgba(0,80,0, 0.26)","rgba(251,10,0, 0.01)","rgba(199,43,10, 0.008)","rgba(50,111,211, 0.00159)"],
      ["rgba(154,180,220, 0.26)","rgba(251,10,0, 0.01)","rgba(199,43,10, 0.008)","rgba(50,111,211, 0.0259)"],
      ["rgba(24,40,120, 0.26)","rgba(251,210,10, 0.01)","rgba(99,3,10, 0.008)","rgba(50,111,211, 0.0059)"],
      ["rgba(214,80,220, 0.126)","rgba(251,110,80, 0.031)","rgba(229,143,210, 0.018)","rgba(150,11,111, 0.0059)"],
      ["rgba(154,180,30, 0.026)","rgba(51,10,220, 0.021)","rgba(219,103,110, 0.048)","rgba(50,111,211, 0.0059)"],
      ["rgba(254,220,10, 0.216)","rgba(25,110,230, 0.041)","rgba(199,43,10, 0.08)","rgba(0,11,11, 0.0359)"],
      ["rgba(254,80,0, 0.086)","rgba(151,210,120, 0.021)","rgba(199,43,10, 0.008)","rgba(250,11,211, 0.0059)"]
  ];
  this.blendModeArr = ["lighter", "multiply", "screen", "overlay", "color-dodge", "color-burn", "hard-light", "soft-light"];

    //bg color
    this.ctx.fillStyle="rgb(155,182,250)";
    // // // console.log(utils.blendModeArr.length);
    // this.ctx.globalCompositeOperation = this.blendModeArr[Math.floor(Math.random()*this.blendModeArr.length)];
    this.ctx.globalCompositeOperation = document.getElementById("blendmode").value;
    this.colorsArr = this.colors[Math.floor(Math.random()*this.colors.length)];
    // console.log(this.ctx.colorsArr);


    this.ctx.fillRect(0,0,this.w, this.h);
    var rt = "src/img_src/";
    // this.loadImg("src/img_src/-computer-equipment-325223.jpg");
    var imgtotal = imgList.items.length;
    var itm = Math.round(Math.random()*imgtotal);
    var path = rt+imgList.items[itm];
    //console.log(imgList.items[itm]);
    if (_App.imgObj.complete) {
      this.createShape();
    } else {
      _App.imgObj.addEventListener('load', loaded)
      _App.imgObj.addEventListener('error', function() {
          alert('error')
      })
    }
    //
    this.loadImg(path);
    this.addSolid();

    // this.drawShape();
  },
  createNewCanvas:function(){
    var c = document.createElement('canvas');
    var nm = String(Math.random());
    c.setAttribute("id", nm);
    var obj = document.getElementById("dimension").value;
    obj = eval("("+obj+")");
    c.setAttribute("width", obj.w);
    c.setAttribute("height", obj.h);
    // document.body.appendChild(c);
    document.getElementById("gallery").prepend(c);
    _App.canvas = document.getElementById(nm);
    _App.ctx = _App.canvas.getContext("2d");
    console.log(_App.canvas.width);
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

  loadImg:function(str){
    // console.log("loading it", this.imgObj);
    _App.imgObj.onload = function(){
      console.log("imgloaded");
      _App.ctx.globalCompositeOperation = _App.blendModeArr[Math.floor(Math.random()*3)];
     _App.ctx.drawImage(_App.imgObj, 0,0, _App.w, _App.h);
      //
      // console.log(_App.w);
    }
    _App.imgObj.src = str;

  },

  addSolid:function(){
    //solid color overlay
    // _App.ctx.globalCompositeOperation = "darken";
    _App.ctx.globalCompositeOperation = document.getElementById("blendmode").value;
    var clr = document.getElementById("coloroverlay").value;

    // _App.ctx.fillStyle="rgba(254,80,0,0.93)"
    _App.ctx.fillStyle=clr;
    // console.log(clr, _App.ctx.fillStyle, "<<<<");
    // _App.ctx.fillStyle="rgba(0,0,0,0.3)"
    _App.ctx.fillRect(0,0,_App.w, _App.h);
  }
}
_App.init();
