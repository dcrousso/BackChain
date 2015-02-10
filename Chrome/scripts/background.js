chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(changeInfo.status == 'complete' && request.backChainURL.length > 0 && request.backChainOriginURL.length > 0) {
			chrome.tabs.query({url: "*:" + request.backChainURL}, function(tabs) {
				if(tabs.length == 1) {
					chrome.tabs.sendMessage(tabs[0].id, {backChainLinkURL: request.backChainOriginURL});
					request.backChainURL = "";
					request.backChainOriginURL = "";
				}
			});
		}
	});
});