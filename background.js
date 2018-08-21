browser.prevTab = -1;
browser.currentTab = -1;

function registerLast(activeTabInfo) {
  browser.prevTab = browser.currentTab;
  browser.currentTab = activeTabInfo.tabId;
}

function activateSwitch() {
  var query = browser.tabs.query({
    currentWindow: true,
    active: true
  });
  query.then(switchTabs, logFailure);
}

function switchTabs(tabs) {
  if (browser.prevTab == -1) {
    browser.prevTab = tabs[0].id;
  }

  browser.tabs.query(browser.prevTab, {
    active: true
  });
}

function logFailure(error) {
  console.log(`ERROR:\t ${error}`);
}

browser.tabs.onActivated.addListener(registerLast);
browser.commands.onCommand.addListener(activateSwitch);