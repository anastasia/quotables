var highlighted, url, title;
$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
    urlOrigin = url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1]
    title = tab.title;
    d = new Date();
    document.getElementById('quoteTitle').value = title;
    document.getElementById('quoteDate').innerHTML = d;
  });

  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    }, function(selection) {
    if(selection){
      highlighted = selection[0];
      document.getElementById('quoteBody').value = highlighted;
    }
  });
});
