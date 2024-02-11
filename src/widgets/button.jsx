import { useEffect, useState } from "react"

export const Button = ({children, relevance='primary', path_to_logo="", disabled=false, large=false, onClick: parentClick}) =>{
    const [useDisabled, setUseDisabled] = useState(disabled)
    const className = ['rounded-full', 'text-center', 'font-bold', 'w-full', 'h-full', 'border-solid', 'hover:opacity-80', 'cursor-pointer']
    relevance === 'primary' ? className.push('text-white', 'bg-sky-500', 'border-0') : ''
    relevance === 'primary' ? className.push('text-sky-700', 'bg-black', 'border-2', 'border-slate-600'): ''
    switch (relevance) {
        case 'primary':
            className.push('text-white', 'bg-sky-500', 'border-2', 'border-sky-500')
            break;
    
        case 'secondary':
            className.push('text-sky-700', 'bg-black', 'border-2', 'border-slate-600')
            break;

        case 'tertiary':
            className.push('text-black', 'bg-white', 'border-2', 'border-white')
            break;
    
        default:
            break;
    }
    useDisabled ? className.push( 'opacity-50' ) : null


    const handleClick = async () =>{
        setUseDisabled(true)
        await parentClick()
        setUseDisabled(disabled)
    }


    useEffect(()=>{
        useDisabled ? className.push( 'opacity-50' ) : null
    }, [useDisabled])

    return (
        <button className={className.join(" ")} onClick={handleClick} disabled={useDisabled}>
            {children}
        </button>
    )
}