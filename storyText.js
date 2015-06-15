/*
RESUME: hook up to main.js correctly
        add main function that switches on url
        setup ipc comm for it
        navbar: title, share, view site
*/
var request = require('request'); 
var cheerio = require('cheerio');

function getDomain(url){
    url = url.replace(/https*:\/\//, "");
    url =  url.replace(/\/.*/, "");
    url =  url.replace(/\.com/, "");
    url = url.replace(/www\./, "");
    console.log("domain: " + url);
    return url;
}

module.exports = function(url, callback){
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            switch(getDomain(url)){
                case "sfweekly":
                    //sfWeekly(html, callback);
                    break;
                case "sfgate":
                    sfGate(html, callback);
                    break;
            }
        }
    });
}

function sfWeekly(html, callback){
    var $ = cheerio.load(html);
    p = $(".postBody").childNodes;

    text = ""
    for(var i = 0; i< p.length; i++){
        if(p[i].data){
            text += p[i].textContent;
        }
    }
}

function sfGate(html, callback){
    var $ = cheerio.load(html);
    var p = $(".article-body p")
    console.log(p);
    text = ""
    p.each(function(){
        text += $(this).text() + "\n";
    });
    callback(text);
}

function sevenx7(html, callback){
    p = $(".pane-node-body p")
    text = ""
    for(var i = 0; i< p.length; i++){
        text += p[i].textContent +"\n"
    }
}

function sfChronicle(html, callback){
    var p = $(".article-text > p");
    var text = "";
    for(var i = 0; i< p.length; i++){
        text += p[i].textContent
    }
}

function ebar(html, callback){
    var p = $(".article > p");
    var text = "";
    for(var i = 0; i< p.length; i++){
        text += p[i].textContent
    }
}

function sfExaminer(html, callback){
    document.getElementById("storyBody").textContent;
}

function bostonHerald(html, callback){
    document.querySelectorAll(".field-type-text-with-summary")[0].textContent
}

function bizJournals(html, callback){
    p = $(".content__segment")
    text = ""
    for(var i = 0; i< p.length; i++){
        text += p[i].textContent
    }
}

function sfist(html, callback){
    $(".entry-body")[0].textContent
}
