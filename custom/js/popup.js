$(function(){
            chrome.storage.local.get("rssFeedList", function(items) {
            $.each(items.rssFeedList, function( index, value ) {
                var nItem = "<li class='list-group-item'><a target='_blank' href='" + value["link"] + "'>" +
                value["title"] + "</a><div style='font-size:xx-small' class='description'>+"+
                value["description"]+"+</div></li>";
                $("#rssList").append(nItem);
            })
            
        });
});

console.log(chrome.alarms.get())

