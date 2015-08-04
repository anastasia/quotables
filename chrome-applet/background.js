
var highlighted, url, title;
$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
    title = tab.title;
    d = new Date();

    document.getElementById('quoteTitle').value = title;
    document.getElementById('quoteDate').innerHTML = d;


    // var text = tab.getSelection().baseNode
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
  });

  // chrome.tabs.executeScript( {
  //   code: "window.getSelection().toString();"
  //   }, function(selection) {
  //   if(selection){
  //     highlighted = selection[0];
  //     document.getElementById('quoteBody').value = highlighted;
  //     console.log(highlighted)
  //   }
  // });
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){

  });

  //
  // chrome.app.runtime.onLaunched.addListener(function() {
  //   chrome.app.window.create('verser.html', {
  //     'outerBounds': {
  //       'width': 400,
  //       'height': 500
  //     }
  //   });
  // });




});
