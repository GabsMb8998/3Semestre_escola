function Button({label, onClick}){
    return(
        <button className="bg-[#9bc4b7] hover:bg-[#8ab4a7] cursor-pointer px-14 py-3 rounded text-white font-medium text-lg w-full " onClick={()=>onClick()}>{label}</button>
    )
}

export default Button