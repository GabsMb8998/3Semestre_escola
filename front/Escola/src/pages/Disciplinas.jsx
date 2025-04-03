import InformationUpdate from "../components/Crud/Professor/Update/InformationUpdate";
import GetDisciplinas from "../components/Crud/Disciplinas/GET/GetDisciplinas";
import AdicionarDisciplina from "../components/Crud/Disciplinas/POST/AdicionarDisciplina";
import DeletarDisciplina from "../components/Crud/Disciplinas/DELETE/DeletarDisciplina";
import { useState } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";

function Disciplinas (){
    let [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token')
    const location = useLocation();
    const {user} = location.state.user || {}
    const {selected} = location.state.selected || {}
    const {setSelected} = location.state.selected || {}

    // console.log(user)

    const [informationsUpdate,setInformationUpdate] = useState(false) 
    const [infoUpdate, setInfoUpdate] = useState('')

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
                <Sidebar selected={selected} setSelected={setSelected} username={user.username.user} />
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

export default Disciplinas

// username={user.user.username}