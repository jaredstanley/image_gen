var _P = _P || {};

_P.fs = require('fs');
_P.Request = require('pixl-request');
_P.Canvas = require('canvas');
_P.canvas = new _P.Canvas(256, 256);
_P.ctx = _P.canvas.getContext('2d');
_P.Image = _P.Canvas.Image;
_P.img = new _P.Image();
_P.Jimp = require('jimp');

//
_P.App = {
    //
		dir: "src/img_src/",
    init: function() {
      // this.main_canvas = _P.canvas;
    	// this.canvasHeight = _P.wh;
    	// this.canvasWidth = _P.wh;
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
			_P.SrcImgMgr.loadNextImage(_P.App.dir+_P.SrcImgMgr.imgList[496]);

    });
  },
	loadNextImage:function(url){
		_P.Jimp.read(url).then(function (image) {
    	image.greyscale().getBuffer(image.getMIME(), onBuffer);
		}).catch(function (err) {
    	console.error(err);
		})

		function onBuffer (err, buffer) {
	    if (err) throw err;
    	console.log(buffer);
		}
		// _P.Jimp.read(p, function (err, jimg) {
		//     if (err) throw err;
		// 		_P.img.src = jimg;
		// 		_P.ctx.drawImage(_P.img, 0,0);
		//     // _P.SrcImgMgr.processImage(jimg);
		//
		// });
	},
	processImage:function(jimg){
		//console.log(data);
		var img = new _P.Image();
		img.src = jimg;
		_P.ctx.drawImage(img, 0,0);
		console.log("got the image");
		// jimg.resize(256, 256)            // resize
		// 		 .quality(60)                 // set JPEG quality
		// 		 .greyscale()
		// _P.CnvMgr.consumeImage(jimg);
		// // _P.SrcImgMgr.saveImage(jimg);

	},
	saveImage(jimg){
		//
		jimg.write("output/lena-small-bw.jpg"); // save
	}
};
_P.CnvMgr = {
	consumeImage:function(jimg){
		console.log("consumeImage() called...", jimg);

		// _P.loadImage(jimg, function(err, img){
		// 	"load image complete";
		// 	ctx.drawImage(img, 0,0);
		// })
		/*jimg.getBase64( jimg.getMIME(), onBase64);
		function onBase64(err, b64){
			if(err) throw err;
			console.log(b64);
		}*/
		// canvas.createPNGStream().pipe(_P.fs.createWriteStream('output/image-url.png'));
	}
}
//
_P.App.init();
