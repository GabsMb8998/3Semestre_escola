function ButtonCrud({label, icon, onClick, idProfessor, nomeProfessor}){
    return(

        <div className="flex gap-x-3 items-end mt-2">
            <img src={icon} className="w-6" alt="" />
            <button className="text-[#A9D2C5] underline underline-offset-1 font-medium text-xl" onClick={()=>onClick(idProfessor, nomeProfessor)}>{label}</button>
        </div>
    )
}

export default ButtonCrud