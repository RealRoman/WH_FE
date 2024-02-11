import { useState } from "react";

export const TextInput = ({
  placeholder = null,
  name,
  defaultValue = null,
  form,
  disabled,
  required = true,
  password = false,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [ showText, setShowText ] = useState(password)

  const handleInput = (e) => {
    setFocused(e.target.value.trim() !== '' || e.target === document.activeElement);
  };

  return (
    <div className="w-full relative my-6 ">
      <input
        id={name}
        type={showText ? 'password' : 'text'}
        value={defaultValue}  // Use value instead of defaultValue
        className={`autofill:text-white text-lg text-white bg-black border-2 border-solid border-[#333639] focus:outline-none focus:border-2 rounded-md w-full pt-6 pb-1 ps-3 ${
          form.formState.errors[name] ? 'border-rose-600' : 'focus:ring-2 focus:ring-sky-500'
        }`}
        {...form.register(name, { required: required })}
        disabled={disabled}
        onInput={handleInput}  // Use onInput instead of onChange
      />
      <label
        htmlFor={name}
        className={`absolute transition-all transform origin-top ${
          isFocused ? 'left-2 top-2 text-sky-500 text-xs' : 'left-4 top-1/4 text-slate-500'
        }`}
      >
        
        {placeholder}
      </label>
      {password ? 
      <div 
      htmlFor={name}
      className={`absolute right-2 bottom-2 w-6 cursor-pointer`}
      onClick={() => setShowText(!showText)}
      >
      {!showText ?
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="white"><g><path d="M12 21c-7.605 0-10.804-8.296-10.937-8.648L.932 12l.131-.352C1.196 11.295 4.394 3 12 3s10.804 8.296 10.937 8.648l.131.352-.131.352C22.804 12.705 19.606 21 12 21zm-8.915-9c.658 1.467 3.5 7 8.915 7s8.257-5.533 8.915-7c-.658-1.467-3.5-7-8.915-7s-8.257 5.533-8.915 7zM12 16c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"></path></g></svg>
      :
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="white"><g><path d="M3.693 21.707l-1.414-1.414 2.429-2.429c-2.479-2.421-3.606-5.376-3.658-5.513l-.131-.352.131-.352c.133-.353 3.331-8.648 10.937-8.648 2.062 0 3.989.621 5.737 1.85l2.556-2.557 1.414 1.414L3.693 21.707zm-.622-9.706c.356.797 1.354 2.794 3.051 4.449l2.417-2.418c-.361-.609-.553-1.306-.553-2.032 0-2.206 1.794-4 4-4 .727 0 1.424.192 2.033.554l2.263-2.264C14.953 5.434 13.512 5 11.986 5c-5.416 0-8.258 5.535-8.915 7.001zM11.986 10c-1.103 0-2 .897-2 2 0 .178.023.352.067.519l2.451-2.451c-.167-.044-.341-.067-.519-.067zm10.951 1.647l.131.352-.131.352c-.133.353-3.331 8.648-10.937 8.648-.709 0-1.367-.092-2-.223v-2.047c.624.169 1.288.27 2 .27 5.415 0 8.257-5.533 8.915-7-.252-.562-.829-1.724-1.746-2.941l1.438-1.438c1.53 1.971 2.268 3.862 2.33 4.027z"></path></g></svg>
      }
      </div>
      :
      null}
      
      {form.formState.errors[name] ? (
        <div className="text-xs text-rose-600 mx-2 my-2">{form.formState.errors[name]?.message}</div>
      ) : null}
    </div>
  );
};