var url;
$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
    urlOrigin = url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1]
    document.getElementById('quote_title').value = tab.title;
    document.getElementById('quote_date').innerHTML = new Date();
  });

  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    }, function(selection) {
    if(selection) document.getElementById('quote_body').value = selection[0];
  });
});
