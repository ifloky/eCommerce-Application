/* eslint-disable no-console */
import { getAnonymousFlow, getCookie } from "../../shared/API"
import { Product } from "../../types/interfaces/Product"
import { renderSelectedCategory } from "./catalogPageController"

type responseType = {
  count: number
  limit: number
  offset: number
  results: Product[]
  total: number
}

type CategoryData = {
  categoryName: string
  id: string
}

type Category = {
  ancestors?: string[]
  assets?: string[]
  createdAt: string
  createdBy: {
    isPlatformClient: boolean
    user: {
      id: string
      typeId: string
    }
  }
  description: Record<string, string>
  externalId: string
  id: string
  key: string
  lastMessageSequenceNumber: number
  lastModifiedAt: string
  lastModifiedBy: {
    isPlatformClient: true
    user: {
      id: string
      typeId: string
    }
  }
  metaDescription: Record<string, string>
  metaTitle: Record<string, string>
  name: Record<string, string>
  orderHint: string
  slug: Record<string, string>
  parent: {
    typeId: string
    id: string
  }
  version: number
  versionModifiedAt: string
}

export const getAllProducts = async (limit = 8, offset = 0,): Promise<responseType> => {
  const path = `/products?limit=${limit}&offset=${offset}`
  const response: responseType = await getAnonymousFlow(path)
  return response
}

const getAllCategories = async (): Promise<Response> => {
  const url = `${process.env.BASE_URL}/${process.env.BASE_PROJECT_KEY}/categories/`
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getCookie('token')}`
    }
  }
  const response = await fetch(url, options)
  return response
}

export const getCategoriesData = async (): Promise<CategoryData[]> => {
  const data = await (await getAllCategories()).json()
  const categories: Category[] = data.results
  const categoriesData: CategoryData[] = []
  categories.forEach(category => {
    if (!category.parent) {
      const { name, id } = category
      const categoryName = name['en-US']
      categoriesData.push({ categoryName, id })
    }
  })
  return categoriesData
}

export const getProductCategory = async (id: string): Promise<void> => {
  const { total } = (await getAllProducts())
  const { results } = await getAllProducts(total)
  const selectedCategoryProducts = results.filter(product => product.masterData.current.categories[0].id === id)
  renderSelectedCategory(selectedCategoryProducts)
}