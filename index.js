/* A quick and dirty Nodejs application to highlight html code blocks
 *
 * uses highlight.js and expects the html to fairly strict
 *
 * Rob 2022-04-10
 *
 */
"use strict";

const fs = require('fs');
const hljs = require('highlight.js');

function replaceCodeForHighlight(match, source) {
  var result = null;
  var target = match[1];
  var destination = hljs.highlightAuto(target).value;
  //console.log('target' + target);
  //console.log('destination' + destination);
  var pattern = new RegExp(match[0], 's');
  result = source.replace(pattern, '<code class="nohighlight">' + destination + '</code>')
  //console.log('result' + result);
  return result;
}

function highlightCode(html) {
  const pattern = /<code>([^<]+?)<\/code>/sg
  var match = null;
  var source = html;
  while(match = pattern.exec(html)){
    source = replaceCodeForHighlight(match, source);
  }
  console.log(source);
}

function processFile(fn) {
  //console.log('processing');
  fs.readFile(fn, 'utf8', function (err, data) {
    if (err) {
      console.log("Cannot load[" + fn + "] " + err); 
      exit(2);
    } else {
      //console.log('data loaded');
      highlightCode(data);
    }
  });
}

if (process.argv.length > 2) {
  let inputFn = process.argv[2];
  //console.log('Opening file "' + inputFn + '"');
  processFile(inputFn);
} else {
  console.log('Filename not provided');
  exit(1);
}

