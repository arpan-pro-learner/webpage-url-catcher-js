window.onload = function () {
  const urlList = document.getElementById("url-list");
  document
    .getElementById("clear-button")
    .addEventListener("click", function () {
      chrome.runtime.sendMessage({ type: "clear-urls" });
      const urlList = document.getElementById("url-list");
      while (urlList.firstChild) {
        urlList.removeChild(urlList.firstChild);
      }
    });

  // Request the current list of URLs from the background script
  chrome.runtime.sendMessage({ type: "get-urls" }, function (response) {
    if (!response) {
      console.error("No response received from background script");
      return;
    }

    const { urls } = response;

    // Update the URL list in the popup
    urls.forEach((url) => {
      const listItem = document.createElement("li");
      listItem.textContent = url;
      urlList.appendChild(listItem);
    });
  });

  // Send a message to the content script to detect URLs on the current page
  chrome.runtime.sendMessage(
    {
      type: "detect-urls",
      pageUrls: Array.from(document.getElementsByTagName("iframe"))
        .map((iframe) => iframe.src)
        .filter((url) => !!url),
    },
    function (response) {
      if (!response) {
        console.error("No response received from background script");
        return;
      }
    }
  );
};
