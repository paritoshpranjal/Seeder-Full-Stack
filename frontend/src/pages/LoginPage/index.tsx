import React from 'react'
import LoginPanel from '../../../public/assets/images/login-panel.png';
import Login from '../../components/organisms/Login';
import LoginTemplate from '../../components/templates/Login';

const LoginPage = () => {
  return (
    <LoginTemplate imageSrc={LoginPanel} bodyNode={<Login/>}/>
  )
}

export default LoginPage;
