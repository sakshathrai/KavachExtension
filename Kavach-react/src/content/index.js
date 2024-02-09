import { runtime, storage, action } from "webextension-polyfill";
import {
  getAutoScanPermit,
  getDpCount,
  setAutoScanPermit,
  setDpCount,
} from "../helper/storage";
let DP_COUNT = 0;

window.onload = () => {
  handleStartScan();
};
runtime.onMessage.addListener(async (message) => {
  if (message.to === "content") {
    switch (message.action) {
      case "tabActivated": {
        DP_COUNT = 0;
        break;
      }

      case "start-scanning": {
        initModelRequest();
        break;
      }

      case "auto-scan-permit": {
        setAutoScanPermit(message.permit);
        if (message.permit === "not-allowed") {
          document.removeEventListener("change", initModelRequest);
        }
        break;
      }

      default: {
        console.log("Unknown Message");
      }
    }
  }
});

function updateStyle() {
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
  document.head.appendChild(style);
}

async function handleStartScan() {
  updateStyle();
  const autoScanPermit = await getAutoScanPermit();
  console.log(autoScanPermit);
  if (autoScanPermit === "Allow") {
    initModelRequest();
    document.addEventListener("change", initModelRequest);
  }
}
async function initModelRequest() {
  DP_COUNT = await getDpCount(); // initialize the DP count

  runtime.sendMessage({
    to: "popup",
    action: "Scanning",
    count: DP_COUNT,
  });

  runtime.sendMessage({
    to: "background",
    action: "updateBadgeText",
    count: DP_COUNT,
  });

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
  runtime.sendMessage({
    to: "popup",
    action: "Scanning-Complete",
    count: DP_COUNT,
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
  setDpCount(DP_COUNT); // updating Dark Pattern COUNT

  runtime.sendMessage({
    to: "popup",
    action: "increment-count",
    count: DP_COUNT,
  });

  runtime.sendMessage({
    to: "background",
    action: "updateBadgeText",
    count: DP_COUNT,
  });

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

// initContentScript();
console.log("[content] loaded ");
