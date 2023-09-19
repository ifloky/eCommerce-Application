export interface lineItem {
  id: string;
  productId: string;
  name: {
    'en-US': string;
  };
  price: {
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
  lineItems?: lineItem[];
  totalPrice?: {
    centAmount: string;
  };
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
