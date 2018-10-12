import React from 'react';
import styled from '../../typed-components';

// S - Styled Component
const Container = styled.input`
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
`;
// E - Styled Component

interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: any;
}

const Input: React.SFC<IProps> = ({ placeholder = "", type = "text", required = true, value }) => (
  <Container
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
  />
);

export default Input;
