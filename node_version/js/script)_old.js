var path = require('path');
var fs = require('fs');
var Request = require('pixl-request');
var Canvas = require('canvas');
var Image = Canvas.Image;

var url = "http://placehold.it/256x256/0000ff/ffffff&text=node-canvas";
// var folder = "src/img_src/";
// var file = "-businessman-person-140945.jpg";
// var url = folder+file;
var request = new Request();
console.log(path.join(__dirname, '..', url));
request.get( url, function(err, resp, data) {
	if (err) throw err;

	var img = new Image();
	img.src = data;

	var canvas = new Canvas(256, 256);
	var ctx = canvas.getContext('2d');

	ctx.drawImage(img, 0, 0, 256, 256);
	canvas.createPNGStream().pipe(fs.createWriteStream('image-url.png'));
});
