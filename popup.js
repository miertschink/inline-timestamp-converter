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

// The body of this function will be executed as a content script inside the
// current page
var transFormTimestamps = function () {
    var getFormattedDate = function (date) {
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
        '\n' +
        '/* Tooltip text */\n' +
        '.tooltip .tooltiptext {\n' +
        '    visibility: hidden;\n' +
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
        '    opacity: 0;\n' +
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

    const htmlTagsToSearch = [
        'h1', 'h2', 'h3', 'h4', 'p', 'div', 'span', 'td', 'th'
    ];

    for (var counter = 0; counter < htmlTagsToSearch.length; counter++) {
        var tags = document.getElementsByTagName(htmlTagsToSearch[counter]);
        const regex = new RegExp('\\d{13}')
        for (var i = 0; i < tags.length; i++) {
            const tagContent = tags[i].innerHTML;
            const tagText = tags[i].textContent;
            console.error(tagText);
            console.error(tagText);
            console.error(tagText);
            const timeStampMatch = tagText.match(regex);
            if (timeStampMatch !== null) {
                const date = new Date(parseInt(timeStampMatch[0]));
                const toolTipHover = '<div class="tooltip">' + tagContent +
                    '  <span class="tooltiptext">' + getFormattedDate(date) + '</span>\n' +
                    '</div>'
                tags[i].innerHTML = toolTipHover;
                break;
            }
        }
    }
}
