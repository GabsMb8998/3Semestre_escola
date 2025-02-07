function Input({placeholder, setDado, type}){
    return(
       <input type={type} placeholder={placeholder} onChange={(e)=>setDado(e.target.value)} className="border-b-[1.5px] border-[#c5c4c4] text-[#c5c4c4] py-3 px-2 w-full font-medium" />
    )
}

export default Input