const options = {};

// Initialize the form with the user's option settings
chrome.storage.sync.get("options", (data) => {
  Object.assign(options, data.options);
  optionsForm.debug.checked = Boolean(options.ads);
});

// Immediately persist options changes
optionsForm.ads.addEventListener("change", (event) => {
  options.ads = event.target.checked;
  chrome.storage.sync.set({ options });
});
