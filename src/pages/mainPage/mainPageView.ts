
export function mainPageView(title: string, description: string): string {
  return `
    <div class="main-container">
      <h1>${title}</h1>
      <p>${description}</p>
    </div>
  `;
}