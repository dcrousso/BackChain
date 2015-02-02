chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(changeInfo.status == 'complete') {
			chrome.tabs.query({url: "*:" + request.backChainURL}, function(tabs) {
				if(tabs.length == 1) {
					chrome.tabs.sendMessage(tabs[0].id, {backChainOriginURL: sender.url});
				}
			});
		}
	});
});