import { homePageRender, userProfilePageRender } from '../../shared/router';
import { displayMessage } from '../../utils/abstract';
import { renderEditBlock } from './components/editProfile';
import { renderArticle } from './components/information';
import { renderSignOutBlock } from './components/signOut';
import {
  getBillingData,
  getPersonalData,
  getShippingData,
  setDefaultAddress,
  updateAddressData,
  updatePersonalData,
} from './userProfilePageModel';

export const getItemData = async (): Promise<void> => {
  const informationField = document.querySelector('.information');
  while (informationField?.firstChild) {
    informationField.firstChild.remove();
  }
  const checkedItem = document.querySelector('.nav__item.active');
  if (checkedItem && checkedItem.textContent) {
    if (checkedItem.getAttribute('data-type') === 'personal') {
      const data = await getPersonalData();
      renderArticle(data, checkedItem.textContent);
    }
    if (checkedItem?.getAttribute('data-type') === 'billing') {
      const data = await getBillingData();
      const title = checkedItem.textContent;
      data.forEach((address, ind) => {
        renderArticle(address, `${title} #${ind + 1}`);
      });
    }
    if (checkedItem?.getAttribute('data-type') === 'shipping') {
      const data = await getShippingData();
      const title = checkedItem.textContent;
      data.forEach((address, ind) => {
        renderArticle(address, `${title} #${ind + 1}`);
      });
    }
    if (checkedItem.getAttribute('data-type') === 'edit') {
      const personalData = await getPersonalData();
      const billingData = await getBillingData();
      const shippingData = await getShippingData();
      renderEditBlock(personalData, billingData[0], shippingData[0]);
    }
    if (checkedItem.getAttribute('data-type') === 'sign') {
      renderSignOutBlock();
    }
  }
};

export const checkItem = (event: Event): void => {
  const { target } = event;
  if (target && target instanceof HTMLLIElement) {
    const listItems = document.querySelectorAll('.nav__item');
    listItems.forEach((item) => {
      item.classList.remove('active');
    });
    target.classList.add('active');
  }
  getItemData();
};

export const updatePersonalDetails = async (): Promise<void> => {
  const name = document.getElementById('personal-name') as HTMLInputElement;
  const middleName = document.getElementById('personal-middleName') as HTMLInputElement;
  const lastName = document.getElementById('personal-lastName') as HTMLInputElement;
  const birthDay = document.getElementById('personal-birthDay') as HTMLInputElement;
  const data = {
    name: name.value,
    middleName: middleName.value,
    lastName: lastName.value,
    birthDay: birthDay.value,
  };
  const response = await updatePersonalData(data);
  if (response) {
    displayMessage('The personal data is update', true);
  } else {
    displayMessage('Something went wrong', false);
  }
};

export const updateAddress = async (parent: HTMLElement): Promise<void> => {
  const parentId = parent.id;
  const country = parent.querySelector(`#${parentId}-country`) as HTMLInputElement;
  const city = parent.querySelector(`#${parentId}-city`) as HTMLInputElement;
  const street = parent.querySelector(`#${parentId}-streetName`) as HTMLInputElement;
  const postalCode = parent.querySelector(`#${parentId}-postalCode`) as HTMLInputElement;
  const id = parent.querySelector(`#${parentId}-id`) as HTMLInputElement;
  const isDefault = parent.querySelector(`#${parentId}-checkbox`) as HTMLInputElement;
  const data = {
    country: country.value,
    city: city.value,
    streetName: street.value,
    postalCode: postalCode.value,
    id: id.value,
    default: isDefault.checked,
    type: parentId,
  };
  if (data.default) {
    setDefaultAddress(data);
  }
  const response = await updateAddressData(data);
  if (response) {
    displayMessage('The address data is update', true);
  } else {
    displayMessage('Something went wrong', false);
  }
};

export const updateData = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    const parent = target.closest('.edit__details');
    if (target.closest('#personal')) {
      updatePersonalDetails();
    }
    if (target.closest('#billing') && parent instanceof HTMLElement) {
      updateAddress(parent);
    }
    if (target.closest('#shipping') && parent instanceof HTMLElement) {
      updateAddress(parent);
    }
  }
};

export const isSignOut = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement && target.textContent === 'yes') {
    localStorage.setItem('login', 'false');
    homePageRender();
  }
  userProfilePageRender();
};
