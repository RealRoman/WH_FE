export const Submit = ({disabled=false, text, submit=true, onClick=()=>{}}) =>{
    const type = submit ? 'submit' : 'button'
    return (
        <div>
            <input onClick={()=>{onClick()}} value={text} type={type} disabled={disabled} className={`cursor-pointer p-3 text-xl text-black font-bold bg-white rounded-full w-full text-center ${disabled ? 'opacity-50' : 'hover:opacity-75 '}`}/>
        </div>
    )
}