// ==UserScript==
// @name         PCGameit.com autoscroll
// @namespace    https://pcgameit.com
// @version      0.0.5
// @description  autoscrolling for the pages that has a lot of data.
// @author       MalikQayum
// @connect      pcgameit.com
// @include      /^https?://www.pcgameit\.com\/(keylog|curatorlog)\/(free|available|vr)\//
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

/* added this little script to autoscroll for stefan.
** if need be you can increase/decrease, the variables (big/small)maxscrolls to your needs.
** delaytimer should not be touched but if it is too slow then maybe decrease it to 3000.
** keylog/curatorlog has a big page each > available; depending on the amount apps on each page (big/small)maxscrolls should be adujusted.
*/
var bigmaxscrolls = 75;
var smallmaxscrolls = 15; 
var delaytimer = 5000;
var autoscrolling = 0;

setInterval(function(){
  var AutoScrollingPages = new RegExp(/pcgameit\.com\/(keylog|curatorlog)\/available\//); 
  if(document.URL.match(AutoScrollingPages))
  {
    if(autoscrolling < bigmaxscrolls){
      getData(); 
      autoscrolling++;
    }
    else
    {
      /*donothing.*/
    }
  }
}, delaytimer);

setInterval(function(){
  var AutoScrollingPages = new RegExp(/pcgameit\.com\/(keylog|curatorlog)\/(free|vr)\//); 
  if(document.URL.match(AutoScrollingPages))
  {
    if(autoscrolling < smallmaxscrolls){
      getData(); 
      autoscrolling++;
    }
    else
    {
      /*donothing.*/
    }
  }
}, delaytimer);
