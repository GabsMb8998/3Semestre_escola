import TextoPadrao from "../textoPadrao"
import TituloCrud from "../TituloCrud"
import Input from "../Input"
import Button from "../../Button"
import { useState } from "react"
import GetProfessor from "../Get/GetProfessor"
import iconDeletar from "./icon-trash.svg"

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../../Toasts'
import { Modal } from 'react-responsive-modal';

import TitleModal from "../../Modal/TitleModal"
import ConteudoModalOutros from "../../Modal/ConteudoModalOutros"
import ButtonCancelar from "../../ButtonCancelar"
import ButtonConfirmacaoModal from "../../ButtonConfirmacaoModal"
import { use } from "react"

function DeletarProfessor({token}){

    const [valorInput, setValorInput] = useState('') 
    const [professores, setProfessores] = useState('')
    const [id, setId] = useState('')
    const [resultado, setResultado] = useState(false)
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('')

    const onCloseModal = () => {
        setOpen(false);
        
    }
    const onOpenModal = (idProfessor,nomeProfessor) => {
        setId(idProfessor)
        setNome(nomeProfessor)
        setOpen(true)
    };

    console.log(id, id)
    function PesquisaPorId(){
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
            setProfessores(data)
            setResultado(true)
        })
    }

    function deletarProfessor(idProfessor, nomeProfessor){
        fetch(`http://127.0.0.1:8000/api/deletar/${idProfessor}`,{
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`}
        }).then(response=>{
            if(!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            notifySuccess(`Professor ${nomeProfessor} removido com Sucesso`)
            onCloseModal()
            PesquisaPorId()
        })
    }


    return(
        <section className="px-28 py-20 mx-64">
            <TituloCrud title={'Deletar Professor'}/>

            {!resultado ? (
                <div>
                    <div className="mt-14 w-[450px] gap-y-7 flex flex-col">
                        <TextoPadrao content={'insira o ID ou o nome do professor'}/>
                        <Input placeholder={'ex. : Lindomar Batistão'} setDado={setValorInput} type={'text'}/>
                    </div>

                    <div className="mt-8">
                        <Button label={'Procurar'} onClick={PesquisaPorId}/>
                    </div>  
                </div>
            ):(
                <div className="mt-14">
                    <TextoPadrao content={`Resultado para a pesquisa: ${valorInput}`}/>

                    <div className="mt-16 flex flex-col gap-y-20">
                        {     
                            professores.map((professor, index)=>(
                                <GetProfessor key={index} nome={professor.nome} ni={professor.ni} cargo={professor.cargo} email={professor.email} imagem={professor.imagem}
                                 TemAcao={true} labelButton={'deletar'} iconButton={iconDeletar} acaoButton={onOpenModal} idProfessor={professor.id} />     
                            ))
                        }
                    </div>
                </div>
            )
            }

                <Modal open={open} onClose={onCloseModal} center styles={{
                    modal: {
                        borderRadius: '8px',
                        padding: '30px',
                        width: '600px'
                    }
                }}>
                    <TitleModal label={'Gostaria de deletar o professor?'}/>

                    <div className="mt-2">
                        <ConteudoModalOutros conteudo={`Após deletar um professor não será possivel  recuperá-lo`}/> 
                    </div>

                    <div className="mt-14 flex justify-end gap-x-4"> 
                        <ButtonCancelar onClick={onCloseModal}/>
                        <ButtonConfirmacaoModal label={'Sim'} onClick={()=>deletarProfessor(id, nome)}/>
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


        </section>
    )
}

export default DeletarProfessor