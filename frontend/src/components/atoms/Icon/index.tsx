import React from 'react';

export interface IconProps {
    src: string;
    alt: string;
    style?: React.CSSProperties | object;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Icon = ({ style, ...props }: IconProps) => {
    return <img {...props} alt={props.alt} style={{ ...style }} />;
};

export default Icon;
