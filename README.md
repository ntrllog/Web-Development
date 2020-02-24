# Web-Development

## HTML

### Forms

```
<form action="/" method="post">
  <input type="text" name="num1" placeholder="First Number">
  <input type="text" name="num2" placeholder="Second Number">
  <button type="submit" name="submit">Calculate</button>
</form>
```

- `method="post"` sends the form data (makes a POST request) to the location specified at `action="/"`

## CSS

### Display
- **block**: take up the whole width of screen
  - `<p>, <h1>, <div>, <ul>, <li>, <form>`
  - can change width and height
- **inline**: take up as much space as the content (display on same line)
  - `<span>, <img>, <a>`
  - cannot change width and height
- **inline-block**: display on same line and allow for resizing

### Position
- **static**: stick with default HTML flow
- **relative**: position element relative to how it would've been positioned if it was static
  - does not take element out of HTML flow
- **absolute**: position element relative to its parent
  - takes element out of HTML flow
- **fixed**: element stays when page is scrolled

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

## JavaScript DOM Manipulation

### Selecting HTML Elements
- `document.querySelector('selector');`  
- `document.querySelectorAll('selector');`

### Changing Text
- `document.querySelector('selector').innerHTML = 'text';`
  - can put HTML tags, e.g., `document.querySelector('selector').innerHTML = '<em>text</em>';`
- `document.querySelector('selector').textContent = 'text';`

### Changing Attributes
- `document.querySelector('selector').attributes;` (returns all the attributes)
- `document.querySelector('selector').getAttribute('attribute');`
- `document.querySelector('selector').setAttribute('attribute', 'changeTo');`

### Adding/Removing Classes
- `document.querySelector('selector').classList.add('class');`
- `document.querySelector('selector').classList.remove('class');`

### Event Listeners
- `document.querySelector('selector').addEventListener('eventType', function);`

To add event listeners to multiple items, use a for loop:

```
let buttonList = document.querySelectorAll('selector');
for (let i = 0; i < buttonList.length; i++) {  
  buttonList[i].addEventListener('eventType', function);
}
```

### Perform Action After Specified Time
- `setTimeout(function, milliseconds);`

## jQuery

### Selecting HTML Elements
- `$('selector');`
  - selects *all* elements

### Changing Text
- `$('selector').html('text');`
  - can put HTML tags, e.g., `$('selector').html = '<em>text</em>';`
- `$('selector').text('text');`

### Changing Attributes
- `$('selector').attr('attribute');`
- `$('selector').attr('attribute', 'changeTo');`

### Adding/Removing Classes
- `$('selector').hasClass('class');`
- `$('selector').addClass('class');`
- `$('selector').removeClass('class');`

### Event Listeners
- `$('selector').on('eventType', function);`
- `$('selector').click(function);`
- `$('selector').keydown(function);`

To add event listener to whole document (usually for keypresses):

```
$(document).keydown(function(event) {
// use event.key to get key that was pressed
});
```

### Adding/Removing HTML Elements
- `$('selector').before(<></>);`
  - adds element before opening tag of `'selector'`
- `$('selector').after(<></>);`
  - adds element after opening tag of `'selector'`
- `$('selector').prepend(<></>);`
  - adds element right after opening tag of `'selector'`
- `$('selector').append(<></>);`
  - adds element right before closing tag of `'selector'`
- `$('selector').remove();`

### Animations
- `$('selector').animate({opacity: 0.5});`
- `$('selector').animate({margin: "20%"});`
  - only works with properties that take numeric values

## Node/Express

### Creating Server

```
const app = express();

app.get('/', function(req, res) {
  res.send('Hello');
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
```

`app.listen()`
- listens on a port for HTTP requests that get sent to our server

`app.get('locationOfGetRequest', function)`
- allows us to specify what should happen when a browser connects to server and makes a GET request
- callback function tells server what to do when GET request is made
- `req` contains information about request that was made

### Routes

```
app.get('/about', function(req, res) {
  res.send('I am me');
});
```
- if browser goes to `localhost:3000/about`, then the string is displayed

### Respond to GET Requests With HTML Files

```
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
```
- `__dirname` is the current directory

### Processing POST Requests

`const bodyParser = require('body-parser');`  
`app.use(bodyParser.urlencoded({extended: true}));`
- use `body-parser` to extract information from POST requests

```
app.post('/', function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send('The result of the calculation is ' + result);
});
```
- `num1` comes from `<input type="text" name="num1" placeholder="First Number">`

### Making GET Requests
`const https = require('https');`
- `https` is a built-in module

```
app.get('/', function(req, res) {
  https.get('url', function(response) {
    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write('<h1>The temperature in London is ' + temp + ' degrees Fahrenheit</h1>');
      res.write('<p>The weather is currently ' + weatherDescription + '</p>');
      res.send();
    });
  });
});
```
- can only have 1 `res.send()` in an `app.get()`
  - use `res.write()` to send multiple lines
