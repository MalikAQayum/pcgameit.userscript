// ==UserScript==
// @name         PCGameit.com autoscroll
// @namespace    https://pcgameit.com
// @version      0.0.3
// @description  autoscrolling for the pages that has a lot of data.
// @author       MalikQayum
// @connect      pcgameit.com
// @include      /^https?://www.pcgameit\.com\/(keylog|curatorlog)\/(free|available|vr)\//
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

/* added this little script to autoscroll for stefan.
** if need be you can increase/decrease, the variable maxscrolls to your needs.
** delaytimer should not be touched but if it is too slow then maybe decrease it to 3000.
*/
var maxscrolls = 75;
var delaytimer = 5000;
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
}, delaytimer);
