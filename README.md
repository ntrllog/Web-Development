# Web-Development

## CSS

### Display
- block: take up the whole width of screen
  - `<p>, <h1>, <div>, <ul>, <li>, <form>`
  - can change width and height
- inline: take up as much space as the content (display on same line)
  - `<span>, <img>, <a>`
  - cannot change width and height
- inline-block: display on same line and allow for resizing

### Position
- static: stick with default HTML flow
- relative: position element relative to how it would've been positioned if it was static
  - does not take element out of HTML flow
- absolute: position element relative to its parent
  - takes element out of HTML flow
- fixed: element stays when page is scrolled

### Centering Elements
- `text-align` does not work with elements that have a specified width
- `margin: 0 auto` or `margin: auto` centers elements with a specified width

### Font Size
- `%` and `em` are inherited (they stack on top of parent properties)
- `rem` (root em) ignores parent properties

### Stacking Order
- elements that come first in HTML document are closer to back
- children sit on top of parents
- `z-index` only works if elements are positioned (but not static)
