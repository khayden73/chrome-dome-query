let actionButtons = document.querySelectorAll(".action-buttons .go-btn");
let resultsDisplay = document.querySelector(".results-display");

actionButtons.forEach(actBtn => {
    actBtn.addEventListener("click", (event) => {
        console.log(`event.target = ${event.target}`);
        doAction(event.target);
    })
});

function showResults(result) {
    resultsDisplay.innerHTML = result;
}

async function getTab() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(`[getTab] tab = ${tab}`);
    return tab;
}

async function doAction(btn) {
    console.log(`[doAction] action = ${btn.dataset.action}`);

    const { action } = btn.dataset;
    const tab = await getTab();
    console.log(`[doAction] tab = ${tab}`);

    let executor = () => {
        console.log("nothing to execute");
    };
    switch (action) {
        case "imgNoAlt":
            executor = getImagesNoAlt;
            // resultsDisplay(getImagesNoAlt());
            break;
        case "extScripts":
            // resultsDisplay("EXTERNAL SCRIPTS");
            break;
        case "ogMeta":
            // resultsDisplay("OG META");
            break;
        default:
            alert("NOTHING!")
            break;
    }
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: executor,
    });

    // alert(`action = ${btn.dataset.action}`)
}

function getImagesNoAlt() {
    const found = Array.from(document.querySelectorAll("img")).filter(image => !image.getAttribute("alt"));
    alert(`found ${found.length} results`);
}

