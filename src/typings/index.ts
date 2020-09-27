export interface IMeal {
  id: number
  name: string
  description: string
  price: string
}

export interface ICategory {
  id: number
  name: string
  items: IMeal[]
}