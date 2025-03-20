import ButtonCrud from "../../ButtonCrud"
import ButtonCrudDisciplina from "../ButtonCrudDisciplina"

function ItemGetDisciplinas({codigo, disciplina, aulas, TemAcao, idDisciplina, acaoButton, iconButton, labelButton}){
    return(
        <div>
            <h5 className="text-[#949494] text-[1.5rem] font-medium">{codigo}</h5>
            <div className="text-[#B0AEAE] text-lg">
                <p>Disciplina: {disciplina}</p>
                <p>aulas: {aulas}</p>
            </div>

            {TemAcao && (
                <div>
                    <ButtonCrudDisciplina onClick={acaoButton} label={labelButton} icon={iconButton} idDisciplina={idDisciplina}/> 
                    {/* <ButtonCrud label={labelButton} icon={iconButton} onClick={acaoButton} id={id} nomeProfessor={nome}/>  */}
                </div>
            )}
        </div>
    )
}

export default ItemGetDisciplinas