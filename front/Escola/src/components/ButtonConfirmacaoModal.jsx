function ButtonConfirmacaoModal({label, onClick}){
    return(
        <button className="bg-[#A9D2C5] hover:bg-[#a7ccc0] duration-100 text-white font-medium px-12 text-lg rounded" onClick={onClick}>{label}</button>
    )
}

export default ButtonConfirmacaoModal