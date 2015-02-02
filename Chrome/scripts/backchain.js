var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++) {
	if(links[i].href.indexOf(location.origin) < 0) {
		links[i].addEventListener("click", function(e) {
			chrome.runtime.sendMessage({backChainURL: this.href.replace(/http.?:\/\//, "//")});
		});
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.backChainOriginURL.length > 0) {
		insertBackLink(request.backChainOriginURL);
	}
});

function insertBackLink(url) {
	var previousDomain = document.createElement("div");
	previousDomain.id = "previousDomain";
	previousDomain.style.position = "fixed";
	previousDomain.style.top = 0;
	previousDomain.style.left = 0;
	previousDomain.style.padding = "7px";
	previousDomain.style.borderRadius = "0 0 5px 0";
	previousDomain.style.zIndex = 100000;
	previousDomain.style.backgroundColor = "#000";
	previousDomain.style.opacity = 0.5;
	previousDomain.style.transition = "opacity 0.5s";

	previousDomain.addEventListener("mouseover", function() {
		previousDomain.style.opacity = 1;
	});
	previousDomain.addEventListener("mouseleave", function() {
		previousDomain.style.opacity = 0.5;
	});
	document.body.appendChild(previousDomain);

	var previousLink = document.createElement("a");
	previousLink.href = url;
	previousLink.innerHTML = "Return to Source";
	previousLink.style.color = "#fff";
	previousDomain.appendChild(previousLink);
}