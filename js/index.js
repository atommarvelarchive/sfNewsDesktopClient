var ipc = require('ipc');

var NewsCard = React.createClass({
   render: function() {
        return  (
            <a href={this.props.story.url}>
            <div className="newsCard">
                {this.props.story.title}
            </div>
            </a>
        );
    }
});

var NewsGrid = React.createClass({
    render: function(){
        var createCard = function(story, index) {
            return <NewsCard story={story} key={index}/>
        };
        return (
            <div className="newsGrid">
                {this.props.stories.map(createCard)}
            </div>
        );
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
        <NewsGrid stories={stories} />,
        document.querySelector("body")
    );
});
ipc.send('getNews-msg', 'ping');
