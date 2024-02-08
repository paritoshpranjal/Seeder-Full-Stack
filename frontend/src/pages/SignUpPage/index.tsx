import React from 'react'
import LoginPanel from '../../../public/assets/images/login-panel.png';
import LoginTemplate from '../../components/templates/Login'
import SignUp from '../../components/organisms/SignUp';

const SignUpPage = () => {
  return (
    <LoginTemplate imageSrc={LoginPanel} bodyNode={<SignUp/>}/>
  )
}

export default SignUpPage;
