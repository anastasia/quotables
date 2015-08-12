function getPageDetails(callback) {
  chrome.tabs.executeScript(null, { file: 'getselection.js' });
  chrome.runtime.onMessage.addListener(function(message)  {
    callback(message);
  });
};
