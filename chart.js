
// require file system and jsdom
var fs = require('fs');
var jsdom = require('jsdom').jsdom;

// create default jsdom view
var d = jsdom('<body><div id="container"></div></body>');
var w = d.defaultView;

// require anychart and anychart export modules
var anychart = require('anychart')(w);
var anychartExport = require('anychart-nodejs')(anychart);

// create and a chart to the jsdom defaultView
var chart = anychart.pie([10, 20, 7, 18, 30]);
chart.container('container');
chart.bounds(0, 0, 800, 600);
chart.draw();

// generate JPG image and save it to a file
anychartExport.exportTo(chart, 'jpg').then(function(image) {
  fs.writeFile('anychart.jpg', image, function(fsWriteError) {
    if (fsWriteError) {
      console.log(fsWriteError.message);
    } else {
      console.log('Complete');
    }
    process.exit(0);
  });
}, function(generationError) {
  console.log(generationError.message);
  process.exit(1);
});