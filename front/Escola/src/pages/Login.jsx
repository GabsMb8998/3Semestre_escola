import '../index.css'
import InputLogin from '../components/Login/InputLogin'

// icons 
import iconUser from "../images/icon-user.svg"
import iconSenha from "../images/icon-senha.svg"

import { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import Titulo from '../components/Login/Titulo'
import LabelTitle from '../components/Login/LabelTitle'
import ButtonLogin from '../components/Login/ButtonLogin'

import { ToastContainer, } from 'react-toastify';
import { notifySuccess, notifyError } from '../components/Toasts'

function Login(){

    const [token, setToken] = useState('')
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const [user, setUser] = useState('')

    const [isAthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    function login(usuario, senha){
        fetch('http://127.0.0.1:8000/api/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usuario,
                password: senha
            })
        }).then(response=>{
            if(!response.ok){
                notifyError('Usuário ou senha incorretos. Tente novamente')
                throw new Error('Failed to fetch token: ' + response.statusText);
            }
            return response.json()
        }).then(data=>{
            // setUser(data.user)
            pegarToken(usuario, senha, data)
     
        })
    }

    function pegarToken(usuario,senha, teste){

        fetch('http://127.0.0.1:8000/api/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usuario,
                password: senha
            })
        }).then(response=>{
            if (!response.ok){
           
                notifyError('Usuário ou senha incorretos. Tente novamente')
                throw new Error('Failed to fetch token: ' + response.statusText);
            }
            return response.json()
        }).then(data=>{
            setIsAuthenticated(true)
            setToken(data.access)
            localStorage.setItem('token', data.access)
            navigate(`/home`, {state: {user: teste}})
          
        })

    }
    
    // atualiza o token para evitar os dois cliques 
    // useEffect(()=>{
    //     console.log(user, 'jasdhja')
    //     if (!token == ''){
    //         navigate(`/home`, {state: {user: user}})
    //     }

    // },[token])

    return(
        <div className='flex justify-center items-center h-screen'>
            <div className=" w-[550px] h-[70%] sombra-container-login rounded-[8px] p-22 text-[1.8rem] font-semibold">
                
                {/* texto inicial  */}
                <div className='flex flex-col gap-y-3'>
                    <Titulo title={'SIGN IN'}/>
                    <LabelTitle label={'Digite seu usuário e senha'}/> 
                </div>

                {/* inputs  */}
                <div className='flex flex-col gap-y-8 mt-12'>
                    <InputLogin placeholder={'usuário'} icon={iconUser} type={setUsuario}/>
                    <InputLogin placeholder={'senha'} icon={iconSenha} type={setSenha}/>
                </div>

                {/* botao Entrar */}
                <div className='flex justify-center my-14'>
                    <ButtonLogin label={'Entrar'} onClick={()=>login(usuario,senha)}/>
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

                {/* ir para cadastro  */}
                <div className='mt-14 flex justify-center'>
                    <p className='text-[0.9rem] font-normal text-[#9FA7A2]' >Não possui uma conta? <span className='text-[#8BB9AC] font-medium hover:text-[#667772] hover:font-semibold duration-150 underline underline-offset-4' onClick={()=>navigate('/cadastro')}>Faça seu cadastro</span></p>
                </div>

            </div>
        </div>
    )
}

export default Login