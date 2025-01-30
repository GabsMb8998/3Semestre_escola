import '../index.css'
import InputLogin from '../components/Login/InputLogin'

// icons 
import iconUser from "../images/icon-user.svg"
import iconSenha from "../images/icon-senha.svg"

function Login(){
    return(
        <div className='flex justify-center items-center h-screen'>
            <div className=" w-[550px] h-[70%] sombra-container-login rounded-[8px] p-22 text-[1.8rem] font-semibold">
                
                {/* texto inicial  */}
                <div className='flex flex-col gap-y-3'>
                    <h1>SING IN</h1>
                    <p className='text-[1rem] font-normal text-[#9FA7A2] '>Digite seu usuário e senha</p>
                </div>

                {/* inputs  */}
                <div className='flex flex-col gap-y-8 mt-12'>
                    <InputLogin placeholder={'usuário'} icon={iconUser}/>
                    <InputLogin placeholder={'senha'} icon={iconSenha}/>
                </div>

                <div className='flex justify-center my-14'>
                    <button className='bg-[#A9D2C5] hover:bg-[#9ccabc] hover:scale-[1.02] duration-300  font-medium text-white text-[1.2rem] px-16 py-3 rounded-[6px]'>Entrar</button>
                </div>

                <div className='mt-14 flex justify-center'>
                    <p className='text-[0.9rem] font-normal text-[#9FA7A2]'>Não possui uma conta? <span className='text-[#8BB9AC] font-medium'>Faça seu cadastro</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login