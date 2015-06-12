var ipc = require('ipc');
var wv = null;


var NewsCard = React.createClass({
   render: function() {
        return  (
            <div className="newsCard" onClick={this.props.select.bind(null, this.props.story.url)}>
                {this.props.story.title}
                <img src={this.props.story.img} className="storyPic" />
                {/*<img src={this.props.story.img} className="storyPic" />*/}
            </div>
        );
    }
});

var NewsGrid = React.createClass({
    render: function(){
        var select = this.props.select;
        var createCard = function(story, index) {
            return <NewsCard story={story} key={index} select={select}/>
        };
        return (
            <div className="newsGrid">
                {this.props.stories.map(createCard)}
            </div>
        );
    }
});

var ArticleViewNav = React.createClass({
    render: function(){
        return (
            <div className={this.props.isActive}>
                <img src="img/back.png" className="back" onClick={this.props.goBack}/>
                <div id="wv"></div>
            </div>
        );
    },
});


var UI = React.createClass({
    getInitialState: function() {
      return {viewState: "inactive", viewSrc: "", viewClass: "inactive", defaultView: 'file://' + __dirname + '/loading.html'};
    },
    render: function() {
        return (
            <div>
                <div className="grid">
                    <NewsGrid stories={this.props.stories} select={this.showStory}/>
                </div>
                <div>
                    <ArticleViewNav isActive={this.state.viewClass} goBack={this.hideStory}/>
                </div>
            </div>
        );
    },
    //RESUME: scrape article content and just display that OR try creating and deleting webviews dynamically OR creating new windows every click
    showStory: function(url) {
        this.setState({viewClass: "active"});
        //var wv = document.querySelector("#wv > webview");
        wv.setAttribute("src", url);
        wv.setAttribute("class", "see");
    },
    hideStory: function(){
        //this.setState({viewSrc: this.state.defaultView, viewClass: "inactive"});
        this.setState({viewClass: "inactive"});
        wv.setAttribute("class", "nosee");
        //var wv = document.querySelector("#wv > webview");
    }
});

ipc.on('getNews-reply', function(news) {
    news = JSON.parse(news);
    var stories = [];
    //render page
    for(source in news){
        stories = stories.concat(news[source].stories);
    }
    React.render(
        <UI stories={stories}  />,
        document.querySelector("#ui")
    );
    wv = document.createElement("webview");
    document.querySelector("body").appendChild(wv);
});

ipc.send('getNews-msg', 'ping');
