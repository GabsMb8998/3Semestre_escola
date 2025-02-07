import '../index.css'
import Titulo from '../components/Login/Titulo'
import LabelTitle from '../components/Login/LabelTitle'
import InputLogin from '../components/Login/InputLogin'
import ButtonLogin from '../components/Login/ButtonLogin'

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../components/Toasts'

import { useState } from 'react'

// icons 
import iconUser from "../images/icon-user.svg"
import iconSenha from "../images/icon-senha.svg"
import { useNavigate } from 'react-router-dom'

function Cadastro(){

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    function Cadastrar(username, password){

        if (username === "" || password === "" ){
            notifyError('Você precisa preencher os campos')
            throw new Error('Campos não foram preenchidos');
        }else if (password.length < 4) {
            notifyError('A senha precisa ter mais de 4 caracteres')
        }else if (username.length < 6){
            notifyError('O usuário deve ter ao menos 6 caracteres')
        }
        else{
            fetch('http://127.0.0.1:8000/api/cadastro', {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(response=>{
                if(!response.ok){
                    notifyError('Esse usuário já existe')
                    throw new Error('Failed to fetch token: ' + response.statusText);
                }
                console.log('cadastro feito com sucesso')
                notifySuccess()
                navigate('/')
                return response.json()
            })
        }
    }

    return(
        <div className='flex justify-center items-center h-screen'>
            <div className=" w-[550px] h-[70%] sombra-container-login rounded-[8px] p-22 text-[1.8rem] font-semibold">
                <div className='flex flex-col gap-y-3'>
                        <Titulo title={'SING UP'}/>
                        <LabelTitle label={'Crie um usuário e senha'}/> 
                </div>

                {/* inputs  */}
                <div className='flex flex-col gap-y-8 mt-12'>
                    <InputLogin placeholder={'usuário'} icon={iconUser} type={setUsuario}/>
                    <InputLogin placeholder={'senha'} icon={iconSenha} type={setSenha}/>
                </div>

                 {/* botao Entrar */}
                 <div className='flex justify-center my-14'>
                    <ButtonLogin label={'Cadastrar'} onClick={()=>{
                        Cadastrar(usuario, senha)
                        
                    }} />
                    <ToastContainer
                        className={"editar-toast"}
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

                <div className='mt-14 flex justify-center'>
                    <p className='text-[0.9rem] font-normal text-[#9FA7A2]' >Já possui uma conta? <span className='text-[#8BB9AC] font-medium hover:text-[#667772] hover:font-semibold duration-150 underline underline-offset-4' onClick={()=>navigate('/')}>Faça seu login</span></p>
                </div>

            </div>
        </div>
    )
}

export default Cadastro