import { Controller } from 'react-hook-form';
import Select from 'react-select'
import chroma from 'chroma-js';


export const SelectInput = ({ placeholder = null, name, defaultValue = null, form, disabled = false, required = true, options = [], onChange = () => {}, multi = false, register = true }) => {
    const handleChange = (e) => {
      register ? form.setValue(name, e) : null;
      onChange(e);
    };
  
    return (
      <div>
        <div className={'text-sky-500'}>
            <label
            htmlFor={name}>
            {placeholder}
            </label>
           
        </div>
         
        <div className='mt-3'>
            {register ? (
            <Controller
                required={required}
                name={name}
                control={form.control}
                render={({ field }) => (
                <Select {...field} options={options} required={required} isDisabled={disabled} isMulti={multi} onChange={(e) => { handleChange(e) }} styles={colourStyles}/>
                )}
            />
            ) : (
            <Select options={options} isDisabled={disabled} isMulti={multi} onChange={(e) => { handleChange(e) }} styles={colourStyles}/>
            )}
    
            
            {register && form.formState.errors[name] ? <div className="text-xs text-rose-600 mx-2 my-2">{form.formState.errors[name]?.message}</div> : null}
        </div>
      </div>
    );
  };


const colourStyles = {
    control: (provided) => ({
      ...provided,
      background: 'black',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused
        ? `linear-gradient(to right, grey, black)`
        : 'black',
      color: state.isFocused ? '#FFFFFF' : 'grey',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'grey',
    }),
    multiValue: (provided) => ({
      ...provided,
      background: 'black',
      borderRight: '2px solid white',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent', // Set background to transparent by default
        '&:hover': {
          backgroundColor: 'grey', // Set background hover color to grey
          '& svg': {
            fill: 'red', // Set icon color to red on hover
          },
        },
        '& svg': {
          fill: 'white', // Set initial icon color to transparent
        },
      }),
  };