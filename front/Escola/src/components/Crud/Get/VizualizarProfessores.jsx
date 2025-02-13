import TituloCrud from "../TituloCrud"
import GetProfessor from "./GetProfessor"
import { useEffect, useState } from "react"


function VizualizarProfessores({token}){

    const [professores, setProfessores] = useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/professores', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json()
        }).then(data=>{
            setProfessores(data)
            })
        },[])

    return(
        <div className="px-28 py-20 mx-64">
            <TituloCrud title={'Professores'}/>

            {/* professores  */}
            <ul className="my-20 flex flex-col gap-y-20 w-[750px]">

                {professores.map((professor, index)=>(
                    <GetProfessor key={index}  nome={professor.nome} ni={professor.ni} email={professor.email} cargo={professor.cargo} imagem={professor.imagem}/>
                ))}

                {/* {professores.map((professor)=>{
                    <GetProfessor nome={professor.nome}/>

                    console.log(professor)
                    })} */}
    
            </ul>
        </div>
    )
}

export default VizualizarProfessores