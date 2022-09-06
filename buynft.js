setInterval(
    function getElementByXpath(path) {
        var button = document.evaluate("//button[contains(., 'onfirm')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
            console.warn("CLICKED!");
        } else {
            console.log("Not yet...");
        }

    }, 1);

setInterval(
    function getElementByXpath(path) {
        var button = document.evaluate("//button[contains(., 'buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
            console.warn("CLICKED!");
        } else {
            console.log("Not yet...");
        }

    }, 1);

setInterval(
    function getElementByXpath(path) {
        var button = document.evaluate("//button[contains(., 'uy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
            console.warn("CLICKED!");
        } else {
            console.log("Not yet...");
        }

    }, 1);



