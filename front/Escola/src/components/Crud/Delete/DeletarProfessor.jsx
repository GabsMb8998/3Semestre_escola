import TextoPadrao from "../textoPadrao"
import TituloCrud from "../TituloCrud"
import Input from "../Input"
import Button from "../../Button"
import { useState } from "react"
import GetProfessor from "../Get/GetProfessor"

function DeletarProfessor({token}){
    const [id, setId ]= useState('')
    const [nameInput, setNameInput ]= useState('')

    const [nome, setNome] = useState('')
    const [ni, setNi] = useState('')
    const [email, setEmail] = useState('')
    const [cargo, setCargo] = useState('')
    const [imagem, setImagem] = useState('')

    const [resultado, setResultado] = useState(false)



    function PesquisaPorId(){
        fetch(`http://127.0.0.1:8000/api/professor/${Number(id)}`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`}
        }).then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json()
        }).then(data=>{
            console.log(data)
            setResultado(true)
            setNome(data.nome)
            setNi(data.ni)
            setEmail(data.email)
            setCargo(data.cargo)
            setImagem(data.imagem)
        })
    }

    return(

        <section className="px-28 py-20 mx-64">
            <TituloCrud title={'Deletar Professor'}/>

            {!resultado ? (

                <div>
                    <div className="mt-14 w-[450px] gap-y-7 flex flex-col">
                        <TextoPadrao content={'insira o ID ou o nome do professor'}/>
                        <Input placeholder={'ex. : Lindomar Batistão'} setDado={setId} type={'text'}/>
                    </div>

                    <div className="mt-8">
                        <Button label={'Procurar'} onClick={PesquisaPorId}/>
                    </div>  
                </div>
            ):(
                <div className="mt-14">
                    <TextoPadrao content={`Resultado para a pesquisa: ${id}`}/>

                    <div className="mt-16">
                        <GetProfessor nome={nome} ni={ni} cargo={cargo} email={email} imagem={imagem}/>
                    </div>
                </div>
            )
            }

        </section>
    )
}

export default DeletarProfessor