var ipc = require('ipc');
var remote = require('remote');

function clean(){
    var cleanOrRepeat = function(selector){
        var element = document.querySelector(selector);
        if(element){
            ipc.send('log', "found! cleaning in a sec...");
            setTimeout(function(){
                document.body.innerHTML = document.querySelector(selector).innerHTML;
                remote.getCurrentWindow().webContents.insertCSS(css);
            }, 500);
        }else{
            ipc.send('log', "try again");
            setTimeout(clean.bind(this), 200);
        }
    };
    switch(window.location.hostname){
        case "www.sfchronicle.com":
            cleanOrRepeat(".article-body");
            break;
        case "ebar.com":
            cleanOrRepeat("#center");
            break;
        case "www.sfexaminer.com":
            cleanOrRepeat("#section");
            break;
        case "www.sfgate.com":
            cleanOrRepeat(".article-content");
            break;
        case "archives.sfexaminer.com":
            cleanOrRepeat("#gridSpanningFeature");
            break;
        case "sfist.com":
            cleanOrRepeat("#entry-content");
            break;
        case "www.sfweekly.com":
            cleanOrRepeat("#gridMainColumn");
            break;
        case "":
            break;
        case "":
            break;
    }
}

var css = " \
body{ \
    background-image: url(''); \
    background-color: white; \
} \
img{ \
   max-width: 100%; \
   height: auto; \
} \
#pollContainer, #stage-bottom, .Ad, .extras, .ndn_embed{ \
    display: none; \
} \
div.control-panel-inner > .caption{ \
    position: inherit; \
} \
";

ipc.send('log', JSON.stringify(this));

clean();

module.exports = function(window){
    console.log(window.id);
    window.webContents.executeJavaScript(clean.toString()+"clean()");
    window.webContents.insertCSS(css);
}


