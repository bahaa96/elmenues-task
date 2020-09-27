import React, { useContext, useEffect } from 'react';
import { Button, Modal, Form, Grid } from 'semantic-ui-react';
import { useForm, Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import { ThemeContext } from 'styled-components';
import { IMeal } from '../../../typings';
import { $fixme } from '../../../typings/fixme';



interface IProps {
  size: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
  open: boolean
  onClose: () => void
  onSubmit: (data: IFormInputs) => void
  defaultValues: null | IMeal
}

interface IFormInputs {
  name: string
  description: string 
  price: string
}


const EditMealModal: React.FC<IProps> = (props) => {
  const { handleSubmit, control, errors, reset, formState } = useForm<IFormInputs>();
  const { colors } = useContext(ThemeContext)

  const onSubmit = (data: IFormInputs) => {
    // another wa to replace isDirty
    if (Object.keys(formState.dirtyFields).length) {
      props.onSubmit(data)
    }
  }

  useEffect(() => {
    if (props.defaultValues) {
      reset(props.defaultValues)
    }
  }, [props])


  return (
    <Modal
      {...props}
    >
      <Modal.Header>Edit Meal</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)} className={'category-content__form'}>
          <Controller rules={{ required: 'Meal name is required' }} as={Form.Field} name={'name'} defaultValue={props.defaultValues?.name} {...{control}} >
            <label>
              Meal name: 
            </label>
            {/* using manual default value to solve the weak structure of Semantic UI Form.Field way of handling the ref  */}
            <input placeholder={'Meal name'} defaultValue={props?.defaultValues?.name} /> 
          </Controller>
          <p style={{ color: colors.danger, minHeight: '1.5em' }}>
            <ErrorMessage {...{errors}} name={'name'} />
          </p> 
          <Controller rules={{ required: 'Meal description is required' }} as={Form.Field} name={'description'} defaultValue={props.defaultValues?.description} {...{control}} >
            <label>
              Meal description: 
            </label>
            {/* using manual default value to solve the weak structure of Semantic UI Form.Field way of handling the ref  */}
            <input placeholder={'describe the meal'} defaultValue={props?.defaultValues?.description} /> 
          </Controller>
          <p style={{ color: colors.danger, minHeight: '1.5em' }}>
            <ErrorMessage {...{errors}} name={'description'} />
          </p> 
          <Controller rules={{ required: 'Meal price is required' }} as={Form.Field} name={'price'} defaultValue={props.defaultValues?.price} {...{control}} >
            <label>
              Meal Price: 
            </label>
            {/* using manual default value to solve the weak structure of Semantic UI Form.Field way of handling the ref  */}
            <input placeholder={'i.e. $54.834'} defaultValue={props?.defaultValues?.price} /> 
          </Controller>
          <p style={{ color: colors.danger, minHeight: '1.5em' }}>
            <ErrorMessage {...{errors}} name={'price'} />
          </p>  
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={props.onClose}>
          No
        </Button>
        <Button positive onClick={handleSubmit(onSubmit)}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditMealModal