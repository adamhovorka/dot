Dot ![v2.0.0](http://img.shields.io/badge/version-2.0.0-brightgreen.svg)
=============

So it turns out that there's no easy way to alias Canvas primitives (What? Maybe I like it!) so I made a few simple graphic primitives of my own. It's a lot more fun than you'd think.

## Example Code

    var d = new Dot("myCanvas")
      .setColor("#000")
      .line(0,0,100,100)
      .circle(50,50,50);

A more complete example can be seen in `demo.html`.

## Usage

An instance is created with `var d = new Dot();` which can be optionally passed the ID of a canvas. If an ID isn't passed on instantiation, a canvas object must later be passed into `d.setCA(canvas)`.

### Instance Methods

Most instance methods are chainable, the exceptions being `getColor` and `coords2`.

- Canvas selection: `d.setCA(canvas)`
- Color management: `d.setColor(hex)`, `d.getColor()`
- Size queries: `d.height()`, `d.width()`, `d.size()`
- Magnification: `d.setX(magnification level)`
- Coordinate conversion: `d.coords2(x, y)`
- Screen cleaning: `d.clear()`
- Points: `d.putPX(y, x)`, `d.dot(y, x)`
- Lines: `d.line(x0, y0, x1, y1)`
- Rectangles: `d.rect(x0, y0, x1, y1)`
- Filled rectangles: `d.rectf(x0, y0, x1, y1)`
- Circles: `d.circle(x, y, r)`
- Parametric equations: `d.param(f, [start,] end, [increment])`
- Interpolated parametric equations: `d.parl(f, [start,] end, [increment])`

The functions passed as parametric equations are given one argument `t` and are expected to pass back an object with an `x` and a `y` property.

All drawing methods also come with a "2" version (e.g. `line2`, `circle2`) which treates coordinates as if the corners of the screen were (1,1) and (-1,-1).

## Change Log

- 2.1.0: Added size query API
- 2.0.0: Major API refactoring
