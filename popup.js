$(function(){
    $("#rss_input").keyup(function(){
    	$("#greetings").text('Hi '+ $('#rss_input').val());
    });

});