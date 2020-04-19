// ==UserScript==
// @name         PCGameit.com autoscroll
// @namespace    https://pcgameit.com
// @version      0.0.1
// @description  autoscrolling for the pages that has a lot of data.
// @author       MalikQayum
// @connect      pcgameit.com
// @include      /^https?://www.pcgameit\.com\/(keylog|curatorlog)\/(free|available|vr)\//
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

var maxscrolls = 100;
var autoscrolling = 0;

setInterval(function(){ 
  if(autoscrolling < maxscrolls){
    getData(); 
    autoscrolling++;
  }
  else
  {
    /*donothing.*/
  }
}, 5000);
