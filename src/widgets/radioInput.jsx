export const RadioInput = ({name, value, label, subLabel, onChange=()=>{ }, form}) =>{


    return(
        <div className="flex flex-row">
            <div className="my-auto me-12">
                <input type="radio" name={name} value={value} id={`${name}_${value}`} className="relative appearance-none w-7 h-7 border-2 border-slate-500 border-solid rounded-full checked:bg-sky-500 checked:border-white transition-all" onChange={(e) => onChange(e)} {...form.register(name)}/>
            </div>
            <div className="my-auto">
                <h2>{label}</h2>
                <p>{subLabel}</p>
            </div>
            
        </div>
    );
}