import { toast } from 'react-toastify';

export const notifySuccess = () => {
    toast.success('Cadastro feito com Sucesso!',{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
} 

export const notifyError = (message) => {
    toast.error(message,{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
} 