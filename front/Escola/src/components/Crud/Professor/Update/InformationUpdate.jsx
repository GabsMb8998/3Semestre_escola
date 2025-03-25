import TituloCrud from "../../TituloCrud"
import iconCamera from "../../../icons/icon-camera.svg"
import Input from "../../Input"
import '../../../../index.css'
import Button2 from "../../../Button"
import { useState } from "react"
import 'react-responsive-modal/styles.css';

// import "../../App.jsx"

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../../../Toasts'
import { Modal } from 'react-responsive-modal';


import Button from '../../../Button';
import TitleModal from "../../../Modal/TitleModal"
import ConteudoModal from "../../../Modal/ConteudoModal"
import ButtonCancelar from "../../../ButtonCancelar"
import ButtonConfirmacaoModal from "../../../ButtonConfirmacaoModal"
import ConteudoModalUpdate from "../../../Modal/ConteudoModalUpdate"


function InformationUpdate({token, infoUpdate}){
    
    const [professor, setProfessor] = useState([infoUpdate])
    const [nome, setNome] = useState('')
    const [ni, setNi] = useState('')
    const [email, SetEmail] = useState('')
    const [cargo, SetCargo] = useState('')
    const [imagem, setImagem] = useState(professor.map((professor)=>professor.imagem))
    
    const[prevImagem, setPrevImagem] = useState('')
    
    const [contentModal, setContentModal] = useState([])
    const [open, setOpen] = useState(false);
    
    let formData = new FormData()
    
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setImagem(file);
        setPrevImagem(URL.createObjectURL(file))
    };

    function onOpenModal (){
        setOpen(true);
    }
    const onCloseModal = () => setOpen(false);

    function adicionarFormulario(){

      
        if (cargo != ''){

            if (!(Number(cargo) == cargo && !isNaN(cargo))){
                notifyError('Cargo precisa ser um valor numérico')    
                throw new Error(`Erro: ${response.status}`);

            }else if (Number(cargo) > 3 || Number(cargo) < 1){
                notifyError('Cargo é somente entre 1 e 3')
                throw new Error(`Erro: ${response.status}`);
            }

            console.log('cargo foi adiconado')
    
        }
        if (email != ''){
            console.log('email foi adiconado')
            
            if (email.includes("@gmail.com") === false){
                notifyError('Email inválido. Tente novamente')
                throw new Error(`Erro: ${response.status}`);
            }
        }
        if (imagem != professor[0].imagem){
            console.log('imagem foi adiconado')
      
        }
        
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
            console.log('nao funcionaaaaa')
        }

        onOpenModal()
    }
    

    
    function atualizarProfessor(){ 

        if (nome != ''){
            console.log('nome foi adiconado')
            console.log(nome, 'teste n funcionando')
            formData.append("nome" , nome)
        }
        
        if (ni != ''){
            console.log('ni foi adiconado')
            formData.append("ni" , ni)
        }
        if (cargo != ''){
            formData.append("cargo", cargo)
        }

        if (email != ''){
            formData.append("email", email)
        }

        if (imagem != professor[0].imagem){
            formData.append("imagem", imagem)
        }


        fetch(`http://127.0.0.1:8000/api/atualizar/${professor[0].id}`, {
            method: 'PATCH',
            body: formData
        })
            .then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }

            onCloseModal()
            notifySuccess('Professor Atualizado com sucesso')
            return null
        })
    }

    return(
        <section className="mx-64 px-28 py-20">

            <TituloCrud title={'Atualizar Professor'}/>

            {/* upload imagem  */}
            <div className="flex justify-between gap-x-28">
                <div className="flex justify-center flex-col items-center gap-y-10  p-28 ">
                        <div className="w-56 h-56 rounded-full border-2 border-[#E3E3E3] flex justify-center items-center sombra-adicionar-imagem">
                            <img className={` w-56 h-56 rounded-full sombra-adicionar-imagem`} src={ prevImagem || `http://127.0.0.1:8000${imagem[0]}` } alt="" />
                        </div>

                        <div className="relative">
                            <input type="file" className="text-[#737373] underline underline-offset-1 text-lg opacity-0 z-20 w-36 " onChange={handleFileChange}/>
                            <p className="text-[#737373] underline underline-offset-1 text-xl absolute w-full bottom-0 left-1 -z-10">Mudar Foto</p>
                        </div>
                </div>

                {/* dados do professor  */}
                <div className="w-[450px] mr-32 justify-between items-center flex flex-col">

                  

                        {professor.map((professor, index)=>(
                              <div className="flex flex-col gap-y-10 items-center justify-center mb-8 w-full my-14" key={index}>
                                    <Input placeholder={`nome: ${professor.nome}`} setDado={setNome} type={'text'}/>
                                    <Input placeholder={`Ni: ${professor.ni}`} setDado={setNi} type={'text'}/>
                                    <Input placeholder={`Email: ${professor.email}`} setDado={SetEmail} type={'text'} />
                                    <Input placeholder={`Cargo: ${professor.cargo}`} setDado={SetCargo} type={'text'}/>
                            </div>

                        ))}

                    <div className="my-10">
                        <Button className="bg-[#A9D2C5] button-abrir-modal" onClick={()=>{adicionarFormulario()}} label={'Atualizar'}/>
                    </div>
                </div>
                    
                {/* modal  */}
                <Modal open={open} onClose={onCloseModal} center styles={{
                    modal: {
                        borderRadius: '8px',
                        padding: '30px',
                        width: '600px'

                    }
                }}>
                    <TitleModal label={`Gostaria de modificar o professor ${professor[0].nome}? `}/>

                    <div className="mt-2">
                        <ConteudoModalUpdate nome={nome} ni={ni} email={email} cargo={cargo}/> 
                    </div>

                    <div className="mt-14 flex justify-end gap-x-4"> 
                        <ButtonCancelar onClick={onCloseModal}/>
                        <ButtonConfirmacaoModal label={'Sim'} onClick={()=>atualizarProfessor()}/>
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

export default InformationUpdate