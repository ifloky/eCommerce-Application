import { Product } from "./Product";

export type Category = {
  ancestors?: string[];
  assets?: string[];
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: {
      id: string;
      typeId: string;
    };
  };
  description: Record<string, string>;
  externalId: string;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: true;
    user: {
      id: string;
      typeId: string;
    };
  };
  metaDescription: Record<string, string>;
  metaTitle: Record<string, string>;
  name: Record<string, string>;
  orderHint: string;
  slug: Record<string, string>;
  parent: {
    typeId: string;
    id: string;
  };
  version: number;
  versionModifiedAt: string;
};

export type responseTypeProduct = {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: Product[];
};

export type responseTypeCategory = {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: Category[];
};

export type CategoryData = {
  categoryName: string;
  id: string;
};
