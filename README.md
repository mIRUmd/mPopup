mPopup
======
[![Build Status](https://travis-ci.org/mIRUmd/mPopup.png)](https://travis-ci.org/mIRUmd/mPopup)

Fast, light and customizable jQuery popup plugin.

Optionally, install via Bower: `bower install m-popup` ,
install via NPM: `npm install m-popup`
Install via NuGet `PM> Install-Package mPopup`


## License
Released under the MIT license - http://opensource.org/licenses/MIT

Created by Balan Miroslav

## Why should I use this popup?
* Popup can contain images, video, or HTML content
* Uses CSS transitions for slide animation ,native hardware acceleration
* Small file size, fully themed, simple to implement
* Browser support: Firefox, Chrome, Safari, iOS, Android, IE7+
* Many configuration options

For complete documentation and examples, visit:
[http://mirudev.com/mpopup/](http://mirudev.com/mpopup/)


## How to install

### Step 1: Link required files
First and most important, the jQuery library needs to be included (Google cdn or local jQuery file). Next, download the package from github or install via Bower: `bower install m-popup` , install via NPM: `npm install m-popup`, and link the mPopup CSS file (for the theme) and the mPopup Javascript file.

```html
<!-- jQuery library (served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- mPopup Javascript file -->
<script src="/js/mPopup.jquery.min.js"></script>
<!-- mPopup CSS file -->
<link href="/lib/mPopup.css" rel="stylesheet">
```

### Step 2: Create HTML markup
Create a `<ul class="mPopup">` element, with any HTML content , in css have to show width and height of popup

```html
<div class="mPopup">
    <!-- any HTML content -->
</div>

````

```css
.mPopup{
    /* popup css code */
    width: 60%;
    height: 300px;
}
```

### Step 3: Call the mPopup
Call .mPopup() on `<ul class="mPopup">`. Note that the call must be made inside of a $(document).ready() call, or the plugin will not work!

```javascript
$(document).ready(function(){
    // generate popup
    var popup = $('.mPopup').mPopup();
    // open generated popup
    popup.mPopup('open');
});
```

##Configuration options

### Options

**type**
Sets a fixed or absolute position for mPopup.
```
default : fixed
options : fixed , absolute
```

**closeClass**
Class name to trigger closing of mPopup.
```
default : mPopup-close
options : string (class name)
```

**closeOnOverlayClick**
Close mPopup when click on overlay.
```
default : true
options : boolean (true / false)
```

**overlayClass**
Overlay class name.
```
default : mPopup-overlay
options : string (class name)
```

**overlayFade**
Overlay with fade animation or just hide.
```
default : true
options : boolean (true / false)
```

**animationType**
Animation type for popup on opening and closing.
```
default : fade
options : string (fade / slide) 
```

**animationSpeed**
Speed of animation.
```
default : 400
options : (slow / fast) or integer 
```

**positionElement**
Position popup relative to element.
```
default : null
options : jQuery object
```

**typePositionObject**
Type position of element to align.
```
default : offset
options : (offset / position) 
```

**modifyPosition**
Modification of current position of mPopup.
```
default : { top : 0, left : 0 }
options : Object 
```

### Methods

**open**
Manually opens a mPopup.
```
$('#elem').mPopup('open')
```

**close**
Manually closes a mPopup.
```
$('#elem').mPopup('close')
```

**recalculate-position**
Recalculate current position of mPopup.
```
$('#elem').mPopup('recalculate-position')
```

**destroy**
Destroy created popup.
```
$('#elem').mPopup('destroy')
```

### Events

**onOpen**
Trigger on opening mPopup.
```
$('#popup').on('mPopop:open' = function (e) {
                   // do something...
                });
```

**onClose**
Trigger on closing mPopup.
```
$('#popup').on('mPopop:close' = function (e) {
                   // do something...
                });
```


## [Changelog](https://github.com/mIRUmd/mPopup/releases)


