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
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {

    /*
    removeExistingBeasts();
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
    */

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
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      console.log("hihihi");
    }
  });

})();
