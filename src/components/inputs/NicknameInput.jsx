import { oneOf, string } from 'prop-types';
import { useId, useRef } from 'react';

function NicknameInput({ type, name = null, label, placeholder }) {
  const id = useId();
  const inputRef = useRef(null);

  const handleInput = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    console.log(inputValue);
  };

  return (
    <div>
      <form action="/" method="post" onSubmit={handleInput}>
        <fieldset className="bg-lionly-primary-color ">
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
          />
        </fieldset>
      </form>
    </div>
  );
}

NicknameInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search']),
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
};

export default NicknameInput;
