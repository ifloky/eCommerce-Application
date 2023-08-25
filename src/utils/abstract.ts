export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  cssClasses?: string[],
): HTMLElementTagNameMap[T] => {
  const element = document.createElement(tagName);
  if (cssClasses) {
    cssClasses.map((cssClass) => element.classList.add(cssClass));
  }
  return element;
};
