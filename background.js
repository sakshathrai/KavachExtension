chrome.runtime.onMessage.addListener((message) => {
    // Format the text 
    const formattedText = `Parsed text from webpage:\n\n${message.text.replace(/\s+/g, " ")}`;
  
    // Send the formatted text to the popup script
    chrome.runtime.sendMessage({ formattedText });
  });
  