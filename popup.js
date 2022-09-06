// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject transFormTimestamps into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: transFormTimestamps,
    });
})

var transFormTimestamps = function () {
    var getFormattedDate = function (timestamp) {
        let intTimestamp = parseInt(timestamp);
        // in case of Unix Timestamp in seconds instead of milliseconds
        if (intTimestamp <= 9999999999) {
            console.warn(intTimestamp);
            intTimestamp = intTimestamp * 1000;
        }
        const date = new Date(intTimestamp);
        return date.toLocaleString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    var toolTipCss = '\n' +
        '/* Tooltip container */\n' +
        '.tooltip {\n' +
        '    position: relative;\n' +
        '    display: inline-block;\n' +
        '    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */\n' +
        '}\n' +
        '.tooltiptext {\n' +
        '    font-size: 12px;\n' +
        '    position: absolute;\n' +
        '    left: 0;\n' +
        '    top: 0;\n' +
        '}\n' +
        '\n' +
        '/* Tooltip text */\n' +
        '.tooltip .tooltiptext {\n' +
        '    opacity: 100;\n' +
        '    visibility: visible;\n' +
        '    width: 120px;\n' +
        '    background-color: #555;\n' +
        '    color: #fff;\n' +
        '    text-align: center;\n' +
        '    padding: 5px 0;\n' +
        '    border-radius: 6px;\n' +
        '\n' +
        '    /* Position the tooltip text */\n' +
        '    position: absolute;\n' +
        '    z-index: 1;\n' +
        '    bottom: 125%;\n' +
        '    left: 50%;\n' +
        '    margin-left: -60px;\n' +
        '\n' +
        '    /* Fade in tooltip */\n' +
        '    transition: opacity 0.3s;\n' +
        '}\n' +
        '\n' +
        '/* Tooltip arrow */\n' +
        '.tooltip .tooltiptext::after {\n' +
        '    content: "";\n' +
        '    position: absolute;\n' +
        '    top: 100%;\n' +
        '    left: 50%;\n' +
        '    margin-left: -5px;\n' +
        '    border-width: 5px;\n' +
        '    border-style: solid;\n' +
        '    border-color: #555 transparent transparent transparent;\n' +
        '}\n' +
        '\n' +
        '/* Show the tooltip text when you mouse over the tooltip container */\n' +
        '.tooltip:hover .tooltiptext {\n' +
        '    visibility: visible;\n' +
        '    opacity: 1;\n' +
        '}';

    const style = document.createElement('style');
    style.textContent = toolTipCss;
    document.head.append(style);

    chrome.storage.sync.get("color", ({color}) => {
        document.body.style.backgroundColor = color;
    });

    const regex = new RegExp('\\d{10,13}')

    function textNodesUnder(el) {
        var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) a.push(n);
        return a;
    }

    const allElementWithKeyword = textNodesUnder(document).filter(
        x => x.textContent.match(regex)).map(x => x.parentNode);

    const elementStore = [];
    for (var i = 0; i < allElementWithKeyword.length; i++) {
        const currentElement = allElementWithKeyword[i];
        console.warn(elementStore.indexOf(currentElement));
        if (elementStore.indexOf(currentElement) === -1) {
            const tagContent = currentElement.innerHTML;
            const tagText = currentElement.textContent;
            const timeStampMatch = tagText.match(regex);
            const innerHtml = currentElement.innerHTML.replace(regex, getFormattedDate(timeStampMatch[0]) + ' (' + timeStampMatch[0] + ')');
            currentElement.innerHTML = innerHtml;
            elementStore.push(currentElement);
        }
    }
}
