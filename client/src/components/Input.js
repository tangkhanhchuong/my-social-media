import React from "react"
import styled, { css } from "styled-components"
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  width: ${(props) => props.width || '315px'};
  background: ${(props) => props.color ? props.color : props.theme.tertiaryColor2};
  padding: ${props => props.padding || "0.2rem 0.4rem"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  margin-bottom: ${(props) => props.mb || '2rem'};

  input {
    width: 100%;
    padding: 7px;
    background: inherit;
    border: none;
    font-size: 1rem;
    font-family: ${(props) => props.theme.font};
    color: ${props => props.textColor ? props.textColor : "black"};
  }

  label {
    color: ${(props) => props.theme.secondaryColor};
    margin-bottom: 2px;
  }

  ${(props) =>
    props.lg &&
    css`
      width: 100%;
    `}
`;

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false
}


function InputField(props) {
  const {
    field, form,
    type, label, placeholder, disabled,
    lg, value
  } = props
  const { name, onChange } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <Wrapper lg={lg}>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  )
}

export default InputField

export const CustomInput = (props) => {
  const { lg } = props

  const { mb, width, padding, color, textcolor } = props

  return (  
    <Wrapper lg={lg} mb={mb} width={width} padding={padding} color={color} textcolor={textcolor}>
      <input
        type='text'
        { ...props }
      />
    </Wrapper>
  )
}