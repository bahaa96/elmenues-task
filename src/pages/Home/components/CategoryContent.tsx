import React, { useContext, useEffect, BaseSyntheticEvent, useState } from 'react';
import { Container, Form, Accordion, Button, Grid, Icon, Segment, Label, Header, Modal } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';
import { ICategory, IMeal } from '../../../typings';
import CategoriesContext from '../context/CategoriesContext';
import { $fixme } from '../../../typings/fixme';
import EditMealModal from './EditMealModal';


interface IProps extends ICategory {

}

interface IFormInputs {
  name: string
  description: string
  price: string
}

const CategoryContent:React.FC<IProps> = (props) => {
  const { handleSubmit, control, errors, reset } = useForm<IFormInputs>()
  const { colors } = useContext(ThemeContext);
  const { setItems, categories, setCategories } = useContext(CategoriesContext);
  const { id: categoryId, items } = props;
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [ activeMeal, setActiveMeal ] = useState<null | IMeal>(null)

  
  const onSubmit = (data: IFormInputs, e?: BaseSyntheticEvent ) => {
    const newItem = {
      id: Math.floor(1000 + Math.random() * 9000),
      ...data
    }
    const newItems = [newItem, ...items]
    setItems(categoryId, newItems)
    reset({
      name: '',
      description: '',
      price: '',
    });
    e?.target.reset();
  }

  const handleDelete = (itemId: number) => {
    return () => {
      setItems(categoryId, items.filter((item: IMeal) => item.id !== itemId ))
    }
  }

  const handleEditButton = (item: IMeal) => {
    return () => {
      setActiveMeal(item)
      setShowEditModal(true)
    }
  }

  const handleEditModalClose = () => {
    setShowEditModal(false);
  }

  const handleEditModalSubmit = (data: any) => {
    console.log('edit theses: ', data);

    const newMeals = items.map((item: IMeal) => {
      if (activeMeal?.id === item.id) {
        return {
          ...activeMeal,
          ...data
        }
      }

      return item
    })
    setItems(categoryId, newMeals);
    handleEditModalClose();
  }


  return (
    <StyledContainer className={'category-content'}>
      <Header as='h3'>Items: </Header>
      <Grid>
        <Grid.Column>
          <Segment className={'category-content__form-wrapper'}>
            <Form onSubmit={handleSubmit(onSubmit)} className={'category-content__form'}>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column >
                    <Controller rules={{ required: 'Meal name is required' }} as={Form.Field} name={'name'} defaultValue={''} {...{control}} >
                      <label>
                        Meal name: 
                      </label>
                      <input placeholder={'Meal name'} /> 
                    </Controller>
                    <p style={{ color: colors.danger, minHeight: '1.5em' }}>
                      <ErrorMessage {...{errors}} name={'name'} />
                    </p> 
                  </Grid.Column>
                <Grid.Column>
                  <Controller rules={{ required: 'Meal description is required' }} as={Form.Field} name={'description'} defaultValue={''} {...{control}} >
                    <label>
                      Meal description: 
                    </label>
                    <input placeholder={'describe the meal'} /> 
                  </Controller>
                  <p style={{ color: colors.danger, minHeight: '1.5em' }}>
                    <ErrorMessage {...{errors}} name={'description'} />
                  </p> 
                </Grid.Column>
                <Grid.Column>
                  <Controller rules={{ required: 'Meal price is required' }} as={Form.Field} name={'price'} defaultValue={''} {...{control}} >
                    <label>
                      Meal Price: 
                    </label>
                    <input placeholder={'i.e. $54.834'} /> 
                  </Controller>
                  <p style={{ color: colors.danger, minHeight: '1.5em' }}>
                    <ErrorMessage {...{errors}} name={'price'} />
                  </p>  
                </Grid.Column>

                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>

              <Button>
                Add Meal
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
      <Accordion styled>
        {
          props.items.map((item: IMeal, index: number) => {
            return (
              <Accordion.Title className={'category-content__item'} key={index} active>
                <Icon name={'list'} />
                <p className={'category-content__item__title'}>
                  {
                    item.name
                  }
                    <Label as={'a'}>
                      <Icon name={'dollar sign'} />
                      {
                        item.price
                      }
                    </Label>  
                </p>
                <Button color={'orange'} onClick={handleEditButton(item)}>
                  Edit
                </Button>
                <Button color={'youtube'} onClick={handleDelete(item.id)}>
                  delete
                </Button>
              </Accordion.Title>
            )
          })
        }

      </Accordion>
      <EditMealModal 
        size={'tiny'}
        open={showEditModal}
        onClose={handleEditModalClose}
        onSubmit={handleEditModalSubmit}
        defaultValues={activeMeal}
      />
    </StyledContainer>
  )
} 




const StyledContainer = styled(Container)`

  .category-content {
    &__form-wrapper {
      margin-bottom: 1em !important;
    }
    &__form {
    }
    &__item {
      display: flex;  
      justify-content: 'space-between';


      &__title {
        flex: 1;

        a {
          margin-left: 1em !important;
        }
      }
    }
  }

`;

export default CategoryContent;