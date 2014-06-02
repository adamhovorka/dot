/*
**  dot.js
**  A pixel-perfect canvas primitives library
**
**  'Cause I can
**
**  Copyleft 2014 Adam Hovorka
**  All rights reversed.
*/

dot = (function() {
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  return {
    setCA: function(ca) {
      this._ca = ca;
      this.setCX(ca.getContext("2d"));
      return this;
    },

    setCX: function(cx) {
      this._cx = cx;
      this._pixel = cx.createImageData(1,1);
      return this;
    },

    // Expects hex, FYI.
    setColor: function(k) {
      c = hexToRgb(k);
      this._pixel.data[0] = c.r;
      this._pixel.data[1] = c.g;
      this._pixel.data[2] = c.b;
      this._pixel.data[3] = 255;
      return this;
    },

    getColor: function() {
      var c = this._pixel.data;
      return rgbToHex(c[0], c[1], c[2]);
    },

    clear: function() {
      this._cx.clearRect(0, 0, this._ca.width, this._ca.height);
      return this;
    },

    coords2: function(x, y) {
      var w = this._ca.width/2;
      var h = this._ca.height/2;
      return {x:(x*w)+w,y:(-y*h)+h};
    },

    // X and Y are reversed on this one 'cause screen coordinates.
    dot: function(y, x) {
      this._cx.putImageData(this._pixel, x, y);
      return this;
    },

    dot2: function(x, y) {
      var c = this.coords2(x, y);
      this.dot(c.y, c.x);
      return this;
    },

    line: function(x0, y0, x1, y1){
      x0 = Math.round(x0);
      y0 = Math.round(y0);
      x1 = Math.round(x1);
      y1 = Math.round(y1);

      var dx = Math.abs(x1-x0);
      var dy = Math.abs(y1-y0);
      var sx = (x0 < x1) ? 1 : -1;
      var sy = (y0 < y1) ? 1 : -1;
      var err = dx-dy;

      while(true){
        this.dot(y0,x0);
        if ((x0==x1) && (y0==y1)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
      }
      return this;
    },

    line2: function(x0, y0, x1, y1) {
      var a = this.coords2(x0, y0);
      var b = this.coords2(x1, y1);
      this.line(a.x, a.y, b.x, b.y);
      return this;
    },

    circle: function(xc, yc, r) {
      var x = 0; 
      var y = r; 
      var p = 3 - 2 * r;
      if (!r) return;     
      while (y >= x) {
        this.dot(yc-y, xc-x);
        this.dot(yc-x, xc-y);
        this.dot(yc-x, xc+y);
        this.dot(yc-y, xc+x);
        this.dot(yc+y, xc-x);
        this.dot(yc+x, xc-y);
        this.dot(yc+x, xc+y);
        this.dot(yc+y, xc+x);
        if (p < 0) { p += 4*x++ + 6;
        } else { p += 4*(x++ - y--) + 10; }
      } 
      return this;
    },

    circle2: function(x, y, r) {
      var a = this.coords2(x, y);
      var b = this.coords2(r-1,0);
      this.circle(a.x, a.y, b.x);
      return this;
    },

    param: function(f, a, b, c) {
      var start = (b==undefined)?0:a;
      var end   = (b==undefined)?a:b;
      var step  = (c==undefined)?1:c;
      for (var i=start;i<=end;i+=step) {
        var p = f(i);
        this.dot(p.y, p.x);
      } return this;
    },

    param2: function(f, a, b, c) {
      var start = (b==undefined)?0:a;
      var end   = (b==undefined)?a:b;
      var step  = (c==undefined)?1:c;
      for (var i=start;i<=end;i+=step) {
        var p = f(i);
        var q = this.coords2(p.x, p.y);
        console.log(q.y, q.x);
        this.dot(q.y, q.x);
      } return this;
    },

    parl: function(f, a, b, c) {
      var start = (b==undefined)?0:a;
      var end   = (b==undefined)?a:b;
      var step  = (c==undefined)?1:c;
      var prev  = f(start);
      for (var i=start+step;i<=end;i+=step) {
        var p = f(i);
        this.line(prev.x,prev.y,p.x,p.y);
        prev.x=p.x; prev.y=p.y;
      } return this;
    },

    parl2: function(f, a, b, c) {
      var start = (b==undefined)?0:a;
      var end   = (b==undefined)?a:b;
      var step  = (c==undefined)?1:c;
      var qrd   = f(start)
      var prev  = this.coords2(qrd.x,qrd.y);
      for (var i=start+step;i<=end;i+=step) {
        var p = f(i);
        var q = this.coords2(p.x, p.y);
        this.line(prev.x,prev.y,q.x,q.y);
        prev.x=q.x; prev.y=q.y;
      } return this;
    },
  };
})();
