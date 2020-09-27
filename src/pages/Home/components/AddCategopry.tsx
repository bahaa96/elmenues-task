import React, { useContext, BaseSyntheticEvent } from 'react';
import { Card, Form, Button, Grid } from 'semantic-ui-react';
import { useForm, Controller  } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useCategoriesContext } from '../context/CategoriesContext';
import { ThemeContext } from 'styled-components';


type IProps = {

}

interface IFormInputs {
  name: string;
}

const AddCategory: React.FC<IProps> = (props) => {
  const { handleSubmit, control, errors, reset } = useForm<IFormInputs>();
  const { categories, setCategories } = useCategoriesContext();
  const { colors } = useContext(ThemeContext);

  const onSubmit = (data: IFormInputs, e?: BaseSyntheticEvent) => {
    const newCategory = {
      id: Math.floor(1000 + Math.random() * 9000),
      ...data,
      items: [] 
    }
    if (categories) {
      const newCategories = [newCategory, ...categories] 
      setCategories(newCategories)
      reset({
        name: ''
      })
      e?.target.reset()
    }
  }

  
  return (
    <Card fluid color='red' className={'add_category'} header='Add Category' >
      <Grid>
        <Grid.Column width={6}>
          <Form className={'add_category__form'} onSubmit={handleSubmit(onSubmit)} >
            <Controller rules={{ required: 'Category name is required' }} as={Form.Field} name={'name'} defaultValue={''} {...{control}}>
              <label>
                Category name: 
              </label>
              <input placeholder={'Category name i.e. Salads'} />
            </Controller>
            <p style={{ color: colors.danger, minHeight: '1.5em' }}>
              <ErrorMessage {...{errors}} name={'name'} />
            </p>
            <Button>
              Add
            </Button>
          </Form>
        </Grid.Column>

      </Grid>

    </Card>
  )
}

export default AddCategory;