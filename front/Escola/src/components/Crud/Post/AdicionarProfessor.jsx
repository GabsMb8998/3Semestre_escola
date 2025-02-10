import TituloCrud from "../TituloCrud"
import iconCamera from "./icon-camera.svg"
import Input from "../Input"
import '../../../index.css'
import Button2 from "../../Button"
import { useState } from "react"

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../../Toasts'

import Button from 'react-bootstrap/Button';
import ModalMy from '../../ModalMy';

function AdicionarProfessor({token}){

    const [nome, setNome] = useState('')
    const [ni, setNi] = useState('')
    const [email, SetEmail] = useState('')
    const [cargo, SetCargo] = useState('')
    const [imagem, setImagem] = useState('')

    const[prevImagem, setPrevImagem] = useState('')


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    let formData = new FormData()

    const handleFileChange = (e) => {

        const file = e.target.files[0]
        setImagem(file); 
        setPrevImagem(URL.createObjectURL(file))
    };


    function adicionarProfessor(){

            if (nome !== ''){
                formData.append('nome', nome)
            }else {
                notifyError('Você precisa preencher todos os campos')
                throw new Error(`O campo nome é obrigatório`);
            }
            if (ni !== ''){
                formData.append('ni', ni)
            }else {
                notifyError('Você precisa preencher todos os campos')
                throw new Error(`O campo ni é obrigatório`);
            }
            if (email !== ''){
                formData.append('email', email)
            }else {
                notifyError('Você precisa preencher todos os campos')
                throw new Error(`O campo email é obrigatório`);
            }
            if (cargo !== ''){
                formData.append('cargo', cargo)
            }else {
                notifyError('Você precisa preencher todos os campos')
                throw new Error(`O campo cargo é obrigatório`);
            }
            if (imagem !== ''){
                console.log(imagem)
                formData.append('imagem', imagem)
            }else {
                notifyError('Você precisa preencher todos os campos')
                throw new Error(`O campo imagem é obrigatório`);
            }
        
        
        


        fetch('http://127.0.0.1:8000/api/adicionar', {
            method: "POST",
            headers:     
                {
                "Authorization": `Bearer ${token}`
            }, 
            body: formData
        }).then(response=>{

            // tratativas de erros 
            if(!response.ok){

                if (email.includes("@gmail.com") === false){
                    notifyError('Email inválido. Tente novamente')
                }
                throw new Error(`Erro: ${response.status}`);
            }

            if (!(Number(cargo) == cargo && !isNaN(cargo))){
                notifyError('Cargo precisa ser um valor numérico')    
                throw new Error(`Erro: ${response.status}`);

            }else if (Number(cargo) > 3 || Number(cargo) < 1){
                notifyError('Cargo é somente entre 1 e 3')
                throw new Error(`Erro: ${response.status}`);
            }
            // caso sucesso 
            notifySuccess('Professor adicionado com Sucesso')
        })
    }

    return(
        <section className="mx-64 px-28 py-20">

            <TituloCrud title={'Adicionar Professor'}/>

            {/* upload imagem  */}
            <div className="flex justify-between gap-x-28">
                <div className="flex justify-center flex-col items-center gap-y-10  p-28 ">
                        <div className="w-56 h-56 rounded-full border-2 border-[#E3E3E3] flex justify-center items-center sombra-adicionar-imagem">
                            <img className={`${prevImagem !== "" && "w-56 h-56 rounded-full sombra-adicionar-imagem" }`} src={prevImagem || iconCamera} alt="" />
                        </div>

                        <div className="relative">
                            <input type="file" className="text-[#737373] underline underline-offset-1 text-lg opacity-0 z-20 w-36 " onChange={handleFileChange}/>
                            <p className="text-[#737373] underline underline-offset-1 text-xl absolute w-full bottom-0 left-1 -z-10">Adicionar foto</p>
                        </div>
                </div>

                {/* dados do professor  */}
                <div className="w-[450px] mr-32 justify-between items-center flex flex-col">

                    <div className="flex flex-col gap-y-10 items-center justify-center mb-8 w-full my-14">
                        <Input placeholder={'nome'} setDado={setNome} type={'text'}/>
                        <Input placeholder={'ni'} setDado={setNi} type={'text'}/>
                        <Input placeholder={'email'} setDado={SetEmail} type={'text'} />
                        <Input placeholder={'cargo'} setDado={SetCargo} type={'text'}/>
                    </div>

                    <div className="my-10">
                        <Button className="bg-[#A9D2C5] button-abrir-modal" onClick={handleShow}>
                            Adicionar Professor
                        </Button>
                    </div>
                </div>
            </div>

            <ModalMy
                show={show}
                handleClose={handleClose}
                handleConfirm={() => { adicionarProfessor(); handleClose; }}
                title="Confirmar Cadastro"
                body="Deseja adicionar o professor com os dados fornecidos?"
            />

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

export default AdicionarProfessor