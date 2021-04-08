
function getImagesNoAlt() {
    const found = Array.from(document.querySelectorAll("img")).filter(image => !image.getAttribute("alt"));
    alert(`found ${found.length} results`);
}

