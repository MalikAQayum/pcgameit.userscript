get_id();
function get_id() {
    //console.log("pcgi_func.js => " +new Date());
    var date_ = new Date();
    var min_ = date_.getMinutes();
    if((min_ == 7) || (min_ == 27) || (min_ == 47)){
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
                        setTimeout(function(){ get_id(); }, 1000);
                    }
                    else
                    {
                        let mysteamid;
                        if (typeof g_AccountID !== 'undefined') {
                            mysteamid = "765";
                            mysteamid += Number(61197960265728) + Number(g_AccountID);
                        }
                        if (typeof g_steamID !== 'undefined') {
                            mysteamid = g_steamID;
                        }

						for (var i = 0; i < json.length; i++) {						
							if (json[i]['steamid'] == parseInt(mysteamid)) {
								console.log("0: " +json[0]['steamid']);
								get_appid(mysteamid,g_sessionID);
							}						
						}
						console.log("0 testing to see if echo this!");
						//setTimeout(function(){ get_id(); }, 1000);
                    }
                }
            });
        }
        else
        {
            //too slow, wait for the next run
            setTimeout(function(){ get_id(); }, 1000);
        }
    }
    else
    {
        //not time yet, setTimeout func 1 sec delay?
        //write a better timeout, one that checks our const time values and adds it to the delay. setTimeout(function(){ get_id(); }, 3000);
        //get_id();
        setTimeout(function(){ console.log("trying again.."); get_id(); }, 1000);
    }
}

function get_appid(steamid, sessionid){

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.pcgameit.com/api/userscript/get_appid/get_appid.php?steamid="+steamid+"&pcgimetastr="+encodeURIComponent(GM_info.scriptMetaStr.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g,'')),
        onreadystatechange: function(response) {
            //console.log("readyState changed to: " + response.readyState);
        },
        onload: function(response) {
            var get_appid_arr = response.responseText;
            var json = JSON.parse(get_appid_arr);
            var appid_arr = json[0]['note'].split(",");
            console.log(appid_arr.length);
            console.log(appid_arr);
            
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
            
            var waitTime = 15 * 60 * 1000; // = 15 min.
            setTimeout(function(){ get_id(); }, waitTime);
        }
    });
}
