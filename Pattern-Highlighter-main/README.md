Features
Automatically detects dark patterns on web pages
Highlights suspicious elements with minimal impact on page appearance
Popup window provides information on detected dark patterns, including their category and explanation
Does not block web page content
Extension icon displays the number of detected dark patterns
Function to individually highlight each detected dark pattern
Supports multiple languages (currently English and German)
How it works
The Pattern Highlighter works locally in the browser, not connecting to any servers. It injects a small script into web pages, creating temporary copies of the HTML DOM. After a short pause, it compares these copies to detect changes on the page. Detection functions, defined in constants.js, decide if an element is a specific dark pattern.

Currently, detection functions cover four patterns:

Countdown
Scarcity
Social Proof
Forced Continuity
