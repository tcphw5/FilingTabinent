(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function onError(error) {
    console.log('Error: ${error}');
  }

  /**
   * 
   * 
   */
  function saveTabs(URLList) {

    console.log("yoyoyo")

    for (let tab of beastURL) {
      console.log(tab.url)
    }

  }


  let monster = {
    name: "Kraken",
    speak: function() {console.log("HI")},
    bday: new Date(2012, 11, 17)
  }

  let kitten = {
    name: "moggy",
    bday: new Date(2006, 7, 12)
  }

  let setting = browser.storage.local.set({kitten});

  setting.then(null, onError)

  setting = browser.store.local.set({kitten, monster});

  setting.then(null, onError)


  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "save_tabs") {
      saveTabs(message.beastURL);
    } else if (message.command === "reset") {
      console.log("hihihi");
    }
  });

})();
