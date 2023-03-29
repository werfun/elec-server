const autoupdater = require('electron-windows-inno-installer');

autoupdater.setFeedURL('http://127.0.0.1:3001/releases.json');

autoupdater.on('update-downloaded', function(releasefileJSON, fullpath){
  console.log('release notes: ', releasefileJSON.changelog)
  console.log('write to :', fullpath);
  autoupdater.quitAndInstall(); // Upgrade
});

autoupdater.on('update-not-available', function(){
  console.log('INFO: Update not available');
});

autoupdater.on('update-available',function(releasefileJSON,next){
  console.log('INFO: Update available', releasefileJSON);
  next(); //will be download
});

autoupdater.on('progress', function(progress){
  console.log(progress);  // download progress
});