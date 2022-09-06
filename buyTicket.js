var count = 0
var success = setInterval(
    function getElementByXpath(path) {
        var inc = document.evaluate("//button[@data-tracking-label='add']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var button = document.evaluate("//button[contains(., 'Tickets')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (count < 5 && inc) {
            console.warn(count);
            console.warn("Buttons gefunden!");
            inc.click();
            console.warn("Anzahl erhöht!");
            inc.click();
            console.warn("Anzahl erhöht!");
            if (button) {
                count = button.getAttribute('data-quantity');
                if (count === "4") {
                    console.warn("Klicke kaufen!");
                    button.click();
                }
            } 
            // console.warn("CLICKED Inc!");
        } else {
            console.log("Suche Buttons...");
        }

    }, 1);
// clearInterval(success);
