export function contactsView(pageTitle: string): string {
  return `
    <div>
      <h1>${pageTitle}</h1>
      <p>This is the ${pageTitle} page.</p>
      <nav>
        <a href="/" data-link>Home</a>
        <a href="/contacts" data-link>Contacts</a>
      </nav>
    </div>
  `;
}