var query = { active: true, currentWindow: true };

document.addEventListener("DOMContentLoaded", function () {
  var patternsButton = document.getElementById("patternsButton");
  chrome.storage.local.set({ patternsNumb: undefined }, function () {});
  chrome.storage.local.set({ types: undefined }, function () {});
  patternsButton.addEventListener(
    "click",
    async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {},
      });
      setTimeout(function () {
        chrome.storage.local.get("DP_COUNT", function (DPDATA) {
          const count = DPDATA.DP_COUNT;
          chrome.storage.local.get("inProgress", function (data) {
            hadleDpCount(count, data);
          });
        });
      }, 200);
    },
    false
  );

  function hadleDpCount(count, data) {
    if (data.inProgress === "true") {
      document.getElementById(
        "content"
      ).innerHTML = `<div class="totalWrapper"><div class="green"><span>Analyzing the Website </span></div><div id="dp-count-id"><b>${count}</b>  DP found So far!! </div> <div>  Please wait... </div><div></div></div></div>`;
    } else {
      if (count > 0) {
        document.getElementById(
          "content"
        ).innerHTML = `<div id="patternsFound"></div><div id="patternsTypes"></div>`;
        document.getElementById(
          "patternsFound"
        ).innerHTML = `<div class="totalWrapper"><div class="inline-block-child totalText"><b>Total</b> dark patterns found:</div><div class="inline-block-child"><input class="error" id="another" value=${count} disabled/></div></div>`;
      } else {
        document.getElementById("content").innerHTML =
          '<div class="totalWrapper"><div class="green"><span>Great news!</span></div><h3>No any known dark patterns found on this page. </h3></div></div>';
      }
    }
  }

  var settingsButton = document.getElementById("setting");
  settingsButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    setTimeout(function () {
      document.getElementById("content").innerHTML =
        '<div>Pattern detection mode:</div><div id="settingWrapper"></div>';
      document.getElementById(
        "settingWrapper"
      ).innerHTML = `<select><option>High Sensitivity</option><option>Moderate Sensitivity</option><option>Low Sensitivity</option></select><div id="saveSet"></div>
      <div class="DP-SELECTS" id="DP-SELECTS">
        <div><label for="">Urgency</label><input type="checkbox" name="" id="DP-select1"></div>
        <div><label for="">Not Dark Pattern</label><input type="checkbox" name="" id="DP-select2"></div>
        <div><label for="">Scarcity</label><input type="checkbox" name="" id="DP-select3"></div>
        <div><label for="">Misdirection</label><input type="checkbox" name="" id="DP-select4"></div>
        <div><label for="">Social Proof</label><input type="checkbox" name="" id="DP-select5"></div>
        <div><label for="">Obstruction</label><input type="checkbox" name="" id="DP-select6"></div>
        <div><label for="">Sneaking</label><input type="checkbox" name="" id="DP-select7"></div>
        <div><label for="">Forced Action</label><input type="checkbox" name="" id="DP-select8"></div>
      </div>`;
      document.getElementById("saveSet").innerHTML =
        "<button>Save</button><button>Apply</button>";
    });
  });
});

function setIconText(value) {
  chrome.runtime.sendMessage({
    action: "updateIcon",
    value: value,
  });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateDpCount") {
    const countDiv = document.getElementById("dp-count-id");
    if (!countDiv) return;
    countDiv.innerHTML = `<b>${msg.count}</b> DP found So far!!`;
  }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "scanningComplete") {
    chrome.storage.local.get("DP_COUNT", function (DPDATA) {
      const count = DPDATA.DP_COUNT;
      chrome.storage.local.get("inProgress", function (data) {
        hadleDpCount(count, data);
      });
    });
  }
});
//Open up link from popup
document.addEventListener('DOMContentLoaded', function () {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    (function () {
      var ln = links[i];
      var location = ln.href;
      ln.onclick = function () {
        chrome.tabs.create({ active: true, url: location });
      };
    })();
  }
});
