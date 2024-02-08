import {
    Checkbox as MuiCheckbox,
    CheckboxProps as MuiCheckboxProps
} from '@mui/material';
import React from 'react';
import Icon from '../Icon';
import checkedIcon from '../../../../public/assets/icons/checkedIcon.svg';
import uncheckedIcon from '../../../../public/assets/icons/uncheckedIcon.svg';
import intermediateIcon from '../../../../public/assets/icons/intermediateIcon.svg';

export type CheckboxProps = MuiCheckboxProps;
const Checkbox = (props: CheckboxProps) => {
    return (
        <div>
            <MuiCheckbox
                disableRipple
                icon={<Icon src={uncheckedIcon} alt={''} />}
                checkedIcon={<Icon src={checkedIcon} alt={'checked icon'} />}
                indeterminateIcon={
                    <Icon src={intermediateIcon} alt={'intermediate icon'} />
                }
                {...props}
            />
        </div>
    );
};

export default Checkbox;
