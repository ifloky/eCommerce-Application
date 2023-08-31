/* eslint-disable no-console */
import { PersonalData } from "../../../types/interfaces/userProfilePage"
import { createElement } from "../../../utils/abstract"

const createArticleElement = (): HTMLElement => createElement('article', ['information_personal', 'personal'])

const createTextElement = (): HTMLParagraphElement => createElement('p', ['information__text', 'information__text_personal'])

const createArticleTitle = (): HTMLElement => {
  const title = createElement('h3', ['information__title', 'information__title_personal'])
  title.textContent = 'personal details'
  return title
}

const createContentLine = (titleText: string, valueText: string): HTMLDivElement => {
  const line = createElement('div', ['information__content-line', 'information__content-line_personal'])
  const title = createTextElement()
  title.classList.add('information__content-title')
  title.textContent = titleText
  const value = createTextElement()
  value.classList.add('information__content-value')
  value.textContent = valueText
  line.append(title, value)
  return line
}

const createContentWrapper = (data: PersonalData): HTMLDivElement => {
  const wrapper = createElement('div', ['information__content'])
  const dataArr = Object.entries(data)
  dataArr.forEach(item => {
    const line = createContentLine(item[0], item[1])
    wrapper.append(line)
  })
  return wrapper
}

const generatePersonalArticle = (data: PersonalData): HTMLElement => {
  const article = createArticleElement()
  const title = createArticleTitle()
  const wrapper = createContentWrapper(data)
  article.append(title, wrapper)
  return article
}

export const renderArticle = (data: PersonalData): void => {
  const articleElement = generatePersonalArticle(data)
  const section = document.querySelector('.information')
  section?.append(articleElement)
}