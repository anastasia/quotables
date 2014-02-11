var highlighted, url, title;
$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
    title = tab.title;
    d = new Date();
    // date = d.getDate() + " " + d.getMonth() + 1 + " " + d.getFullYear() + ''; // format later
    document.getElementById('quoteTitle').value = title;
    document.getElementById('quoteDate').innerHTML = d;
    console.log(d)
    // var text = tab.getSelection().baseNode
  });

  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    if(selection){
      highlighted = selection[0];
      document.getElementById('quoteBody').value = highlighted;
      console.log(highlighted)
    }
  });

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    // if (request.method === 'saveQuote')
    //   // sendResponse({result: db.getGetUserList()});
    // // else if (request.method === 'GetUser')
    //   // sendResponse({result: db.getGetUser(request.username)});
    // else
    //   console.log("nooo"); // snub them.
    // })
  });

  // $('#quoteTags').on('')

});