// ==UserScript==
// @name         PCGameit Curator Package Claimer
// @namespace    PCGameit.com
// @version      0.1
// @description  userscript to auto accept granted curator appids / packages from pcgameit.
// @author       MalikQayum
// @connect      pcgameit.com
// @match        https://store.steampowered.com/*
// @match        https://steamcommunity.com/*
// @require     https://raw.githubusercontent.com/MalikAQayum/pcgameit.userscript/master/func/pcgi_func.js
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var Version = GM_info.script.version, Name = GM_info.script.name, Author = GM_info.script.author, Namespace = GM_info.script.namespace;
console.log ('%c '+Name + ': v'+Version + ' by '+Author, 'background: grey; color: white; display: block;', Namespace);