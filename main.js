var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var request = require('request');
var news = null;
var newsURL = "http://localhost:5000/";
var cleanSite = require('./cleanSite.js');
var storyWindows = {};

function giveNews(){
    ipc.on('getNews-msg', function(event, arg) {
      console.log("news");
      event.sender.send('getNews-reply', JSON.stringify(news));
    });
}

function displayStory(){
    ipc.on('displayStory-msg', function(event, arg){
        console.log("story");
        var size = mainWindow.getSize();
        var pos = mainWindow.getPosition();
        var storyWindow = new BrowserWindow({preload: __dirname+"/clean.js", width: size[0], height: size[1], x:pos[0], y:pos[1], show: true});
        storyWindow.loadUrl(arg);
        //storyWindow.openDevTools();
        storyWindows[storyWindow.id] = (storyWindow);
        storyWindow.on('closed', delWindow.bind(this, storyWindows, storyWindow.id))
        //cleanSite(storyWindow);
        storyWindow.webContents.on('did-finish-load', function() {
            //cleanSite(storyWindow);
            //setTimeout(showWindow.bind(this,storyWindow), 200);
        });
    });
}

function delWindow(map, id){
    map[id] = null;
    delete map[id];
}

function showWindow(window){
    window.show();
}

function openStory(){
}

ipc.on('log', function(event, msg){
    console.log("[window]: "+msg);
});

getNews();
displayStory();

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
