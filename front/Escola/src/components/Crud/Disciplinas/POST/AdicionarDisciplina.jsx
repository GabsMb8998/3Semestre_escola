import { ToastContainer } from "react-toastify"
import ButtonCancelar from "../../../ButtonCancelar"
import ButtonConfirmacaoModal from "../../../ButtonConfirmacaoModal"
import Input from "../../Input"
import TituloCrud from "../../TituloCrud"
import { useState } from "react"
import Button from "../../../Button"
import Modal from "react-responsive-modal"
import TitleModal from "../../../Modal/TitleModal"
import { notifySuccess, notifyError } from '../../../Toasts'
import ConteudoModalAdicionarDisciplinas from "../../../Modal/ConteudoModalAdicionarDisciplinas"

function AdicionarDisciplina(){

    const [codigo, setCodigo] = useState('')
    const [disciplina, setDisciplina] = useState('')
    const [aulas, setAulas] = useState('')

    const [open, setOpen] = useState(false);

    function onOpenModal (){
        setOpen(true);
    }
    const onCloseModal = () => setOpen(false);

    let formData = new FormData()
    formData.append('codigo', codigo)
    formData.append('disciplinas', disciplina)
    formData.append('aulas', aulas)


    function VerificacaoInputs (){
        if (codigo === ''){
            notifyError('Você precisa preencher todos os campos')
            throw new Error(`O campo codigo é obrigatório`);
        }
        if (disciplina === ''){
            notifyError('Você precisa preencher todos os campos')
            throw new Error(`O campo disciplina é obrigatório`);
        }
        if (aulas === ''){
            notifyError('Você precisa preencher todos os campos')
            throw new Error(`O campo aulas é obrigatório`)
        }

        // setContentModal([codigo, disciplina, aulas])
        onOpenModal()
    }

    function AdicionarDisciplina(){

        fetch('http://127.0.0.1:8000/api/disciplina/post', {
            method: "POST",
            headers:     
                {
                // "Authorization": `Bearer ${token}`
            }, 
            body: formData
        }).then(response=>{
    
            // tratativas de erros 
            if (!(Number(aulas) == aulas && !isNaN(aulas))){
                notifyError('Aulas precisa ser um valor numérico')    
                throw new Error(`Erro: ${response.status}`);
            }
            // caso sucesso 
            notifySuccess('Professor adicionado com Sucesso')
        })
    
        onCloseModal()
    }



return(
    <section className="mx-64 px-28 py-20">

        <TituloCrud title={'Adicionar Professor'}/>

        {/* upload imagem  */}
        <div className="flex justify-between gap-x-28">

            {/* dados do professor  */}
            <div className="w-[450px] mr-32 justify-between items-center flex flex-col">

                <div className="flex flex-col gap-y-10 items-center justify-center mb-8 w-full my-14">
                    <Input placeholder={'codigo'} setDado={setCodigo} type={'text'}/>
                    <Input placeholder={'disciplina'} setDado={setDisciplina} type={'text'}/>
                    <Input placeholder={'aula'} setDado={setAulas} type={'number'} />
    
                </div>

                <div className="my-10 w-full">
                    <Button className="bg-[#A9D2C5] button-abrir-modal" onClick={()=>{
                        VerificacaoInputs()
                    }} label={'Adicionar'}>
                        Adicionar Professor
                    </Button>
                </div>
            </div>

            <Modal open={open} onClose={onCloseModal} center styles={{
                modal: {
                    borderRadius: '8px',
                    padding: '30px',
                    width: '600px'

                }
            }}>
                <TitleModal label={'Gostaria de adicionar a disciplina?'}/>

                <div className="mt-2">
                    <ConteudoModalAdicionarDisciplinas codigo={codigo} disciplina={disciplina} aulas={aulas}/> 
                </div>

                <div className="mt-14 flex justify-end gap-x-4"> 
                    <ButtonCancelar onClick={onCloseModal}/>
                    <ButtonConfirmacaoModal label={'Sim'} onClick={()=>AdicionarDisciplina()}/>
                </div>
            </Modal>

        </div>


        {/* necessario para o toast funcionar  */}
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

export default AdicionarDisciplina