export function autoShrinkText(element: HTMLElement | null, minSize = 10) {
  if (!element) return;

  let fontSize = parseFloat(window.getComputedStyle(element).fontSize);

  while (element.scrollWidth > element.clientWidth && fontSize > minSize) {
    fontSize -= 1;
    element.style.fontSize = fontSize + "px";
  }
}