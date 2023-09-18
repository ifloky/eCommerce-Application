export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  cssClasses?: string[],
  innerHTML?: string,
): HTMLElementTagNameMap[T] => {
  const element = document.createElement(tagName);
  if (cssClasses) {
    cssClasses.map((cssClass) => element.classList.add(cssClass));
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

export function displayMessage(message: string, status: boolean): void {
  const messageElement = createElement('div', ['error', status ? 'positive' : 'negative']);
  messageElement.innerHTML = message;
  document.body.appendChild(messageElement);

  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 3000);
}