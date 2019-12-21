$(document).ready(function(){
	var pcgi_OwnedGames = new RegExp(/pcgameit\.com\/(app|key|keylog|curatorlog)\//);
	if(document.URL.match(pcgi_OwnedGames))
	{
		g_DU();
		//g_AG();
	}
});

//https://store.steampowered.com/
function g_DU(){
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://store.steampowered.com/dynamicstore/userdata/?t=" + (new Date().getTime()),
        onreadystatechange: function(response) {
            //console.log("readyState changed to: " + response.readyState);
        },
        onload: function(response) {
            var data = response.responseText;
            var g_rgOwnedApps = JSON.parse(data);
            console.log(g_rgOwnedApps['rgOwnedApps'].length);
            if(g_rgOwnedApps['rgOwnedApps'].length > 0){
                //we should do something with this array of appids now.
                Owned(g_rgOwnedApps['rgOwnedApps'])
            }
        }
    });
}

//https://steamcommunity.com/ (WIP)
function g_AG(){

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://steamcommunity.com/",
        onreadystatechange: function(response) {
            //console.log("readyState changed to: " + response.readyState);
        },
        onload: function(response) {
            var myAG = response.responseText;
            var matchSteamid = myAG.match(new RegExp(/g_steamID = "(.*)";/gm));
            var matchSessionid = myAG.match(new RegExp(/g_sessionID = "(.*)";/gm));
            //console.log(matchSteamid[0].replace("g_steamID = ","").replace(";","").replace(/"/g,""));
            var steamid = matchSteamid[0].replace("g_steamID = ","").replace(";","").replace(/"/g,"");
            var sessionid = matchSessionid[0].replace("g_sessionID = ","").replace(";","").replace(/"/g,"");

            if(steamid.length == 17){
                console.log("do next request");
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://steamcommunity.com/actions/GetOwnedApps/?sessionid="+sessionid,
                    onreadystatechange: function(response) {
                        //console.log("readyState changed to: " + response.readyState);
                    },
                    onload: function(response) {
                        var myAG2 = response.responseText;

                        /// THIS IS WHERE WE ARE, WORKING WITH THE JSON FROM GetOwnedApps.

                    }
                });
            }
        }
    });
}

function Owned(OA){
    //https://codepen.io/MalikQayum/pen/qBEEZVb
    //https://www.pcgameit.com/giveaway/
    if (window.location.href.indexOf("giveaway") > -1) {
       $.each(OA, function( index, value ) {
            var id = value;
            $('#' + id).hide();
        });
    }
    else
    {
        $.each(OA, function( index, value ) {
            var id = value;
            $('#' + id).css("background-color", "#186A3B");
        });
    }
}