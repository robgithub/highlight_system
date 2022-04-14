/* A quick and dirty Nodejs application to highlight html code blocks
 *
 * uses highlight.js and expects the html to fairly strict
 *
 * overwrites filename
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
  return source;
}

function writeFile(fn, content) {
  fs.writeFile(fn, content, err => {
    if (err) {
      console.error(err)
      return false
    }
    return true
  })
}


function processFile(fn) {
  //console.log('processing');
  var result = null;
  fs.readFile(fn, 'utf8', function (err, data) {
    if (err) {
      console.error("Cannot load[" + fn + "] " + err); 
      exit(2);
    } else {
      //console.log('data loaded');
      result = highlightCode(data);
      if (result) {
        return writeFile(fn, result);
      } else {
        console.error(result + 'result falsy, no data written to file');
        return false
      }
    }
  });
}

if (process.argv.length > 2) {
  let inputFn = process.argv[2];
  //console.log('Opening file "' + inputFn + '"');
  var ok = processFile(inputFn);
  // readFile is is async, so do not expect to get a return value
} else {
  console.error('Filename not provided');
  exit(1);
}

