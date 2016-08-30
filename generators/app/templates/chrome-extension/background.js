'use strict';

chrome.runtime.onInstalled.addListener(function() {
  const context = 'link';
  const title = 'Copy title';

  const id = chrome.contextMenus.create({
    'title': title,
    'contexts': [context],
    'id': 'context' + context,
    'documentUrlPatterns': ['*://trello.com/*']
  });

  chrome.tabs.create({ url: 'options.html' }, function(tab) {
    console.log(tab);
  });
});

function onClickHandler(info, tab) {
  chrome.tabs.sendMessage(tab.id, { type: 'menu-click' });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
