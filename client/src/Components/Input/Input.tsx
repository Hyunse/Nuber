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

// Props Interface
interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: any;
  name?: string;
  onChange: any;
}

/**
 * Input Component
 * 
 * @param {string} placehoelder : input placehoelder
 * @param {type} type : input type
 * @param {required} required : true or false
 * @param {string} value : input value
 * @param {string} name : input name
 * @param {function} onChange : input on change
 */
const Input: React.SFC<IProps> = ({
  placeholder = '',
  type = 'text',
  required = true,
  value,
  name = '',
  onChange
}) => (
  <Container
    onChange={onChange}
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
    name={name}
  />
);

export default Input;
