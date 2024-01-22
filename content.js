(function() {
    // Get all text from the document
    const allText = document.documentElement.textContent;
  
    // Send the text to the background script for formatting and display
    chrome.runtime.sendMessage({ text: allText });
  })();
  