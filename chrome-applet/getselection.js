chrome.runtime.sendMessage({
  'title' : document.title,
  'url'   : window.location.href,
  'body'  : window.getSelection().toString()
});
