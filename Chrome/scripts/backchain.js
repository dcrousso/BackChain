var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++) {
	if(links[i].href.indexOf(location.hostname) < 0) {
		links[i].addEventListener("click", function(e) {
			chrome.runtime.sendMessage({
				backChainURL: this.href.replace(/http.?:\/\//, "//"),
				backChainOriginURL: getURL(this)
			});
		});
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.backChainLinkURL.length > 0 && !document.getElementById("previousDomain")) {
		insertBackLink(request.backChainLinkURL);
	}
});

document.addEventListener("load", function() {
	if(document.referrer.length > 0 && !document.getElementById("previousDomain")) {
		insertBackLink(document.referrer);
	}
});

function getURL(element) {
	var url = location.href;
	// Site specific backChain linking
	if(location.hostname.indexOf("reddit") >= 0) {
		var e = findParentWithClass(element, "thing id-");
		if(e) {
			url = e.querySelector(".entry .buttons .first a").href;
		}
	} else if(location.hostname.indexOf("news.ycombinator") >= 0) {
		var e = element.parentNode.parentNode.nextSibling;
		if(e) {
			url = e.querySelector(".subtext a[href^='item?id=']").href;
		}
	} else if(location.hostname.indexOf("facebook") >= 0) {
		var e = findParentWithClass(element, "userContentWrapper");
		if(e) {
			url = e.querySelector("a._5pcq").href;
		}
	}
	return url.replace(/http.?:\/\//, "//");
}

function findParentWithClass(element, classString) {
	var parent = element.parentNode;
	if(!parent) {
		return null;
	} else if(parent.className.indexOf(classString) >= 0) {
		return parent;
	} else return findParentWithClass(parent, classString);
}

function insertBackLink(url) {
	var previousDomain = document.createElement("div");
	previousDomain.id = "previousDomain";
	previousDomain.style.position = "fixed";
	previousDomain.style.top = 0;
	previousDomain.style.left = 0;
	previousDomain.style.padding = "7px";
	previousDomain.style.borderRadius = "0 0 5px 0";
	previousDomain.style.zIndex = 10000000000; // Should never need this, but just in case
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
	previousLink.style.fontFamily = "Helvetica, Arial, sans-serif";
	previousLink.style.fontSize = "16px";
	previousLink.style.textDecoration = "none";
	previousLink.style.color = "#fff";
	previousDomain.appendChild(previousLink);
}