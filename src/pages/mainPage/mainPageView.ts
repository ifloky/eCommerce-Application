import { createElement } from "../../utils/abstract";

export async function mainPageView(title: string, description: string): Promise<HTMLElement> {
  function escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);

  const mainContainer = createElement('div', ['main-container'])
  mainContainer.innerHTML = `
    <h1>${escapedTitle}</h1>
    <p>${escapedDescription}</p>
  `

  return mainContainer;
}
