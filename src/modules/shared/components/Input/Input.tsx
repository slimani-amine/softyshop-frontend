import { HTMLAttributes, useState } from 'react'
import eyeOn from './eyeOn.svg'
import eyeOff from './eyeOff.svg'
import { log } from 'console'

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  formik: any
  label?: string
  icon?: string
  type?: 'email' | 'text' | 'number' | 'password'
  variant?: 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'dark' | 'secondary' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
  required?: boolean
}

const Input: React.FC<IInputProps> = ({
  formik,
  name,
  label,
  icon,
  variant,
  size,
  rounded,
  type,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true)
  const [isFocused, setIsFocused] = useState(false);
  console.log(isFocused)

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  return (
    <div className="input-form">
      <label htmlFor={name} className="label">
        {label}
        {required && <span className="red-star"> *</span>}
      </label>

      <div
        className={[
          'input-container',
          `input-container-${variant}`,
          `${rounded ? 'input-rounded' : ''}`,
        ].join(' ')}
      >
        {icon && <img src={icon} alt="icon" className="icon" />}
        <div className='input-field'>
          <input
            id={name}
            name={name}
            className={`${isFocused ? 'legend-label' : ""}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={
              type === 'password'
                ? showPassword
                  ? 'password'
                  : 'text'
                : type === 'text'
                ? 'text'
                : type === 'email'
                ? 'email'
                : 'number'
            }
            autoComplete="new-password"
            {...props}
          />
          <p className={`${isFocused ? "legend-input":""}`}>Name</p>
        </div>
        {type === 'password' && (
          <img
            src={showPassword ? eyeOn : eyeOff}
            alt="eye-icon"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

  
    </div>
  )
}

type InputDefaultProps = Pick<
  IInputProps,
  'label' | 'icon' | 'variant' | 'size' | 'rounded' | 'type' | 'required'
>

Input.defaultProps = {
  label: '',
  icon: '',
  variant: 'primary',
  size: 'md',
  rounded: true,
  required: false,
  type: 'text',
} as InputDefaultProps

export default Input
