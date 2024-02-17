chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "tab_updated") {
    document.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        const link = event.target.href;
        const linkText = event.target.textContent.trim();
        const currentDomain = window.location.hostname;
        const linkDomain = new URL(link).hostname;

        if (currentDomain !== linkDomain) {
          const confirmation = confirm(
            `This link "${linkText}" will redirect to ${linkDomain}.\n\nDo you want to proceed?`
          );

          if (!confirmation) {
            event.preventDefault(); // Prevent the default link behavior
          }
        }
      }
    });
  }
});
