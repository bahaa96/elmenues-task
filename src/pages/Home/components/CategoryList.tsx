import React, { useState, Fragment, useContext } from 'react';
import { Container, Card, Accordion, Icon, AccordionTitleProps, Label } from 'semantic-ui-react';

import CategoryContent from './CategoryContent';
import CategoriesContext from '../context/CategoriesContext';



type IProps = {

}


const CategoryList: React.FC<IProps> = (props) => {
  const [ activeIndex, setActiveIndex ] = useState<number>(0);
  const { categories } = useContext(CategoriesContext);

  const handleClick = (e: any, titleProps: AccordionTitleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(Number(newIndex))
  }

  if (!categories || !categories.length) {
    return (
      <div>
        <p>
          no categories to show.
        </p>
      </div>
    )
  }

  return (
    <Container>
      <Card fluid header={'Menu Data'}>
        <Accordion styled fluid>
          {
            categories.map((category, index) => {
              return (
                <Fragment key={index}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={handleClick}
                  >
                    <Icon name='dropdown' />
                    {
                      category.name
                    }
                    <Label style={{ marginLeft: '1em' }}>
                      {
                        category.items?.length
                      }
                    </Label>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <CategoryContent {...category} />
                  </Accordion.Content>
                </Fragment>
              )
            })
          }
        </Accordion>
      </Card>
    </Container>
  )
}

export default CategoryList;