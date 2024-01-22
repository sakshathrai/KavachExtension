chrome.runtime.onMessage.addListener((message) => {
    document.getElementById("parsed-text").textContent = message.formattedText;
  });
  