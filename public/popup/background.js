var highlighted, url, title;
$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
    title = tab.title;
    d = new Date();
    // date = d.getDate() + " " + d.getMonth() + 1 + " " + d.getFullYear() + ''; // format later
    document.getElementById('quoteTitle').value = title;
    document.getElementById('quoteDate').innerHTML = d;
    // var text = tab.getSelection().baseNode
  });

  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    }, function(selection) {
    if(selection){
      highlighted = selection[0];
      document.getElementById('quoteBody').value = highlighted;
    }
  });

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){

  });

});