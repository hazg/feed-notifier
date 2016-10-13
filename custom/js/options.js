$(function(){

    chrome.storage.local.get("rssFeed", function(items) {
            $("#rssInput").val(items.rssFeed);
        });

    chrome.storage.local.get("rssFeedTime", function(items) {
            $("#rssFeedTime").val(items.rssFeedTime);
        });

    chrome.storage.local.get("yesNotification", function(items) {
        if (items.yesNotification == true) {
            $("#yesNotification").prop('checked', true);
        } else {
            $("#noNotification").prop('checked', true);
        };
    });
    
    $(".submit-rss").click(function() {
        chrome.storage.local.set({"rssFeed": $("#rssInput").val()});
        chrome.storage.local.set({"rssFeedTime": $("#rssFeedTime").val()});

        var rssDict = [
                    {
                        "title": "Hello World",
                        "link": "http://example.com"
                    },
                    {
                        "title": "Ruddra's Blog",
                        "link": "http://ruddra.com"
                    }
                ];
        
        chrome.storage.local.set({
            "rssFeedList" : rssDict
        });
            

        if ($("#yesNotification").is(":checked")) {
            chrome.storage.local.set({"yesNotification": true
        });
        } else {
            chrome.storage.local.set({"yesNotification": false
        });
        }

    // $('#yesNotification').change(function() {
    //     console.log("okks");
    //     if($(this).is("checked")) {
    //     $("#rssFeedTime").prop("distabled", false);
    // } else {
    //     $("#rssFeedTime").prop("distabled", true);
    //     }
    // });

    });

});

