/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
	'use strict';

	// Grab a reference to our auto-binding template
	// and give it some initial binding values
	// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
	var app = document.querySelector('#app');

	var webComponentsSupported = (
		'registerElement' in document &&
		'import' in document.createElement('link') &&
		'content' in document.createElement('template'));
	
	if (!webComponentsSupported) {
		var script = document.createElement('script');
		script.async = true;
		script.src = 'webcomponents-lite.min.js';
		//script.onload = finishLazyLoading();
		document.head.appendChild(script);
	} else {
		//finishLazyLoading();
	}

	app.displayInstalledToast = function() {
		// Check to make sure caching is actually enabled—it won't be in the dev environment.
		if (!document.querySelector('platinum-sw-cache').disabled) {
			document.querySelector('#caching-complete').show();
		}
	};

	// Listen for template bound event to know when bindings
	// have resolved and content has been stamped to the page
	app.addEventListener('dom-change', function() {
		console.log('My app is ready to rock for you!');
	});

	// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function() {
		// imports are loaded and elements have been registered
	});

	// Main area's paper-scroll-header-panel custom condensing transformation of
	// the appName in the middle-container and the bottom title in the bottom-container.
	// The appName is moved to top and shrunk on condensing. The bottom sub title
	// is shrunk to nothing on condensing.
	addEventListener('paper-header-transform', function(e) {
		var appName = document.querySelector('#mainToolbar .app-name');
		var middleContainer = document.querySelector('#mainToolbar .middle-container');
		var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
		var detail = e.detail;
		var heightDiff = detail.height - detail.condensedHeight;
		var yRatio = Math.min(1, detail.y / heightDiff);
		var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
		var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
		var scaleBottom = 1 - yRatio;

		// Move/translate middleContainer
		Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

		// Scale bottomContainer and bottom sub title to nothing and back
		Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

		// Scale middleContainer appName
		Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
	});

	// Close drawer after menu item is selected if drawerPanel is narrow
	app.onDataRouteClick = function() {
		var drawerPanel = document.querySelector('#paperDrawerPanel');
		if (drawerPanel.narrow) {
			drawerPanel.closeDrawer();
		}
	};

	// Scroll page to top and expand header
	app.scrollPageToTop = function() {
		//document.getElementById('mainContainer').scrollTop = 0;
	};

})(document);

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

var DE = 'de';
var EN = 'en';

function getWelcomeMessage() {
	var welcomeMessagesCount = 14;
	var index = Math.floor(Math.random() * welcomeMessagesCount) + 1;
	var name = getName();
	var nameString = '';
	if (name)
		nameString = ', ' + name;
	switch(index) {
		case 1: return 'It\'s great to see you' + nameString + '!';
		case 2: return 'Schön dich zu sehen' + nameString + '!';
		case 3: return 'Do you like the service? Give us feedback!';
		case 4: return 'Gefällt dir der Service? Lass doch ein Feedback da!';
		case 5: return 'What a wonderful day!';
		case 6: return 'Ein wundervoller Tag heute, oder?';
		case 7: return 'It\'s always good to have a smile!';
		case 8: return 'Lächeln ist immer gut!';
		case 9: return 'Take care of yourself first!';
		case 10: return 'Pass zuerst auf dich auf!';
		case 11: return 'Life healthy!';
		case 12: return 'Lebe gesund!';
		case 13: return 'Good ' + getDayTimeString(EN) + nameString + '!';
		case 14: return 'Guten ' + getDayTimeString(DE) + nameString + '!';
		case 15: return '';
		case 16: return '';
		case 17: return '';
		case 18: return '';
		case 19: return '';
		case 20: return '';
		default: return 'Schön dich zu sehen!';
	}
}

function getDayTimeString(locale) {
	var date = new Date();
	var hours = date.getHours();
	if(hours < 4 && locale === EN)
		return 'night session';
	if(hours < 4 && locale === DE)
		return 'Nacht Session';
	if(hours < 13 && locale === EN)
		return 'morning';
	if(hours < 13 && locale === DE)
		return 'Morgen';
	if(hours < 15 && locale === EN)
		return 'lunch break';
	if(hours < 15 && locale === DE)
		return 'Mittag';
	if(hours < 18 && locale === EN)
		return 'afternoon';
	if(hours < 18 && locale === DE)
		return 'Nachmittag';
	if(hours < 23 && locale === EN)
		return 'evening';
	if(hours < 23 && locale === DE)
		return 'Abend';
	if(locale === EN)
		return 'night session';
	return 'Nacht Session';
}

function getName() {
	if(gapi) {
		var authInstance = gapi.auth2.getAuthInstance();
		if(authInstance) {
			var user = authInstance.currentUser.get();
			if(user) {
				var profile = user.getBasicProfile();
				if(profile) {
					return profile.Ph;
				}
			}
		}
	}
}

function toast(toast) {
	var toasts = document.querySelector('social-contacts-toasts');
	toasts.querySelector('#' + toast).show();
}
