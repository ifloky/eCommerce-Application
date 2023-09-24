export interface lineItem {
  id: string;
  productId: string;
  name: {
    'en-US': string;
  };
  price: {
    discounted: {
      value: {
        centAmount: string;
      };
    };
    value: {
      centAmount: string;
    };
  };
  discountedPrice: {
    value: {
      centAmount: string;
    };
  };
  totalPrice: {
    centAmount: string;
  };
  quantity: number;
  variant: {
    images: {
      url: string;
    }[];
  };
}

export interface CartResponseItem {
  id: string;
  version: number;
  lineItems: lineItem[];
  totalPrice: {
    centAmount: string;
  };
  discountCodes?: object[];
}

export interface CartItem {
  id: string;
  parentId: string;
}

export interface CartResponse {
  count: number;
  results: CartResponseItem[];
}

export interface CartInfo {
  cartId: string;
  cartDataVersion: number;
}
