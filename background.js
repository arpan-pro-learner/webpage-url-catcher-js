let urls = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "detect-urls") {
    const { pageUrls } = request;
    urls = urls.concat(pageUrls);
    sendResponse({ success: true });
  } else if (request.type === "get-urls") {
    sendResponse({ urls });
  } else if (request.type === "clear-urls") {
    urls = [];
  }
});
