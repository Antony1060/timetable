export const swapElements = (el1: Element, el2: Element) => {
    const tempHtml = el2.innerHTML;
    el2.innerHTML = el1.innerHTML;
    el1.innerHTML = tempHtml;
}