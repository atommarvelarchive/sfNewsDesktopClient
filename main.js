var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var request = require('request');
var news = null;
var newsURL = "http://localhost:5000/";
var getStoryText = require('./storyText');

function giveNews(){
    ipc.on('getNews-msg', function(event, arg) {
      console.log("news");
      event.sender.send('getNews-reply', JSON.stringify(news));
    });
}

function giveStory(){
    ipc.on('getStory-msg', function(event, arg){
        console.log("story");
        getStoryText(arg, function(story){
            console.log("send back");
            console.log("story: "+story);
            event.sender.send('getStory-reply', story);
        });
    });
}

getNews();
giveStory();

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    
});

function getNews(){
    request(newsURL, function(error, response, json){
        news = JSON.parse(json);
        giveNews();
        createWindow();
    });
}

function createWindow(){
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}
