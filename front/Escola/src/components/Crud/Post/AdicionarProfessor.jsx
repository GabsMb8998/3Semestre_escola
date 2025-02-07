import TituloCrud from "../TituloCrud"
import iconCamera from "./icon-camera.svg"
import Input from "../Input"
import '../../../index.css'
import Button from "../../Button"
import { useState } from "react"

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../../Toasts'

function AdicionarProfessor({token}){

    const [nome, setNome] = useState('')
    const [ni, setNi] = useState('')
    const [email, SetEmail] = useState('')
    const [cargo, SetCargo] = useState('')
    const [imagem, setImagem] = useState('')

    let formData = new FormData()

    const handleFileChange = (e) => {
        setImagem(e.target.files[0]); 
    };


    function adicionarProfessor(){

        if (nome !== ''){
            formData.append('nome', nome)
        }
        if (ni !== ''){
            formData.append('ni', ni)
        }
        if (email !== ''){
            formData.append('email', email)
        }
        if (cargo !== ''){
            formData.append('cargo', cargo)
        }
        if (imagem !== ''){
            formData.append('imagem', imagem)
        }
        


        fetch('http://127.0.0.1:8000/api/adicionar', {
            method: "POST",
            headers:     
                {"Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
            body: formData
        }).then(response=>{
            if(!response.ok){

                // if(isNaN(cargo) === false){
                //     console.log(!isNaN(cargo))
                //     notifyError('Cargo precisa ser um valor numérico')
                // }

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
            notifySuccess('Professor adicionado com Sucesso')
        
        })
    }

    console.log(nome, 'nome')
    return(
        <section className="mx-64 px-28 py-20">

            <TituloCrud title={'Adicionar Professor'}/>

            {/* upload imagem  */}
            <div className="flex justify-between gap-x-28">
                <div className="flex justify-center flex-col items-center gap-y-6 cursor-pointer p-28 ">
                        <div className="w-52 h-52 rounded-full border-2 border-[#E3E3E3] flex justify-center items-center sombra-adicionar-imagem">
                            <img src={iconCamera} alt="" />
                        </div>

                        <div>
                            <input type="file" className="text-[#737373] underline underline-offset-1 text-lg" onChange={()=>handleFileChange()}/>
                 
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
                        <Button label={'adicionar'} onClick={()=>adicionarProfessor()}/>
                    </div>
                </div>
            </div>

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