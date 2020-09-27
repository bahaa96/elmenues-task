import React, { createContext, useState, useEffect, useContext } from 'react';
import { IMeal, ICategory } from '../../../typings';


interface IContextProps {
  setCategories: (categories: ICategory[]) => void
  setItems: (id: number, items: IMeal[]) => void
  categories: null | ICategory[]
}


const CategoriesContext = createContext<IContextProps>({
  setCategories: () => {},
  setItems: () => {},
  categories: null
})

export const CategoriesContextProvider: React.FC = ({ children }) => {
  const [ categories, setCategoriesData ] = useState<null | ICategory[]>(null)


  
  const setCategories = async (categories: ICategory[]) => {
    setCategoriesData(categories)
    try {
      await localStorage.setItem('categories', JSON.stringify(categories))
    }
    catch (e) {
      console.log('error: ', e);
    }
  }
  
  const setItems = (categoryId: number, items: IMeal[]) => {
    if (categories) {
      const newCategories = categories.map((category: ICategory) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items
          }
        }

        return category
      })
      setCategories(newCategories)
    }
    else {
      console.log('something went wrong in setItems');
    }
  }

  const getCategories = async () => {
    try {
      const storedCategories = await localStorage.getItem('categories');
      if (storedCategories) {
        return JSON.parse(storedCategories)
      }
    }
    catch (e) {
      console.log('error: ', e);
      return 0;
    }
  }

  useEffect(() => {
    ( async () => {
      const storedCategories  = await getCategories(); 
      if (storedCategories) {
        setCategoriesData(storedCategories);
      }
      else {
        const data = await require('../data')
        if (data.default) {
          setCategories(data.default.categories)
        }
      }
    })()
  }, [])

  const value = {
    categories,
    setCategories,
    setItems,
  }

  return (
    <CategoriesContext.Provider {...{value}} >
      {
        children
      }
    </CategoriesContext.Provider>
  ) 
}
  

export const useCategoriesContext = () => useContext(CategoriesContext)

  
export default CategoriesContext