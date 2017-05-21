/**/
function docLoaded(fn) {
    if (document.readyState !== 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}


/**/
function AnimationObj(imURI) {
    this.imURI;
    this.img = [];
    this.scaleImg;
    this.imInd = -1;
    this.xOff = 0.0;
    this.canvasWidth = 500;
    this.eventHolder = new Image();
    this.proportion;
    
    if(!Array.isArray(imURI)) {
        this.imURI[0] = imURI;
    } else {
        this.imURI = imURI;
    }
    
    
    this.loadImage = function() {
        var imgLoaded = 0;
        for(var i=0; i<this.imURI.length; i++) {
            this.img[i] = new Image();
            this.img[i].src = this.imURI[i];
            
            this.img[0].crossOrigin="anonymous";
            
            var that = this;
            this.img[i].addEventListener('load', function() {
                imgLoaded++;
                if(imgLoaded == that.imURI.length) {
                    
                    var prop = that.img[0].width/that.img[0].height;
                    if(prop > 3740/1600)
                        prop = prop/2;
                    that.proportion = prop;
                    
                    var event = new CustomEvent('imgLoad');
                    that.eventHolder.dispatchEvent(event);
                }
            });
        }
    }
    
    this.getImage = function(ind) {
        if(typeof ind == 'undefined') {
            this.imInd = (this.imInd+1)%this.img.length;
        } else {
            this.imInd = ind;
        }
        if(this.scaleImg) {
            return this.scaleImg[this.imInd];
        } else {
            return this.img[this.imInd];
        }
    }
    
    this.xSize = function() {
        if(this.scaleImg) {
            return this.scaleImg[0].width;
        } else {
            return this.img[0].width;
        }
    }
    
    this.ySize = function() {
        if(this.scaleImg) {
            return this.scaleImg[0].height;
        } else {
            return this.img[0].height;
        }
    }
    
    this.xOffset = function(steps) {
        if(steps && steps !== 0) {
            var len = 1/steps;
            this.xOff = (this.xOff-len)%0.5;
            if(steps > 0) {
                return Math.floor(this.xOff*this.xSize());
            } else {
                return Math.floor((this.xOff-0.5)*this.xSize());
            }
        }
        return Math.floor(this.xOff*this.xSize());
    }
    
    this.resizeImage = function(h, w) {
        this.canvasWidth = w;
        
        var that = this;
        var screenH = window.screen.height;
        
        if(!this.scaleImg) {
            this.scaleImg = [];
        }
        var srcImg = this.img;
        var targImg = this.scaleImg;
        
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var scale = h / srcImg[0].height;
        canvas.height = h;
        canvas.width = Math.floor(srcImg[0].width * scale);
        
        var imgLoaded = 0;
        for(var i=0; i<srcImg.length; i++) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(srcImg[i], 0, 0, canvas.width, canvas.height);
            targImg[i] = convertCanvasToImage(canvas);
            targImg[i].addEventListener('load', function() {
                imgLoaded++;
                if(imgLoaded == srcImg.length) {
                    var event = new CustomEvent("resizeLoad");
                    that.eventHolder.dispatchEvent(event);
                }
            });
        }
    }
}


/*
Converts canvas to an image. https://davidwalsh.name/convert-canvas-image
*/
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}


/**/
function resizeAnimation(anim) {
    if(document.fullscreenElement) {
        var h = window.screen.height;
        var w = Math.min(window.screen.width, Math.floor(h*anim[0].proportion));
    } else {
        var h = window.innerHeight;
        var w = Math.min(window.innerWidth, Math.floor(h*anim[0].proportion));
    }
    var imgLoaded = 0;
    for(var i=0; i<anim.length; i++) {
        anim[i].resizeImage(h, w);
        anim[i].eventHolder.addEventListener('resizeLoad', function() {
            imgLoaded++;
            if(imgLoaded == anim.length) {
                var event = new CustomEvent('animResized');
                anim[0].eventHolder.dispatchEvent(event);
            }
        });
    }
}


/**/
function initAnimation() {
    var imSrc = [["home_animation/wide-cloudreel1.png"],
                 ["home_animation/wide-cloudreel2.png"],
                 ["home_animation/wide-mountain.png"],
                 ["home_animation/wide-hillreel.png"],
                 ["home_animation/wide-meadowreel.png"],
                 ["home_animation/wide-train1.png",
                  "home_animation/wide-train2.png"],
                 ["home_animation/piston1.png",
                  "home_animation/piston2.png",
                  "home_animation/piston3.png",
                  "home_animation/piston4.png",
                  "home_animation/piston5.png",
                  "home_animation/piston6.png",
                  "home_animation/piston7.png",
                  "home_animation/piston8.png"],
                 ["home_animation/wide-railreel.png"]];
    
    var anim = [];
    var animLoaded = 0;
    for(var i=0; i<imSrc.length; i++) {
        anim[i] = new AnimationObj(imSrc[i]);
        anim[i].loadImage();
        anim[i].eventHolder.addEventListener('imgLoad', function() {
            animLoaded++;
            if(animLoaded == imSrc.length) {
                /**/
                var resizeTimeout; //https://developer.mozilla.org/en-US/docs/Web/Events/resize
                window.addEventListener('resize', function() {
                    if(!resizeTimeout) {
                        resizeTimeout = setTimeout(function() {
                            resizeTimeout = null;
                            resizeEventFn(anim);
                        }, 500);
                    }
                });
                //*/
                resizeEventFn(anim);
            }
        });
    }
}


/**/
function resizeEventFn(anim) {
    resizeAnimation(anim);
    anim[0].eventHolder.addEventListener('animResized', function() {
        drawAnimation(anim);
    });
}


/**/
function drawAnimation(anim) {
    var canvas = document.getElementById('animationReel');
    var ctx = canvas.getContext('2d');
    
    canvas.height = anim[0].ySize();
    canvas.width = anim[0].canvasWidth;
    
    var steps = [-3000, -2500, 0, 1600, 1000, 0, 0 ,600];
    anim[2].xOff = 5*(canvas.width-anim[2].xSize())/(7*anim[2].xSize());
    anim[5].xOff = 0.5*(canvas.width-anim[5].xSize())/anim[5].xSize();
    anim[6].xOff = anim[5].xOff;
    /**
    var moveTrain = 0;
    document.getElementById('').addEventListener('click', function() {
        moveTrain = 0.001;
    });
    //*/
    
    var drawInterval = setInterval(function() {
        /**
        if(moveTrain > 0) {
            anim[5].xOff += moveTrain;
            anim[6].xOff = anim[5].xOff;
            moveTrain *= 1.01;
            for(var itm in steps) {
                itm *= 1.1;
            }
            if(anim[5].xOffset() > canvas.width) {
                var event = new Event(''); //CustomEvent?
                document.dispatchEvent(event);
                clearInterval(drawInterval);
            }       
        }
        //*/
        for(var i=0; i<anim.length; i++) {
            ctx.drawImage(anim[i].getImage(), anim[i].xOffset(steps[i]), 0);
        }
    }, 20);
}