let color = '#3aa757';

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {

        console.warn("asdfasdf");
        console.warn("asdfasdf");
        console.warn("asdfasdf");
        console.warn("asdfasdf");
        console.warn("asdfasdf");
        console.warn("asdfasdf");
    }
})

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});
