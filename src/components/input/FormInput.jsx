import { oneOf, string, func } from 'prop-types';
import { useRef, useId, useState } from 'react';
import { nameReg, idReg, nickNameReg, passWordReg } from '@/utils/validation';
import { maxLengthCheck } from '@/utils/maxLengthCheck';

function FormInput({
  type,
  name = null,
  label,
  placeholder,
  errorMessage,
  minLength,
  maxLength,
  onChange,
  ...restProps
}) {
  const id = useId();
  const inputRef = useRef(null);

  const [isErrorShow, setIsErrorShow] = useState(false);

  let password;

  if (name === 'userpasswordcheck') {
    password = document.querySelector('[name="userpassword"]')?.value;
  }

  const handleInput = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    // console.log(inputValue);

    if (maxLength) {
      maxLengthCheck(inputRef.current);
    }

    let isValid = false;

    switch (name) {
      case 'name':
        isValid = nameReg(inputValue);
        break;
      case 'userid':
        isValid = idReg(inputValue);
        break;
      case 'userpassword':
        isValid = passWordReg(inputValue);
        break;
      case 'userpasswordcheck':
        isValid = password === inputValue;
        break;
      case 'usernickname':
        isValid = nickNameReg(inputValue);
        break;
      case 'answer':
        isValid = inputValue === '카레빵맨';
        break;
      default:
        isValid = true;
    }

    if (isValid || inputValue === '') {
      // console.log(`유효한 ${name}입니다.`, inputValue);
      setIsErrorShow(false);
    } else {
      // console.error(`유효하지 않은 ${name}입니다.`, inputValue);
      setIsErrorShow(true);
    }
  };

  return (
    <div>
      <fieldset>
        <label
          htmlFor={id}
          className="mb-1 block text-lionly-sm-bold text-lionly-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="h-11 w-full rounded border border-lionly-white bg-transparent px-5 py-3 text-lionly-sm outline-none placeholder:text-lionly-white"
          ref={inputRef}
          autoComplete="off"
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e) => {
            handleInput(e);
            onChange?.(e);
          }}
          {...restProps}
        />
      </fieldset>

      <span
        className={`mt-1 text-lionly-xs text-lionly-red ${
          isErrorShow ? 'block' : 'hidden'
        }`}
      >
        {errorMessage}
      </span>
    </div>
  );
}

FormInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search', 'nickname']),
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
  errorMessage: string.isRequired,
  handleInput: func,
  minLength: string,
  maxLength: string,
  onChange: func,
};

export default FormInput;
