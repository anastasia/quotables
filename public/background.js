var highlighted;
$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    var url = (tab.url);
    var title = (tab.title)
    // var text = tab.getSelection().baseNode
    console.log(tab)
  })
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    if(selection){
      highlighted = selection[0];
      console.log(highlighted)
    }
  });
   // $("#form").submit(function() {
   //    console.log("SUBMITTING")
   //  });

  // chrome.extension.onRequest.addListener(function(request, sender, sendResponse{
  //   if (request.method == 'GetUserList')
  //     sendResponse({result: db.getGetUserList()});
  //   else if (request.method == 'GetUser')
  //     sendResponse({result: db.getGetUser(request.username)});
  //   else
  //     sendResponse({}); // snub them.
  //   })

  // });
});