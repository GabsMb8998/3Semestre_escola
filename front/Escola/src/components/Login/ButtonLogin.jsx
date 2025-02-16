function ButtonLogin({label, onClick}){
    return(
        <button  className='bg-[#A9D2C5] hover:bg-[#93BFB2]  duration-300 font-medium text-white text-[1.2rem] px-16 py-[10px] rounded w-full'  onClick={onClick}> {label} </button>
    )
}

export default ButtonLogin