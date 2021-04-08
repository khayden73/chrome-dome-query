function getImagesNoAlt() {
    return Array.from(document.querySelectorAll("img")).filter(image => !image.getAttribute("alt"));
}