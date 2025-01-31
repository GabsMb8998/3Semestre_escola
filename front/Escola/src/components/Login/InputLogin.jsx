function InputLogin({icon, placeholder, type}){
    return(
        <div className="relative">
            <img src={icon} alt="" className="absolute bottom-3 left-1 focus:none" />
            <input type={placeholder === 'senha' ? 'password' : 'text'} placeholder={placeholder} className="border-b-[1px] border-[#A6AFAB] text-[1rem] placeholder:text-[#7A7A7A] text-[#7A7A7A] font-normal px-10 py-3 w-full"
            onChange={(e)=>type(e.target.value)} />
        </div>
    )
}

export default InputLogin