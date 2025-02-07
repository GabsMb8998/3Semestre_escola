function Button({label, onClick}){
    return(
        <button className="bg-[#A9D2C5] hover:bg-[#93BFB2] cursor-pointer px-14 py-3 rounded text-white font-medium text-lg " onClick={onClick}>{label}</button>
    )
}

export default Button