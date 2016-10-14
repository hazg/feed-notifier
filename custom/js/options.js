$(function() {

    chrome.storage.local.get("rssFeed", function(items) {
        $("#rssInput").val(items.rssFeed);
    });

    chrome.storage.local.get("notificationTime", function(items) {
        $("#notificationDisplayTime").val(items.notificationTime);
    });

    chrome.storage.local.get("rssFeedTime", function(items) {
        $("#rssFeedTime").val(items.rssFeedTime);
    });

    chrome.storage.local.get("yesNotification", function(items) {
        if (items.yesNotification == true) {
            $("#yesNotification").prop('checked', true);
        }
    });

    $(".submit-rss").click(function() {
        var rssInput = $("#rssInput").val();

        var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        if (urlregex.test(rssInput) == true) {
            chrome.storage.local.set({ "rssFeed": rssInput });
        }

        chrome.storage.local.set({ "rssFeedTime": $("#rssFeedTime").val()});
        chrome.storage.local.set({ "notificationTime": $("#notificationDisplayTime").val()});



        if ($("#yesNotification").is(":checked")) {
            chrome.storage.local.set({
                "yesNotification": true
            });
        } else {
            chrome.storage.local.set({
                "yesNotification": false
            });
        }

    });

    // $('#yesNotification').click(function() {
    //     if (!$(this).is(':checked')) {
    //         $("#rssFeedTime").attr("disabled", "disabled");
    //     } else {
    //         $("#rssFeedTime").removeAttr("disbaled");
    //     }

    // }); <!--  Todo -->

});
