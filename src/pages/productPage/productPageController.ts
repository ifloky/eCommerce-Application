import { getAnonymousFlow } from "../../shared/API";
import { productPageView } from "./productPageView";

export interface ProductDetail {
  id: string;
  masterData: {
    current: {
      metaTitle: { [key: string]: string };
      description: { [key: string]: string };
      masterVariant: {
        images: [
          {
            url: ''
          },
        ];
        prices: {
          value: {
            centAmount: number; 
          };
          discounted: {
            value: {
              centAmount: number; 
            };
          };
        }[];
      };
    };
  };
}


const productTemplate: ProductDetail = {
  id: 'undefined',
  masterData: {
    current: {
      metaTitle: {
        'en-US': 'undefined'
      },
      description: {
        'en-US': 'undefined'
      },
      masterVariant: {
        images: [
          {
            url: ''
          }
        ],
        prices: [
          {
            value: {
              centAmount: 0 
            },
            discounted: {
              value: {
                centAmount: 0 
              }
            }
          }
        ]
      },
    }
  },
};


export const product = async (od: string): Promise<ProductDetail> => {
  return getAnonymousFlow(`/products/${od}`);
}

export const ProductPage = {
  render: (): void => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = ''
      appContainer.append(productPageView(productTemplate))}
  },
      
  update: async (od:string): Promise<void> => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = ''
      const productData = await product(od);
      appContainer.append(productPageView(productData))
    };
  },
};

ProductPage.update('a7b1d167-9a03-43e5-b423-db8d36cc5a86')
