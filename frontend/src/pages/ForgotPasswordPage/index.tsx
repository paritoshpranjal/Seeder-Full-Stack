import React, { useState } from 'react';
import LoginTemplate from '../../components/templates/Login';
import forgotImage from '../../../public/assets/images/forgot-reset.png';
import ChangePassword from '../../components/organisms/ChangePassword';
import ForgotPassword from '../../components/organisms/ForgotPassword';
import ResetPassword from '../../components/organisms/ResetCode';
import { useNavigate } from 'react-router-dom';
const ForgotPasswordPage = () => {
    const [value, setValue] = useState<number>(1);
    const navigate = useNavigate();
    let bodyNode;

    const handleLoginClick = () => {
        navigate('/login');
    }

    switch (value) {
        case 1:
            bodyNode = <ForgotPassword onLoginClick={handleLoginClick} onContinueClick={() => setValue(2)} />;
            break;
        case 2:
            bodyNode = (
                <ResetPassword
                    handleButtonClick={() => {
                        setValue(3);
                    }}
                />
            );
            break;
        case 3:
            bodyNode = <ChangePassword onLoginClick={handleLoginClick} />;
            break;
    }

    return (
        <div>
            <LoginTemplate imageSrc={forgotImage} bodyNode={bodyNode} />
        </div>
    );
};

export default ForgotPasswordPage;
