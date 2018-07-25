var _P = _P || {};
_P.w = 400;
_P.h = 300;
_P.fs = require('fs');
_P.Canvas = require('canvas');
_P.Image = _P.Canvas.Image;
_P.Shape = require('./ShapeMaker');
//
_P.canvas = new _P.Canvas(_P.w, _P.h);
_P.ctx = _P.canvas.getContext('2d');
_P.imgObj = new _P.Image();
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
	// path: "-businessman-person-140945.jpg",
	createImageList: function(){
    // console.log("createImageList....");
    _P.fs.readdir(_P.App.dir, function(err, items) {
      for (var i=0; i<items.length; i++) {
          // console.log(items[i]);
          _P.SrcImgMgr.imgList.push(items[i])
      }
			var json = JSON.stringify(_P.SrcImgMgr.imgList);
			console.log(json);
      console.log(_P.SrcImgMgr.imgList.length+" items counted");
      // console.log("....createImageList completed");
			_P.SrcImgMgr.path = _P.SrcImgMgr.imgList[613]
			var p = _P.SrcImgMgr.path;
			// _P.SrcImgMgr.loadNextImage(_P.App.dir+p);
    });
  },
	loadNextImage:function(url){
	    console.log("loadNextImage.....", url);
	    _P.imgObj.onload = function(){
	      // console.log("imgObjloaded", _P.imgObj.width);
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
			_P.ctx.fillStyle="rgb(22,222,0)";
			_P.ctx.fillRect(0,0,w, h);
			// _P.ctx.globalCompositeOperation = "hard-light";
			//draw loaded image onto canvas

			_P.ctx.drawImage(_P.imgObj, 0,0, _P.imgObj.width, _P.imgObj.height, 0,0,w,h);
			_P.ctx.fillStyle="rgba(211,50,22, 1)";
			// _P.ctx.globalCompositeOperation = "color-burn";
			// _P.CnvMgr.drawShape();
			var clrArr = ["rgba(250,50,0,0.13)","rgba(25,110,110,0.14623)","rgba(0,250,111,0.023)","rgba(125,110,10,0.01623)"]
				_P.shape.drawShape(clrArr[0]);
				_P.shape = {};
				_P.shape = new _P.Shape(_P);
				_P.shape.drawShape(clrArr[1]);
				_P.shape = {};
				_P.shape = new _P.Shape(_P);
				_P.shape.drawShape(clrArr[2]);


			_P.CnvMgr.writeOutput();
	},
	writeOutput:function(){
			_P.canvas.createPNGStream().pipe(_P.fs.createWriteStream('output/'+_P.SrcImgMgr.path));
	}
}
//
_P.App.init();
