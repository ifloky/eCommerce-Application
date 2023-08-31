import { BillingData, PersonalData } from "../../../types/interfaces/userProfilePage"
import { createElement } from "../../../utils/abstract"

const createArticleElement = (): HTMLElement => createElement('article', ['information_personal'])

const createTextElement = (): HTMLParagraphElement => createElement('p', ['information__text'])

const createArticleTitle = (text: string): HTMLElement => {
  const title = createElement('h3', ['information__title'])
  title.textContent = text
  return title
}

const createContentLine = (titleText: string, valueText: string): HTMLDivElement => {
  const line = createElement('div', ['information__content-line'])
  const title = createTextElement()
  title.classList.add('information__content-title')
  title.textContent = titleText
  const value = createTextElement()
  value.classList.add('information__content-value')
  value.textContent = valueText
  line.append(title, value)
  return line
}

const createContentWrapper = (data: PersonalData | BillingData): HTMLDivElement => {
  const wrapper = createElement('div', ['information__content'])
  const dataArr = Object.entries(data)
  dataArr.forEach(item => {
    const line = createContentLine(item[0], item[1])
    wrapper.append(line)
  })
  return wrapper
}

export const generateArticle = (data: PersonalData | BillingData, text: string): HTMLElement => {
  const article = createArticleElement()
  const title = createArticleTitle(text)
  const wrapper = createContentWrapper(data)
  article.append(title, wrapper)
  return article
}

export const renderArticle = (data: PersonalData | BillingData, title: string): void => {
  const articleElement = generateArticle(data, title)
  const section = document.querySelector('.information')
  section?.append(articleElement)
}