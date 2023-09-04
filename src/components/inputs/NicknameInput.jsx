import { oneOf, string } from 'prop-types';
import { useId } from 'react';

function NicknameInput({ type, name = null, label, placeholder }) {
  const id = useId();
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
            className="h-9 w-[200px] rounded-md border border-lionly-gray-4 bg-lionly-gray-4 px-10 py-3 text-lionly-sm outline-none placeholder:text-lionly-gray-2"
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
