var _P = _P || {};
_P.w = 400;
_P.h = 300;
_P.fs = require('fs');
_P.Request = require('pixl-request');
_P.Canvas = require('canvas');
_P.canvas = new _P.Canvas(_P.w, _P.h);
_P.ctx = _P.canvas.getContext('2d');
_P.Image = _P.Canvas.Image;
_P.imgObj = new _P.Image();
_P.Shape = require('./shape');
_P.shape = new _P.Shape(_P);

//
_P.App = {
    //
		dir: "src/img_src/",
    init: function() {
      _P.SrcImgMgr.createImageList();
    },
};
_P.SrcImgMgr = {
	imgList:[],
	// path: "-enter-key-notebook-50710.jpeg",
	path: "-businessman-person-140945.jpg",
	createImageList: function(){
    console.log("createImageList....");
    _P.fs.readdir(_P.App.dir, function(err, items) {
      for (var i=0; i<items.length; i++) {
          // console.log(i);
          _P.SrcImgMgr.imgList.push(items[i])
      }
      console.log(_P.SrcImgMgr.imgList.length+" items counted");
      console.log("....createImageList completed");
			_P.SrcImgMgr.path = _P.SrcImgMgr.imgList[612]
			_P.SrcImgMgr.loadNextImage(_P.App.dir+_P.SrcImgMgr.path);

    });
  },
	loadNextImage:function(url){
	    console.log("loadNextImage.....", url);
	    _P.imgObj.onload = function(){
	      console.log("imgObjloaded", _P.imgObj.width);
	      // _App.ctx.globalCompositeOperation = "hard-light";
	      // _App.ctx.drawImage(_App.imgObjObj, 0,0, _App.w, _App.h);
	      //
			_P.CnvMgr.consumeImage();
	    }
	    _P.imgObj.src = url;

	}
};
_P.CnvMgr = {
	consumeImage:function(){
		console.log("consumeImage() called...");
		_P.canvas.width = _P.imgObj.width;
		_P.canvas.height = _P.imgObj.height;
		var w = _P.canvas.width;
		var h = _P.canvas.height;
			//
			_P.ctx.fillStyle="rgb(0,0,222)";
			_P.ctx.fillRect(0,0,w, h);
			_P.ctx.globalCompositeOperation = "hard-light";
			_P.ctx.drawImage(_P.imgObj, 0,0, _P.imgObj.width, _P.imgObj.height, 0,0,w,h);
			_P.ctx.fillStyle="rgb(211,50,22)";
			_P.ctx.globalCompositeOperation = "screen";
			_P.CnvMgr.drawShape();
			// _P.shape.drawShape();
			_P.CnvMgr.writeOutput();
	},
	writeOutput:function(){
			_P.canvas.createPNGStream().pipe(_P.fs.createWriteStream('output/'+_P.SrcImgMgr.path));
	},
	drawShape:function(){
		_P.ctx.beginPath();
		for (var i = 1; i < 30; i++) {
			var itm = {x:Math.random()*_P.w,y:Math.random()*_P.h};
			_P.ctx.lineTo(itm.x, itm.y);
		}
		_P.ctx.fill();
	}
}
//
_P.App.init();
