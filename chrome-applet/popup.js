var user = {}
function onPageDetailsReceived(pageDetails)  {
    document.getElementById('title').value   = pageDetails.title;
    document.getElementById('url').value     = pageDetails.url;
    document.getElementById('summary').value = pageDetails.body;
}

var statusDisplay = null;
function getTagsArray(tagString) {
  if (!tagString) {
    return [];
  }
  return tagString.split(/[\s,]+/);

}
function addBookmark() {
    event.preventDefault();

    var postUrl = 'http://localhost:8000/quotes/new';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);

    var title   = encodeURIComponent(document.getElementById('title').value);
    var url     = encodeURIComponent(document.getElementById('url').value);
    var summary = encodeURIComponent(document.getElementById('summary').value);
    var tags    = getTagsArray(encodeURIComponent(document.getElementById('tags').value));
    var params = '_id=' + user._id +
                 '&title=' + title +
                 '&url=' + url +
                 '&body=' + summary +
                 '&tags=' + tags;

    params = params.replace(/%20/g, '+');

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        statusDisplay.innerHTML = '';
        if (xhr.status == 200) {
          statusDisplay.innerHTML = 'Saved!';
          window.setTimeout(window.close, 1000);
        } else {
          statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
        }
      }
    };

    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

window.addEventListener('load', function(evt) {
  var getUrl = 'http://localhost:8000/session';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', getUrl, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      statusDisplay.innerHTML = '';
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.responseText)
        user.email = response.email;
        user._id  = response._id;
      } else {
        window.location.href = "http://localhost:8000/login"
        console.log("error",xhr.responseText);
        document.getElementById("signin")
      }
    }
  };


  xhr.send();

  statusDisplay = document.getElementById('status-display');
  document.getElementById('addbookmark').addEventListener('submit', addBookmark);
  chrome.runtime.getBackgroundPage(function(eventPage) {
    eventPage.getPageDetails(onPageDetailsReceived);
  });
});
