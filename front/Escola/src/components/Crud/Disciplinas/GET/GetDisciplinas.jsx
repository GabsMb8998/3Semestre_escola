import { useEffect, useState } from "react";
import TituloCrud from "../../TituloCrud";
import ItemGetDisciplinas from "./ItemGetDisciplinas";


function GetDisciplinas(){
    const [disciplinas, setDisciplinas] = useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/disciplina/get', {
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`
            }
        }).then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json()
        }).then(data=>{
            setDisciplinas(data)
            })
        },[])

        console.log(disciplinas)

    return(
        <div className="px-28 py-20 mx-64">
            <TituloCrud title={'Disciplinas'}/>

            {/* professores  */}
            <ul className="my-20 flex flex-col gap-y-24 w-[750px]">

                {disciplinas.map((disciplina, index)=>(
                    <ItemGetDisciplinas key={index}  codigo={disciplina.codigo} disciplina={disciplina.disciplinas} aulas={disciplina.aulas} />
                ))}

                {/* {professores.map((professor)=>{
                    <GetProfessor nome={professor.nome}/>

                    console.log(professor)
                    })} */}
    
            </ul>
        </div>

        )
}

export default GetDisciplinas