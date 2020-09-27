import React, { useContext } from 'react';
import { Container, Button, Grid, Card, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import AuthContext from '../../context/AuthContext';
import { adminPermissions, userPermissions } from './Model';


interface IProps {

}


const Login:React.FC<IProps> = (props) => {
  const { setCurrentUser } = useContext(AuthContext)

  const handleLogin = (type: string) => {
    const user = {
      permissions: type === 'ADMIN' ? adminPermissions : userPermissions,
    }
    return () => {
      setCurrentUser(user)
    }
  }

  return (
    <StyledContainer className={'login'}>
      <Grid centered>
        <Grid.Column width={10}>
          <Card fluid color={'blue'} header={'Login'} className={'login__card'}>
            <Button.Group>
              <Button onClick={handleLogin('USER')}>User</Button>
              <Button.Or />
              <Button positive onClick={handleLogin('ADMIN')}>Admin</Button>
            </Button.Group>
          </Card>
        </Grid.Column>
      </Grid>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  padding: 2rem;
  
  .login {

    &__card {
      padding: 10em;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default Login;