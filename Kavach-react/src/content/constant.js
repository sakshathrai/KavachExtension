export const CONTENT_CSS = `
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
