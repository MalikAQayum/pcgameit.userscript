get_id();
function get_id() {
    //console.log("pcgi_func.js => " +new Date());
    var date_ = new Date();
    var min_ = date_.getMinutes();
    if((min_ == 6) || (min_ == 12) || (min_ == 18) || (min_ == 24) || (min_ == 36) || (min_ == 42) || (min_ == 48) || (min_ == 54)){
        var sec_ = date_.getSeconds();
        if(sec_ < 10){
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://www.pcgameit.com/api/get_id/",
                onload: function(response) {
                    var get_steamID = response.responseText;
                    var json = JSON.parse(get_steamID);

                    if (json[0]['steamid'] == 0){
                        //nobody set as claimer.
                        //this means, we passed the interval, so lets skip to the next one by waiting.
                        // better setTimeout
                        var waitTime = 5 * 60 * 1000; // = 18 min.
                        setTimeout(function(){ get_id(); }, waitTime);
                        //setTimeout(function(){ get_id(); }, 1000);
                    }
                    else
                    {
                        let mysteamid;
                        if (typeof g_AccountID !== 'undefined') {
                            mysteamid = "765";
                            mysteamid += Number(61197960265728) + Number(g_AccountID);
                        }

                        if (json[0]['steamid'] == parseInt(mysteamid)) {
                            get_appid(mysteamid,g_sessionID);
                        }
                        else
                        {
                            //this wasn't us, so lets just wait for the next interval.
                            // better setTimeout
                            var waitTime = 5 * 60 * 1000; // = 18 min.
                            setTimeout(function(){ get_id(); }, waitTime);
                            //setTimeout(function(){ get_id(); }, 1000);
                        }
                    }
                }
            });
        }
        else
        {
            //too slow, wait for the next run
            //this means, we missed the seconds in which we had our window, so lets wait for the next interval.
            // better setTimeout
            var waitTime = 5 * 60 * 1000; // = 18 min.
            setTimeout(function(){ get_id(); }, waitTime);
            //setTimeout(function(){ get_id(); }, 1000);
        }
    }
    else
    {
        //not time yet, setTimeout func 1 sec delay?
        //write a better timeout, one that checks our const time values and adds it to the delay. setTimeout(function(){ get_id(); }, 3000);
        //get_id();

        setTimeout(function(){ console.log("Checking.."); get_id(); }, 1000);
    }
}

function get_appid(steamid, sessionid){
	
	//window.btoa(str);
	
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.pcgameit.com/api/userscript/get_appid/get_appid.php?pcgimetastr="+encodeURIComponent(GM_info.scriptMetaStr.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g,'')),
        onreadystatechange: function(response) {
            //console.log("readyState changed to: " + response.readyState);
        },
        onload: function(response) {
            var get_appid_arr = response.responseText;
			if(get_appid_arr === "Claimer role has not been set!"){
				console.log("Token/Claimer role is either not set/expired...");
				var waitTime = 5 * 60 * 1000; // = 15 min.
				setTimeout(function(){ get_id(); }, waitTime);
			}
			else
			{
				var json = JSON.parse(get_appid_arr);
				var appid_arr = json[0]['claim'].split(",");
				console.log("Games Claimed => " + appid_arr.length);
				console.log("Appids Claimed => " + appid_arr);

				console.log("Start Time: " + new Date());

				for (var i = 0; i < appid_arr.length; i++) {
					$.post("https://store.steampowered.com/curator/33779114/admin/ajaxrespondoffer", {
						sessionid: sessionid,
						clanid: "33779114",
						appid: appid_arr[i],
						action: "accept"
					});
					console.log("Accepted curator package => " + appid_arr[i]);
					console.log(new Date());
				}

				console.log("End Time: " + new Date());

				var waitTime = 5 * 60 * 1000; // = 15 min.
				setTimeout(function(){ get_id(); }, waitTime);
			}
        }
    });
}


/**	DO STUFF ON PCGAMEIT.COM
*	Get Owned Games function.
*	steampowered.com	:	dynamicstore userdata
*	steamcommunity.com:	actions GetOwnedApps
**/

/*
if(window.location.href === "https://www.pcgameit.com/curatorlog/free/"){
	g_DU();	
}
//https://store.steampowered.com/
function g_DU(){
	GM_xmlhttpRequest({
        method: "GET",
        url: "https://store.steampowered.com/dynamicstore/userdata",
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
	$.each(OA, function( index, value ) {
		var id = value;
		$('#' + id).css("background-color", "#186A3B");
	});
}

*/