$(function(){
         chrome.storage.local.get("rssFeedList", function(items) {
            $.each(items.rssFeedList, function( index, value ) {
                var nItem = "<li class='list-group-item'><a href='#'>" +
                value["title"] + "</a><div style='display: none;font-size:x-small; padding-bottom:5px;' class='description'>+"+
                value["description"]+"+<br /><a target='_blank' style='float:right;' href='" + value["link"] + "'>show</a></div></li>";
                $("#rssList").append(nItem);
            });

            $('.list-group-item').click(function(e){
                var desc = $(this).find('.description')
                $('.list-group-item .description').not(desc).hide();
                desc.toggle();
            });    
            
        });

        
});

//console.log(chrome.alarms.get())

