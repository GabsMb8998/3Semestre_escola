function ConteudoModalAdicionarDisciplinas({codigo, disciplina, aulas}){
    return(
        <div className="text-xl text-[#ADADAD] flex flex-col gap-y-2 mt-3">
            <p>codigo : {codigo}</p>
            <p>disciplina : {disciplina}</p>
            <p>aulas : {aulas}</p>
        </div>
    )
}

export default ConteudoModalAdicionarDisciplinas