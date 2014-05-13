Dot
===

It turns out that there's no easy way to alias Canvas primitives (something I would want to do for stylistic reasons) so I made a few simple ones of my own.

## Example

    dot.setCA(document.getElementById("myCanvas"))
      .setColor("#000")
      .line(0,0,100,100)
      .circle(50,50,50);

## Innards

### `dot.setCA(canvas);`

You must first initialize dot by passing it a canvas object for it to work on.

### `dot.setCX(context);`

This is handled internally. You don't actually need to touch this.

### `dot.setColor(hex);`

Input must be a hex string.

### `dot.getColor();`

Returns current color as a hex string.

### `dot.clear();`

Erases the canvas.

### `dot.dot(y, x);`

Sets the pixel at `(x, y)` to the stored color. The inputs are reversed because that's how screen coordinates are layed out.

### `dot.line(x1, y1, x2, y2);`

Draws a line from point 1 to point 2 using Bresenham's line algorithm.

### `dot.circle(x, y, r);`

Draws a circle centered at `(x, y)` with radius `r` using the midpoint circle algorithm.

### `dot.param(f, [start,] end, [step]);`

Draws the parametric function `f(t)` across the given interval. Output is expected to be an object: `{x: <x>, y: <y>}`.

### Mode "2"

All drawing functions come with a "2" variant ("line2", "circle2", etc.) which expects input as if the corners of the screen were (-1,1) (1,1) (1,-1) (-1,-1).
