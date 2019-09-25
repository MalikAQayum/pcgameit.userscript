// ==UserScript==
// @name         PCGameit Curator Package Claimer
// @namespace    PCGameit.com
// @version      0.3
// @description  userscript to auto accept granted curator appids / packages from pcgameit.
// @author       MalikQayum
// @connect      pcgameit.com
// @match        https://store.steampowered.com/*
// @require     https://raw.githubusercontent.com/MalikAQayum/pcgameit.userscript/master/func/pcgi_func.js
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==


/** Usage and how it works.
Once PCGI Userscript has been installed, it runs in the background on the https://store.steampowered.com

- Go to any https://store.steampowered.com related pages or stay on the main page, and it will trigger itself every 6 min on set times of the hour; 
  - minute 0 (skipped)
  - minute 6
  - minute 12
  - minute 18
  - minute 24
  - minute 30 (skipped)
  - minute 36
  - minute 42
  - minute 48
  - minute 54
- If you are set (been notifified that you have been set) to be the claimer, then let it idle in these specific minutes of the hour, to avoid interupting it, on any store.steampowered.com page.
- If you have not been notifified, then you can let it idle and check the console yourself, to see if you have been set to claim.
**/

var Version = GM_info.script.version, Name = GM_info.script.name, Author = GM_info.script.author, Namespace = GM_info.script.namespace;
console.log ('%c '+Name + ': v'+Version + ' by '+Author, 'background: grey; color: white; display: block;', Namespace);
