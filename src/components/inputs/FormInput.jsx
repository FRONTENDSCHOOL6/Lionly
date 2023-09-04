import { oneOf, string } from 'prop-types';
import { useRef, useId } from 'react';

function FormInput({ type, name = null, label, placeholder }) {
  const id = useId();
  const inputRef = useRef(null);
  console.log(inputRef.current.value);

  return (
    <div>
      <form action="/" method="post">
        <fieldset className="bg-lionly-primary-color">
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
            className="h-11 w-[250px] rounded border border-lionly-white bg-transparent py-3 pl-5 text-lionly-sm outline-none placeholder:text-lionly-white"
            ref={inputRef}
          />
        </fieldset>
      </form>
    </div>
  );
}

FormInput.propTypes = {
  type: oneOf(['text', 'password', 'number', 'email', 'search']),
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
};

export default FormInput;
