window.onload = function () {
  chrome.runtime.sendMessage(
    {
      type: "detect-urls",
      pageUrls: Array.from(document.getElementsByTagName("a"))
        .map((link) => link.href)
        .filter((url) => !!url)
        .concat(Array.from(document.getElementsByTagName("iframe"))
        .map((iframe) => iframe.src)
        .filter((url) => !!url)),
    },
    function (response) {
      if (!response) {
        console.error("No response received from background script");
        return;
      }
    }
  );
};
