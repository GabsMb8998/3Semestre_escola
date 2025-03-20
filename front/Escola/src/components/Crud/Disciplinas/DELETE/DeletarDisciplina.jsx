import TextoPadrao from "../../textoPadrao"
import TituloCrud from "../../TituloCrud"
import Input from "../../Input"
import Button from "../../../Button"
import { useState, useEffect } from "react"

// icons 
import iconDeletar from "../../../../images/icon-trash.svg"
import iconBack from "../../../icons/icon-back.svg"

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../../../Toasts'
import { Modal } from 'react-responsive-modal';

import TitleModal from "../../../Modal/TitleModal"
import ConteudoModalOutros from "../../../Modal/ConteudoModalOutros"
import ButtonCancelar from "../../../ButtonCancelar"
import ButtonConfirmacaoModal from "../../../ButtonConfirmacaoModal"
import SyncLoader   from "react-spinners/SyncLoader";
import NotFound from "../../NotFound"
import GetDisciplinas from "../GET/GetDisciplinas"
import ItemGetDisciplinas from "../GET/ItemGetDisciplinas"




function DeletarDisciplina({token}){

    const [valorInput, setValorInput] = useState('') 
    const [disciplinas, setDisciplinas] = useState('')
    const [id, setId] = useState('')
    const [resultado, setResultado] = useState(false)
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('')

    const [notFound, setNotFound] = useState(false)

    let [loading, setLoading] = useState(false);

    const onCloseModal = () => {setOpen(false)}
    const onOpenModal = (idDisciplina) => {
        setId(idDisciplina)
        // setNome(nomeProfessor)
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
        fetch(`http://127.0.0.1:8000/api/filtros/disciplina/?codigo=${valorInput}`, {
            headers: { 
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`}
            }
        }).then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json()

        }).then(data=>{
            console.log(data)

            if (data.length == 0){
                setNotFound(true)
                setResultado(false)

            }else {
                setDisciplinas(data)
                setNotFound(false)
                setResultado(true)
            }
        })
    }

    function deletarDisicplina(idDisciplina) {
        fetch(`http://127.0.0.1:8000/api/disciplina/delete/${idDisciplina}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`}
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            notifySuccess(`Disciplina deletada com sucesso`);
            onCloseModal();
        });
    
        if (disciplinas.length === 1) {
            setResultado(false);
            setNotFound(false); 
            carregando()
            PesquisaPorId()
        }
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
                        <img className="cursor-pointer " src={iconBack} alt=""  onClick={()=>{
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

                    <TituloCrud title={'Deletar Professor'}/>    

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
                            disciplinas.map((disciplina, index)=>(
                                <ItemGetDisciplinas key={index} codigo={disciplina.codigo} disciplina={disciplina.disciplinas} aulas={disciplina.aulas}
                                 TemAcao={true} labelButton={'deletar'} iconButton={iconDeletar} acaoButton={onOpenModal} idDisciplina={disciplina.id} />     
                            ))
                        }
                    </div>
                </div>
            ):(
                <div></div>
            )
            }

                <Modal open={open} onClose={onCloseModal} center styles={{
                    modal: {
                        borderRadius: '8px',
                        padding: '30px',
                        width: '600px'
                    }
                }}>
                    <TitleModal label={'Gostaria de deletar a disciplina?'}/>

                    <div className="mt-2">
                        <ConteudoModalOutros conteudo={`Após deletar uma disciplina não será possivel  recuperá-la`}/> 
                    </div>

                    <div className="mt-14 flex justify-end gap-x-4"> 
                        <ButtonCancelar onClick={onCloseModal}/>
                        <ButtonConfirmacaoModal label={'Sim'} onClick={()=>deletarDisicplina(id)}/>
                    </div>
                </Modal>

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

export default DeletarDisciplina