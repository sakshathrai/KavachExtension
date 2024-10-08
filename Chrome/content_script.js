let found = false;
const DP_CATAGORY = [
  "Urgency",
  "Not Dark Pattern",
  "Scarcity",
  "Misdirection",
  "Social Proof",
  "Obstruction",
  "Sneaking",
  "Forced Action",
];
var DP_COUNT = 0;

chrome.runtime.sendMessage({ action: "openPopup" });

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
  }
});

window.onload = async function () {
  const style = document.createElement("style");
  style.textContent = `

  .DP-POP-UP{
    display: block !important;
  }

  .DP-POP-UP.hide-popover{
    visibility: hidden !important;
    display: none !important;
  }

  `;
  initModelRequest();
  document.head.appendChild(style);
  document.onchange = () => initModelRequest();
};

async function initModelRequest() {
  DP_COUNT = 0; // initialize the DP count
  chrome.storage.local.set({ DP_COUNT: 0 }, function () {}); // updating Dark Pattern COUNT
  chrome.storage.local.set({ inProgress: "true" }, function () {});

  // get all the DOM content one by one and send for analyzing text
  const divContents = document.querySelectorAll("div");
  await handleArrayRequest(divContents, "div");
  const spanContents = document.querySelectorAll("span");
  await handleArrayRequest(spanContents, "span");
  const pContents = document.querySelectorAll("p");
  await handleArrayRequest(pContents, "p");
  const labelContents = document.querySelectorAll("label");
  await handleArrayRequest(labelContents, "label");
  const h1Contents = document.querySelectorAll("h1");
  await handleArrayRequest(h1Contents, "h1");
  const h2Contents = document.querySelectorAll("h2");
  await handleArrayRequest(h2Contents, "h2");
  const h3Contents = document.querySelectorAll("h3");
  await handleArrayRequest(h3Contents, "h3");
  const h4Contents = document.querySelectorAll("h4");
  await handleArrayRequest(h4Contents, "h4");
  const h5Contents = document.querySelectorAll("h5");
  await handleArrayRequest(h5Contents, "h5");
  const h6Contents = document.querySelectorAll("h6");
  await handleArrayRequest(h6Contents, "h6");
  chrome.storage.local.set({ inProgress: "false" }, function () {});
  chrome.runtime.sendMessage({
    action: "scanningComplete",
  });
}

// formates Nodelist for API request
// select dom elements that have valid text
function getValidArrayOfContent(ArrayOfElement) {
  if (!ArrayOfElement || !ArrayOfElement.length) return {};
  const validArrayOfContent = [];
  for (let i = 0; i < ArrayOfElement.length; i++) {
    const nodeValue = ArrayOfElement[i].firstChild?.nodeValue;
    if (!nodeValue) continue;
    const nodeContent = nodeValue.trim();
    if (!nodeContent.length) continue;
    validArrayOfContent.push({ _id: i, text: nodeContent }); // using index as uique id
  }
  // alert(validArrayOfContent.length);
  return validArrayOfContent;
}

// handeling response for each request
function handleModelResponse(domElement, label, score, type, _id) {
  if (score < 0.9 || label === 1 || !domElement) return;
  DP_COUNT++;
  chrome.storage.local.set({ DP_COUNT }, function () {}); // updating Dark Pattern COUNT
  chrome.runtime.sendMessage({
    action: "updateDpCount",
    count: DP_COUNT,
  });
  // alert(domElement.textContent);

  let domElementid = domElement.id;
  if (!domElementid) {
    domElement.id = `ANCHOR-DP-${type}-${_id}`;
    domElementid = domElement.id;
  }
  domElement.style.border = "4px solid #726C94";
  domElement.style.borderRadius = "5px";
  domElement.style.backgroundColor = "yellow";

  const domElementBound = domElement.getBoundingClientRect();

  const popUpDiv = document.createElement("div");
  popUpDiv.id = `${domElementid}-pop`;
  popUpDiv.classList.add("hide-popover");
  popUpDiv.classList.add("DP-POP-UP");

  popUpDiv.style.position = "fixed";
  popUpDiv.style.top = domElementBound.top + window.scrollY + "px";
  popUpDiv.style.left = domElementBound.right + window.scrollX + "px";
  popUpDiv.style.display = "none";
  popUpDiv.style.backgroundColor = "#000";
  popUpDiv.style.color = "#fff";
  document.body.appendChild(popUpDiv);

  const cancelDiv = document.createElement("div");
  cancelDiv.textContent = "X";
  cancelDiv.style.backgroundColor = "red";

  popUpDiv.innerHTML = `<div style="display:flex;flex-direction:column;"><div>option 1</div><div>option 2</div></div> `;

  domElement.addEventListener("mouseover", toggleOptions);
  cancelDiv.addEventListener("click", toggleOptions);
  popUpDiv.appendChild(cancelDiv);

  function toggleOptions(e) {
    popUpDiv.classList.toggle("hide-popover");
  }
}

function getChunckOfArray(validArrayOfContent, chunkSize) {
  const result = [];
  if (validArrayOfContent.length <= 50) {
    result.push(validArrayOfContent);
    return result;
  }
  for (let i = 0; i < validArrayOfContent.length; i += chunkSize) {
    result.push(validArrayOfContent.slice(i, i + chunkSize));
  }
  return result;
}

// handles text request to model
async function handleArrayRequest(ArrayOfElement, type) {
  const validArrayOfContent = getValidArrayOfContent(ArrayOfElement);
  if (!validArrayOfContent || !validArrayOfContent.length) return;

  const chunkOfArrays = getChunckOfArray(validArrayOfContent, 50);
  for (let i = 0; i < chunkOfArrays.length; i++) {
    const arrayOfContent = chunkOfArrays[i];
    const data = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: [...arrayOfContent],
        category: [0, 2, 3, 4, 5, 6, 7],
      }),
    });

    const jsonDATA = await data.json();
    // alert(JSON.stringify(jsonDATA));
    const modelResults = jsonDATA;
    if (!modelResults) return;
    for (let i = 0; i < modelResults.length; i++) {
      handleModelResponse(
        ArrayOfElement[parseInt(modelResults[i]._id)],
        modelResults[i].label,
        modelResults[i].score,
        type,
        modelResults[i]._id
      );
    }
  }
}
