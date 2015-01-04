mPopup
======
[![Build Status](https://travis-ci.org/mIRUmd/mPopup.png)](https://travis-ci.org/mIRUmd/mPopup)

Fast, light and customizable jQuery popup plugin.

Optionally, install via Bower: `bower install m-popup` ,
install via NPM: `npm install m-popup`

If you used mPopup in some interesting way, or on site of popular brand, I'd be very grateful if you <a href="mailto:mIRU.md@gmail.com?subject="Site that uses mPopup"">shoot me</a> a link to it.

## Why should I use this popup?
* Popup can contain images, video, or HTML content
* Uses CSS transitions for slide animation ,native hardware acceleration
* Small file size, fully themed, simple to implement
* Browser support: Firefox, Chrome, Safari, iOS, Android, IE7+
* Many configuration options


## How to install

### Step 1: Link required files
First and most important, the jQuery library needs to be included (Google cdn or local jQuery file). Next, download the package from github or install via Bower: `bower install m-popup` , install via NPM: `npm install m-popup`, and link the mPopup CSS file (for the theme) and the mPopup Javascript file.

````
<!-- jQuery library (served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- mPopup Javascript file -->
<script src="/js/mPopup.jquery.min.js"></script>
<!-- mPopup CSS file -->
<link href="/lib/mPopup.css" rel="stylesheet">
````

### Step 2: Create HTML markup
Create a `<ul class="mPopup">` element, with any HTML content , in css have to show width and height of popup

````
<div class="mPopup">
    <!-- any HTML content -->
</div>
````

````
.mPopup{
    /* popup css code */
    width: 60%;
    height: 300px;
}
````

### Step 3: Call the mPopup
Call .mPopup() on `<ul class="mPopup">`. Note that the call must be made inside of a $(document).ready() call, or the plugin will not work!

````
$(document).ready(function(){
    $('.mPopup').mPopup();
});
````

## [Changelog](https://github.com/mIRUmd/mPopup/releases)

## License

Script is MIT licensed and free and will always be kept this way.

Created by [@mIRUmd](http://twitter.com/mIRUmd) & [contributors](https://github.com/mIRUmd/mPopup/contributors).

