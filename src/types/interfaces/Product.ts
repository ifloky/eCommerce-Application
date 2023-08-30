export interface TypeIdAndId {
   typeId: string,
   id: string,
}
interface ImageDimensions {
   w: number,
   h: number,
}
interface Image {
   url: string,
   dimensions: ImageDimensions,
}
export interface ThreeLanguages {
   'en-US': string,
   ru: string,
   'be-BY': string,
}
export interface MasterVariant {
   id: number,
   sku: string,
   key: string,
   prices: [],
   images: Image[],
}
interface Current {
   name:  ThreeLanguages,
   description: ThreeLanguages,
   categories: TypeIdAndId[],
   slug: ThreeLanguages,
   metaTitle: ThreeLanguages,
   metaDescription: ThreeLanguages,
   masterVariant: MasterVariant,

}
interface MasterData {
   current: Current
}
export interface Product {
   id: string,
   masterData: MasterData,
}