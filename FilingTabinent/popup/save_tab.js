/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Given the chosen menu item and performs the correct action
     */

     console.log("hi")
    function menuSelection(clickedOn) {
      if (clickedOn === "Save Tabs") {
        var querying = browser.tabs.query({currentWindow: true});
        console.log(querying)
        console.log("querying")
        return querying;
      } else {
        //get correct tabs from save
      }
    }

    /**
     * 
     * get the tab urls and
     * send a message to the content script in the active tab.
     */
    function drain(tabs) {
        let url = menuSelection(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "save_tabs",
          beastURL: url
        });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("save")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(drain)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/filetabs.js"})
.then(listenForClicks);

//.catch(reportExecuteScriptError);
