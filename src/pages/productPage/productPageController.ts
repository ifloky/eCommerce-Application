import { getAnonymousFlow } from '../../shared/API';
import { ProductDetail } from '../../types/interfaces/Product';
import { productPageView } from './productPageView';

const productTemplate: ProductDetail = {
  id: 'undefined',
  masterData: {
    current: {
      metaTitle: {
        'en-US': 'undefined',
      },
      description: {
        'en-US': 'undefined',
      },
      masterVariant: {
        images: [
          {
            url: '',
          },
        ],
        prices: [
          {
            value: {
              centAmount: 0,
            },
            discounted: {
              value: {
                centAmount: 0,
              },
            },
          },
        ],
      },
    },
  },
};

export const product = async (od: string): Promise<ProductDetail> => {
  return getAnonymousFlow(`/products/${od}`);
};

export const ProductPage = {
  render: async (): Promise<void> => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = '';
      appContainer.append(await productPageView(productTemplate));
    }
  },

  update: async (id: string): Promise<void> => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = '';
      const productData = await product(id);
      appContainer.append(await productPageView(productData));
    }
  },
};
