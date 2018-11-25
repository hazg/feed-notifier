function callAjax(rssUrl) {
    $.ajax({
        type: 'GET',
        url: rssUrl,
        dataType: 'xml',
        success: function(xml) {
            var responseList = []
            $(xml).find("item").each(function() {
                var title = $(this).find("title").text();
                var link = $(this).find("link").text();
                var description = $(this).find("description").text();
                
                responseList.push({ title, link, description });

            });
            if (responseList.length > 0) {
                chrome.storage.local.set({ "rssFeedList": responseList });
            } else {
                $(xml).find("entry").each(function() {
                    var title = $(this).find("title").text();
                    var link = $(this).find("link").attr("href");
                    var description = $(this).find("description").text();
                    
                    responseList.push({ title, link, description });

                });
                chrome.storage.local.set({ "rssFeedList": responseList });
            }
        }
    });
}

function createAlarm() {
    var yesNotification = false;
    var periodInMinutes = 0;
    chrome.storage.local.get("yesNotification", function(items) {
        if (items.yesNotification == true) {
            chrome.storage.local.get("rssFeedTime", function(items) {
                periodInMinutes = parseInt(items.rssFeedTime, 10);
                if (periodInMinutes > 0) {
                    var alarmObj = {
                        periodInMinutes: periodInMinutes
                    }
                    chrome.alarms.create("checkNotification", alarmObj);
                }

            });

        };
    });
}

function stopAlarm() {
    chrome.alarms.clearAll();
}

function createNotification(title, link) {

    chrome.storage.local.get("yesNotification", function(item) {
        if (item.yesNotification == true) {
            var opt = {
                type: "basic",
                title: "RSS Notification",
                message: title,
                iconUrl: "images/notification_icon.png"
            };
            chrome.notifications.create(link, opt, function(notificationId) {
                chrome.storage.local.get("notificationTime", function(item) {
                    var notificationTime = 1000;
                    if (item.notificationTime > 0) {
                        notificationTime = item.notificationTime * notificationTime;
                        timer = setTimeout(function() { chrome.notifications.clear(notificationId); }, notificationTime);
                    }
                })

            });
        }
    })
}


chrome.storage.onChanged.addListener(function(changes) {
    if (changes.hasOwnProperty("rssFeed")) {
        chrome.storage.local.set({ "rssFeedList": [] });
        chrome.alarms.clear("checkNotification")
        var newRssUrl = changes.rssFeed.newValue.toString();
        var opt = {
            type: "basic",
            title: "Url Updated",
            message: "Url has been updated to '" +
                newRssUrl +
                "'",
            iconUrl: "images/setup_icon.png"
        };
        chrome.notifications.create(newRssUrl, opt, function() {});

        // ------------ Call Ajax ------------------
        callAjax(newRssUrl);

        // --- set alart ---
        createAlarm()

    } else if (changes.hasOwnProperty("rssFeedList")) {

        var notNewIndexList = [];
        var newValues = changes.rssFeedList.newValue;
        var oldValues = changes.rssFeedList.oldValue;
        $.each(newValues, function(nIndex, nValue) {
            $.each(oldValues, function(oIndex, oValue) {
                if (nValue["link"] == oValue["link"]) {
                    notNewIndexList.push(nIndex);
                }
            });
        });

        $.each(notNewIndexList, function(index, value) {
            newValues.splice($.inArray(value), 1);
        })

        $.each(newValues, function(index, value) {
            createNotification(value["title"], value["link"])
        });

        chrome.browserAction.setBadgeText({
            text: changes.rssFeedList.newValue.length.toString()
        });

    }

});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ 'url': chrome.extension.getURL('templates/popup.html') }, function(tab) {
        // Tab opened.
    });
});

chrome.notifications.onClicked.addListener(function(notificationId) {
    chrome.tabs.create({ url: notificationId });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.storage.local.get("rssFeed", function(item) {
        callAjax(item.rssFeed);
    });
});
