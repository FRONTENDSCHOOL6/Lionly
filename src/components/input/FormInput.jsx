import { oneOf, string, func } from 'prop-types';
import { useRef, useId, useState } from 'react';
import { nameReg, idReg, nickNameReg, passWordReg } from '@/utils/validation';

function FormInput({
  type,
  name = null,
  label,
  placeholder,
  errorMessage,
  minLength,
  maxLength,
}) {
  const id = useId();
  const inputRef = useRef(null);

  const [isErrorShow, setIsErrorShow] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    console.log(inputValue);

    let isValid = false;

    switch (name) {
      case 'userName':
        isValid = nameReg(inputValue);
        break;
      case 'userId':
        isValid = idReg(inputValue);
        break;
      case 'userPassWord':
        isValid = passWordReg(inputValue);
        break;
      case 'userPasswordCheck':
        isValid = passWordReg(inputValue);
        break;
      case 'userNickName':
        isValid = nickNameReg(inputValue);
        break;
      case 'ansWer':
        isValid = inputValue === '카레빵맨';
        break;
      default:
        isValid = true;
    }

    if (isValid || inputValue === '') {
      console.log(`유효한 ${name}입니다.`, inputValue);
      setIsErrorShow(false);
    } else {
      console.error(`유효하지 않은 ${name}입니다.`, inputValue);
      setIsErrorShow(true);
    }
  };

  return (
    <div className="bg-lionly-primary-color">
      <form
        action="/"
        method="post"
        onSubmit={handleInput}
        onChange={handleInput}
      >
        <fieldset>
          <label
            htmlFor={id}
            className="block text-lionly-sm-bold text-lionly-white"
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="h-11 w-[250px] rounded border border-lionly-white bg-transparent px-5 py-3 text-lionly-sm outline-none placeholder:text-lionly-white"
            ref={inputRef}
            autoComplete="off"
            minLength={minLength}
            maxLength={maxLength}
          />
        </fieldset>
      </form>
      <span
        className={`text-lionly-xs text-lionly-red ${
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
};

export default FormInput;
