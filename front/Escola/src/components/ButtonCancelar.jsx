function ButtonCancelar({onClick}){
    return(
        <button className="border-[1px] border-[#5D5D5D] hover:bg-[#f5f5f5] text-[#5D5D5D] hover:text-[#313131] font-medium rounded px-6 py-2 text-lg" onClick={onClick}>Cancelar</button>
    )
}

export default ButtonCancelar