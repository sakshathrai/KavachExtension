chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "tab_updated") {
      document.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
          const link = event.target.href;
          const currentDomain = window.location.hostname;
  
          try {
            const linkDomain = new URL(link).hostname;
            if (currentDomain !== linkDomain) {
              const confirmation = confirm(`This link will redirect to ${linkDomain}. Do you want to proceed?`);
              if (!confirmation) {
                event.preventDefault(); 
              }
            }
          } catch (error) {
            console.error("Error processing link:", error);
          }
        }
      });
    }
  });
