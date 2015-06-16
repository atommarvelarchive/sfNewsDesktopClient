function clean(){
    cleanOrRepeat = function(element){
        if(element){
            document.body.innerHTML = element.innerHTML;
        }else{
            setTimeout(clean.bind(this), 200);
        }
    }
    switch(window.location.hostname){
        case "www.sfchronicle.com":
            cleanOrRepeat(document.querySelector(".article-body"));
            break;
        case "ebar.com":
             cleanOrRepeat(document.querySelector("#center"));
            break;
        case "www.sfexaminer.com":
             cleanOrRepeat(document.querySelector("#section"));
            break;
        case "www.sfgate.com":
             cleanOrRepeat(document.querySelector(".article-content"));
            break;
        case "":
            break;
        case "":
            break;
        case "":
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
.extras, .ndn_embed{ \
    display: none; \
} \
";


module.exports = function(window){
    console.log(window.id);
    window.webContents.executeJavaScript(clean.toString()+"clean()");
    window.webContents.insertCSS(css);
}


