setInterval(()=>{
    // Fetching current active tab ddkjskjvv
    chrome.windows.getLastFocused({ populate: true }, function(currentWindow) {
        
        if (currentWindow.focused) {
            let activeTab = currentWindow.tabs.find(t => t.active === true);
            
            // Redirecting back the page removed from blacklist
            redirectBack(activeTab);

            // Managing Current active tab in storage
            chrome.storage.local.get({tabs:[]},(result)=>{
                chrome.browserAction.setBadgeText({text: ''});
                let arr = result.tabs;
                let tab = arr.find(t=> t.domain === getHostName(activeTab.url));
                if(tab){
                    showBadge(tab.limit,tab.counter);
                    showNotification(tab.limit);
                    counterAndLimitManager(tab);
                    faviconValidator(tab,activeTab);
                    blacklistAndStorageUpdate(tab,arr);
                } else {
                    let domain = getHostName(activeTab.url);
                    let favicon = activeTab.favIconUrl;
                    if(isValidUrl(activeTab.url)){
                        addNewTab(domain,favicon,arr,-1);
                    }
                }
            });
        }
    });
},1000);