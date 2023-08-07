export function mainView(title: string, description: string): string {
  return `
    <div>
      <h1>${title}</h1>
      <p>${description}</p>
      <nav>
        <a href="/" data-link>Home</a>
        <a href="/contacts" data-link>Contacts</a>
        <button id="button">Click</button>
      </nav>
    </div>
  `;
}