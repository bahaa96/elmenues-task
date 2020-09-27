import React from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react'

import CategoryList from './components/CategoryList';
import AddCategory from './components/AddCategopry';
import { CategoriesContextProvider } from './context/CategoriesContext';


interface IProps {

}


const Home:React.FC<IProps> = (props) => {
  return (
    <CategoriesContextProvider>
      <StyledContainer>
        <AddCategory />
        <CategoryList />
      </StyledContainer>
    </CategoriesContextProvider>
  )
}

const StyledContainer = styled(Container)`
  padding: 2rem;

  .add_category {
    padding: 1em;

    &__form {
      border: none;
    }
  } 

`


export default Home;