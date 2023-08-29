import { createElement } from "../../utils/abstract";
import { generateMenuBlock } from "./components/menu";
import { checkItem } from "./userProfilePageController";

const createUserProfileSection = (): HTMLElement => createElement('section', ['profile'])

const createUserProfileSectionWrapper = (): HTMLDivElement => createElement('div', ['profile__wrapper'])

const bindEvents = (elements: HTMLElement[]): void => {
  const [menu] = elements
  menu.addEventListener('click', checkItem)

}

const createUserProfileSectionView = (): HTMLElement => {
  const profileSection = createUserProfileSection()
  const wrapper = createUserProfileSectionWrapper()
  const menu = generateMenuBlock()
  wrapper.append(menu)
  profileSection.append(wrapper)
  bindEvents([menu])
  return profileSection
}

export const getUserProfileView = createUserProfileSectionView()
