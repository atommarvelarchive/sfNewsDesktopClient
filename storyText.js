/*
RESUME: hook up to main.js correctly
        add main function that switches on url
        setup ipc comm for it
        navbar: title, share, view site
*/
var request = require('request'); 
var cheerio = require('cheerio');

function getDomain(url){
    var archive = false;
    url = url.replace(/https*:\/\//, "");
    //if /sf/ then its a diff article view
    if(url.indexOf("/sanfrancisco/") !== -1){
        archive = true;
    }
    url =  url.replace(/\/.*/, "");
    url =  url.replace(/\.com/, "");
    url = url.replace(/www\./, "");
    if(url === "sfexaminer" && archive){
        url += "archive";
    }
    console.log("domain: " + url);
    return url;
}

module.exports = function(url, callback){
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            switch(getDomain(url)){
                case "sfweekly":
                    sfWeekly(html, callback);
                    break;
                case "sfgate":
                    sfGate(html, callback);
                    break;
                case "7x7": 
                    sevenx7(html, callback);
                    break;
                case "sfchronicle": 
                    sfChronicle(html, callback);
                    break;
                case "ebar": 
                    ebar(html, callback);
                    break;
                case "ebar": 
                    ebar(html, callback);
                    break;
                case "sfexaminerarchive": 
                    sfExaminerArchive(html, callback);
                    break;
                case "sfexaminer": 
                    sfExaminer(html, callback);
                    break;
                case "bostonherald": 
                    bostonHerald(html, callback);
                    break;
                case "bizjournals": 
                    bizJournals(html, callback);
                    break;
                case "sfist": 
                    sfist(html, callback);
                    break;
            }
        }
    });
}

function sfWeekly(html, callback){
    var $ = cheerio.load(html);
    var p = $(".postBody");
    var text = "";
    p.each(function(){
        var item = $(this);
        console.log(item.text());
        if(item.text()){
            text += item.text();
        }
    });
    callback(text);
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
    var $ = cheerio.load(html);
    var p = $(".pane-node-body p");
    text = "";

    p.each(function(){
        text += $(this).text() + "\n";
    });
    callback(text);
}

function sfChronicle(html, callback){
    var $ = cheerio.load(html);
    var p = $(".article-text").find("p");
    var text = "";
    p.each(function(){
        text += $(this).text();
    });
    callback(text);
}

function ebar(html, callback){
    var $ = cheerio.load(html);
    var p = $(".article").find("p");
    var text = "";
    p.each(function(){
        text += $(this).text();
    });
    callback(text);
}

function sfExaminerArchive(html, callback){
    var $ = cheerio.load(html);
    callback($("#storyBody").text());
}

function sfExaminer(html, callback){
    var $ = cheerio.load(html);
    callback($(".story-wrap").text());
}

function bostonHerald(html, callback){
    var $ = cheerio.load(html);
    callback($(".field-type-text-with-summary").first().text());
}

function bizJournals(html, callback){
    var $ = cheerio.load(html);
    var p = $(".content__segment");
    var text = "";
    p.each(function(){
        text += $(this).text();
    });
    callback(text);
}

function sfist(html, callback){
    var $ = cheerio.load(html);
    callback($(".entry-body").first().text());
}
