import { nickNameReg } from '@/utils';
import { func, oneOf, string } from 'prop-types';
import { useId, useRef, useState } from 'react';

function NicknameInput({
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

    const isValid = nickNameReg(inputValue);

    if (isValid || inputValue === '') {
      // console.log('유효한 닉네임입니다.', inputValue);
      setIsErrorShow(false);
    } else {
      // console.error('유효하지 않은 닉네임입니다.', inputValue);
      setIsErrorShow(true);
    }
  };

  return (
    <div className="bg-lionly-primary-color">
      <form action="/" method="post" onSubmit={handleInput}>
        <fieldset>
          <label
            htmlFor={id}
            className="sr-only block text-lionly-sm-bold text-lionly-white"
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="h-9 w-[200px] rounded-md border border-lionly-gray-4 bg-lionly-gray-4 px-8 py-3 text-lionly-sm outline-none placeholder:text-lionly-gray-2"
            ref={inputRef}
            autoComplete="off"
            minLength={minLength}
            maxLength={maxLength}
            onChange={handleInput}
            onSubmit={handleInput}
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

NicknameInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search']),
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
  handleInput: func,
  errorMessage: string.isRequired,
  minLength: string,
  maxLength: string,
};

export default NicknameInput;
