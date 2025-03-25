import TextoPadrao from "../../textoPadrao"
import TituloCrud from "../../TituloCrud"
import Input from "../../Input"
import Button from "../../../Button"
import { useState, useEffect } from "react"
import GetProfessor from "../Get/GetProfessor"

// icons 
import iconEdit from "./iconEdit.svg"
// import iconBack from "../../icons/icon-back.svg"

import { ToastContainer, } from 'react-toastify';
import SyncLoader   from "react-spinners/SyncLoader";
import NotFound from "../../NotFound"




function Update({token,setInformationUpdate, informationUpdate, setInfoUpdate}){

    const [valorInput, setValorInput] = useState('') 
    const [professores, setProfessores] = useState('')
    const [resultado, setResultado] = useState(false)

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('')

    const [notFound, setNotFound] = useState(false)

    let [loading, setLoading] = useState(false);

    
    console.log(informationUpdate)
    const onCloseModal = () => {setOpen(false)}
    const onOpenModal = (idProfessor,nomeProfessor) => {
        setId(idProfessor)
        setNome(nomeProfessor)
        setOpen(true)
    };

    function carregando(){
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }

    function PesquisaPorId(){
        carregando()
        fetch(`http://127.0.0.1:8000/api/filtros/professor/?nome=${valorInput}`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`}
        }).then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json()

        }).then(data=>{
      
            if (data.length == 0){
                setNotFound(true)
                setResultado(false)

            }else {
                setProfessores(data)
                setNotFound(false)
                setResultado(true)
            }
        })
    }

    return(
        <section className="px-28 py-16 mx-64">

            {
                loading ? (
                    <div className="w-full h-[70vh] flex justify-center items-center">
                        <SyncLoader 
                            color={"#93BFB2"}
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"/>
                    </div>
                ) : (

                    <div>
                    {(resultado || notFound) && (
                    <div className="mb-10">
                        <img className="cursor-pointer " alt=""  onClick={()=>{
                            setResultado(false)
                            setNotFound(false)
                            }}/>   
                    </div>
            )}

            {notFound === true && (
                <NotFound/>
            )}

            {(!resultado && !notFound) ? (
                <div>

                    <TituloCrud title={'Atualizar Professor'}/>    

                    <div className="mt-10 w-[450px] gap-y-7 flex flex-col">
                        <TextoPadrao content={'insira o ID ou o nome do professor'} tamanho={true}/>
                        <Input placeholder={'ex. : Lindomar Batistão'} setDado={setValorInput} type={'text'}/>
                    </div>

                    <div className="mt-8">
                        <Button label={'Procurar'} onClick={PesquisaPorId}/>
                    </div>  
                </div>
            ) : resultado ?  (
                <div className="mt-14">

                    <TextoPadrao content={`Resultado para a pesquisa: ${valorInput}`}/>

                    <div className="mt-16 flex flex-col gap-y-20">
                        {     
                            professores.map((professor, index)=>(
                                <GetProfessor key={index} nome={professor.nome} ni={professor.ni} cargo={professor.cargo} email={professor.email} imagem={professor.imagem}
                                 TemAcao={true} labelButton={'atualizar'} iconButton={iconEdit} acaoButton={()=>{
                                    setInformationUpdate(!informationUpdate)
                                    setInfoUpdate(professores[index])
                                }} idProfessor={professor.id} />     
                            ))
                        }
                    </div>
                </div>
            ):(
                <div></div>
            )
            
            }
                <ToastContainer
                className={"editar-toast px-10"}
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                />
                    </div>
                )
            }

        </section>
    )
}

export default Update