$(function(){
            chrome.storage.local.get("rssFeedList", function(items) {
            $.each(items.rssFeedList, function( index, value ) {
                var nItem = "<li class='list-group-item'><a href='" + value["link"] + "'>" +
                value["title"] + "</a></li>";
                $("#rssList").prepend(nItem);
            })
            
        });
});

