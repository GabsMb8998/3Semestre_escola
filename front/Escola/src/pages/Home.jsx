import SyncLoader   from "react-spinners/SyncLoader";
import { useEffect, useState,  } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Header from "../components/Header/Header";

import VizualizarProfessores from "../components/Crud/Professor/Get/VizualizarProfessores";
import AdicionarProfessor from "../components/Crud/Professor/Post/AdicionarProfessor";
import DeletarProfessor from "../components/Crud/Professor/Delete/DeletarProfessor";

import { useLocation } from 'react-router-dom';
import Update from "../components/Crud/Professor/Update/Update";
import InformationUpdate from "../components/Crud/Professor/Update/InformationUpdate";
import GetDisciplinas from "../components/Crud/Disciplinas/GET/GetDisciplinas";
import AdicionarDisciplina from "../components/Crud/Disciplinas/POST/AdicionarDisciplina";
import DeletarDisciplina from "../components/Crud/Disciplinas/DELETE/DeletarDisciplina";

function Home(){
    let [loading, setLoading] = useState(false);
    const location = useLocation();
    const {user} = location.state || {}

    const token = localStorage.getItem('token')
    const [selected, setSelected] = useState('disciplina')

    const [informationsUpdate,setInformationUpdate] = useState(false) 
    const [infoUpdate, setInfoUpdate] = useState('')

    console.log(user.user.username, 'ahsvdha')

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            
        },2500)
    }, [])

    console.log(selected)
 

    return(

        <div>
            {/* loading  */}

            {
                loading ? (

                    <div className="w-full h-screen flex justify-center items-center">
                        <SyncLoader 
                            color={"#93BFB2"}
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"/>
                    </div>
                ) : (
                    <div className="flex">
                        <Sidebar username={user.user.username}/>
                        <div className="w-full">
                            <Header selected={selected} setSelected={setSelected}/>

                            {selected === 'vizualizar' ? (
                                <VizualizarProfessores token={token}/>

                            ): selected === 'adicionar' ? (
                                <AdicionarProfessor token={token}/>
                            ) : selected === 'deletar' ? (
                                <DeletarProfessor token={token}/>
                            ) : selected=== 'atualizar' ? (
                
                                (informationsUpdate)? 

                                // logica para trocar de pesquisa para pagina onde contem as informações para serem atualizadas
                                <InformationUpdate token={token} infoUpdate={infoUpdate}/> : <Update token={token} setInfoUpdate={setInfoUpdate} setInformationUpdate={setInformationUpdate} informationUpdate={informationsUpdate}/>
                             
                            ) : (<DeletarDisciplina/>)}
                        </div>

            
                    </div>
                )
            }

        </div>

    )
}

export default Home