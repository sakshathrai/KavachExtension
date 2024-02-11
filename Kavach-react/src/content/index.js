import { runtime } from "webextension-polyfill";
import {
  getAllowedPatterns,
  getAutoScanPermit,
  getDpCount,
  setAutoScanPermit,
  setDpCount,
  setDpPatternCount,
} from "../helper/storage";

let DP_COUNT = null;

const DARK_PATTERNS = {
  0: "Urgency",
  1: "Not Dark Pattern",
  2: "Scarcity",
  3: "Misdirection",
  4: "Social Proof",
  5: "Obstruction",
  6: "Sneaking",
  7: "Forced Action",
};

let DARK_PATTERNS_COUNT = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
};

let allowedPatterns = [0, 2, 3, 4, 5, 6, 7];

setAutoScanPermit("Allow");
setDpCount(0);
setDpPatternCount(DARK_PATTERNS_COUNT);

window.onload = () => {
  handleStartScan();
  document.addEventListener("change", handleStartScan);
};
runtime.onMessage.addListener(async (message) => {
  if (message.to === "content") {
    // console.log("reached-au");

    switch (message.action) {
      case "tabActivated": {
        DP_COUNT = 0;
        break;
      }

      case "start-scanning": {
        initModelRequest();
        break;
      }

      case "set-auto-scan-permit": {
        setAutoScanPermit(message.permit);
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
.DP-POP-UP.hide-popover,
.report-form.hide-popover{
  visibility: hidden !important;
  display: none !important;
}

.--dp-drop-down{
  animation: dropdown 0.5s ease forwards;
  opacity: 0;
  width: 150px;
  background-color: #111827;
  color: #fff;
  font-weight: 400;
  border-radius: 3px;
  padding: 5px;
}

.--dp-drop-down div{
  cursor: pointer;
  border-radius: 3px;
  padding: 5px;
}

.--dp-drop-down div:hover{
  background-color: #1f2937;
  transition: 200ms ease;
}

@keyframes dropdown {
        0% {
            transform: translateY(-30%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
  
@keyframes moveDottedBorder {
    0% {
        border-width: 2px; 
    }
    100% {
        border-width: 10px;
    }
}

.report-form{
  position: absolute;
  top: 98%; 
  left: 90%;
  width: 500px;
  background-color: #111827;
  color: #fff;
  font-weight: 400;
  border-radius: 3px;
  padding: 5px;
}

.report-issue{
  position: relative;
}

.feedbackSection{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.inputSection{
  display: flex;
  flex-direction: column;
  gap: 4%;
  padding: 10px;
}

.feedbackTextarea{
  overflow-y: hidden;
  // height : 90px;
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
  }
}
async function initModelRequest() {
  DP_COUNT = await getDpCount(); // initialize the DP count

  runtime.sendMessage({
    to: "popup",
    action: "Scanning",
    count: DP_COUNT,
  });

  if (DP_COUNT !== null) {
    runtime.sendMessage({
      to: "background",
      action: "updateBadgeText",
      count: DP_COUNT,
    });
  }

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
async function handleModelResponse(domElement, label, score, type, _id) {
  if (score < 0.9 || label === 1 || !domElement) return;
  DP_COUNT++;
  await setDpCount(DP_COUNT); // updating Dark Pattern COUNT

  DARK_PATTERNS_COUNT = {
    ...DARK_PATTERNS_COUNT,
    [label]: DARK_PATTERNS_COUNT[label] + 1,
  };
  // console.log(JSON.stringify(DARK_PATTERNS_COUNT));
  await setDpPatternCount(DARK_PATTERNS_COUNT);

  runtime.sendMessage({
    to: "popup",
    action: "increment-count",
    count: DP_COUNT,
    DARK_PATTERNS_COUNT,
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
  domElement.style.border = "3px solid #e11d48";
  domElement.style.backgroundColor = "#f59e0b";

  const popUpDiv = document.createElement("div");
  popUpDiv.id = `${domElementid}-pop`;
  popUpDiv.classList.add("hide-popover");
  popUpDiv.classList.add("DP-POP-UP");

  popUpDiv.style.position = "absolute";
  popUpDiv.style.display = "none";
  popUpDiv.classList.add("--dp-pop-up-container");

  const dropDown = document.createElement("div");
  dropDown.style.display = "flex";
  dropDown.style.flexDirection = "column";
  dropDown.classList.add("--dp-drop-down");
  dropDown.innerHTML = `<div>Type: ${DARK_PATTERNS[label]}</div>`;

  const reportIssue = document.createElement("div");
  reportIssue.textContent = "Report issue";

  const reportForm = document.createElement("div");
  const reportFormContent = document.createElement("div");

  const feedbackSection = document.createElement("div");
  feedbackSection.classList.add("feedbackSection");

  const feedbackTitle = document.createElement("div");
  feedbackTitle.classList.add("feedbackTitle");
  feedbackTitle.textContent = "Provide additional feedback";

  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "X";

  feedbackSection.appendChild(feedbackTitle);
  feedbackSection.appendChild(closeButton);

  const inputSection = document.createElement("div");
  inputSection.classList.add("inputSection");

  const feedbackTextarea = document.createElement("textarea");
  feedbackTextarea.classList.add("feedbackTextarea");

  const harmfulCheckbox = document.createElement("input");
  harmfulCheckbox.setAttribute("type", "checkbox");
  const harmfulLabel = document.createElement("label");
  harmfulLabel.textContent = "This is harmful / unsafe";
  harmfulLabel.appendChild(harmfulCheckbox);

  const notTrueCheckbox = document.createElement("input");
  notTrueCheckbox.setAttribute("type", "checkbox");
  const notTrueLabel = document.createElement("label");
  notTrueLabel.textContent = "This isn't true";
  notTrueLabel.appendChild(notTrueCheckbox);

  const notHelpfulCheckbox = document.createElement("input");
  notHelpfulCheckbox.setAttribute("type", "checkbox");
  const notHelpfulLabel = document.createElement("label");
  notHelpfulLabel.textContent = "This isn't helpful";
  notHelpfulLabel.appendChild(notHelpfulCheckbox);

  inputSection.appendChild(feedbackTextarea);
  inputSection.appendChild(harmfulLabel);
  inputSection.appendChild(document.createElement("br"));
  inputSection.appendChild(notTrueLabel);
  inputSection.appendChild(document.createElement("br"));
  inputSection.appendChild(notHelpfulLabel);

  const submitSection = document.createElement("div");
  submitSection.classList.add("submitSection");

  const submitButton = document.createElement("button");
  submitButton.classList.add("submitButton");
  submitButton.textContent = "Submit form";

  submitSection.appendChild(submitButton);

  reportFormContent.appendChild(feedbackSection);
  reportFormContent.appendChild(inputSection);
  reportFormContent.appendChild(submitSection);

  reportForm.appendChild(reportFormContent);

  reportForm.classList.add("report-form");
  reportForm.classList.add("hide-popover");
  reportIssue.classList.add("report-issue");

  reportIssue.appendChild(reportForm);
  dropDown.appendChild(reportIssue);
  popUpDiv.appendChild(dropDown);
  document.body.appendChild(popUpDiv);

  closeButton.addEventListener("click", hideForm);

  submitButton.addEventListener("click", hideForm);

  reportIssue.addEventListener("click", hideForm);

  function hideForm() {
    reportForm.classList.toggle("hide-popover");
  }

  domElement.addEventListener("mouseover", handelPatternHover);

  function handelPatternHover(e) {
    handleMouseOver(e, domElement, popUpDiv, handelPatternHover);
  }
}

function handleMouseOver(e, domElement, popUpDiv, handelPatternHover) {
  const mouseX = e.clientX + window.scrollX;
  const mouseY = e.clientY + window.scrollY;

  popUpDiv.style.left = mouseX + 5 + "px";
  popUpDiv.style.top = mouseY + 5 + "px";
  popUpDiv.classList.remove("hide-popover");

  domElement.removeEventListener("mouseover", handelPatternHover);

  popUpDiv.addEventListener("mouseleave", () => {
    domElement.addEventListener("mouseover", handelPatternHover);
    handleMouseLeave(popUpDiv, domElement, handelPatternHover);
  });
}

function handleMouseLeave(popUpDiv) {
  popUpDiv.classList.add("hide-popover");
  popUpDiv.removeEventListener("mouseleave", handleMouseLeave);
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
    allowedPatterns = await getAllowedPatterns();
    const data = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: [...arrayOfContent],
        category: [...allowedPatterns],
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
