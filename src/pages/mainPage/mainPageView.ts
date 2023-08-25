export async function mainPageView(title: string, description: string): Promise<string> {
  function escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);

  return `
    <div class="main-container">
      <h1>${escapedTitle}</h1>
      <p>${escapedDescription}</p>
    </div>
  `;
}
