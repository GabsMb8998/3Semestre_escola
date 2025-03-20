function DadoProfessor({label, item}){
    return(
        <div className="flex gap-x-2 text-lg relative left-0.5 ">
            <p>{item} : </p>
            <p>{label}</p>
        </div>
      
    )
}

export default DadoProfessor