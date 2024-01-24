const text = document.querySelectorAll(
  "h2, h3, h4, h5, label, p"
);

let found = false;

let tabUrl = "";

chrome.runtime.onMessage.addListener(function (response, sendResponse) {
  if (response) {
    chrome.storage.local.get("highlightAds", function (data) {
      if (data.highlightAds) {
        chrome.storage.local.get("url", function (data) {
          if (data.url.match("https://www.google.*?")) {
            for (let i = 0; i < text.length; i++) {
              const googleAds = document.querySelectorAll(
                ".jpu5Q.VqFMTc.p8AiDd"
              );
              for (let i = 0; i < googleAds.length; i++) {
                googleAds[i].style.color = "green";
              }
            }
          }
        });
      }
    });
    setIconText(false);
  }
});

window.onload = function () {
  chrome.storage.local.get("url", function (data) {
    if (data.url.match("https://www.google.*?")) {
      for (let i = 0; i < text.length; i++) {
        const googleAds = document.querySelectorAll(".jpu5Q.VqFMTc.p8AiDd");
        for (let i = 0; i < googleAds.length; i++) {
          googleAds[i].style.color = "green";
        }
      }
    } else {
    }
  });
  for (let i = 0; i < text.length; i++) {
    const url = chrome.runtime.getURL("./data.json");
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        for (const [key, value] of Object.entries(json.patterns)) {
          if (text[i].innerHTML.match(value.regex)) {
            text[i].style.border = "4px solid #726C94";
            text[i].style.borderRadius = "5px";
            setIconText(true);
          }
        }
      });
    const timers = document.querySelectorAll(".time-wrap, .countdown, .clock");
    for (let i = 0; i < timers.length; i++) {
      timers[i].style.border = "4px solid #726C94";
      text[i].style.borderRadius = "5px";
      setIconText(true);
    }
    const infoBadges = document.querySelectorAll(".info-badge");
    for (let i = 0; i < infoBadges.length; i++) {
      infoBadges[i].style.border = "4px solid #726C94";
      text[i].style.borderRadius = "5px";
      setIconText(true);
    }
  }
};

// for(let i=0; i< text.length; i++) {
//     console.log('222');
//     if(text[i].innerHTML.includes('Per savaitę prekė peržiūrėta')) {
//         text[i].innerHTML = text[i].innerHTML.replace('Per savaitę prekė peržiūrėta', 'WOOHOO');
//         setIconText(true);
//     }
//     if (text[i].innerHTML.includes('šiuo metu domisi')) {
//         text[i].innerHTML = text[i].innerHTML.replace('šiuo metu domisi', 'HERE');
//         setIconText(true);
//     }
//     if (text[i].innerHTML.includes('Paskutinį kartą užsakyta prieš')) {
//         text[i].innerHTML = text[i].innerHTML.replace('Paskutinį kartą užsakyta prieš', 'NOO');
//         setIconText(true);
//     }
//     //Paskutinį kartą užsakyta prieš
// }

function setIconText(value) {
  chrome.runtime.sendMessage({
    action: "updateIcon",
    value: value,
  });
}
