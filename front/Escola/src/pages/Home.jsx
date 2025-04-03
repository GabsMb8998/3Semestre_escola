import SyncLoader   from "react-spinners/SyncLoader";
import { useEffect, useState,  } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Header from "../components/Header/Header";

import VizualizarProfessores from "../components/Crud/Professor/Get/VizualizarProfessores";
import AdicionarProfessor from "../components/Crud/Professor/Post/AdicionarProfessor";
import DeletarProfessor from "../components/Crud/Professor/Delete/DeletarProfessor";

import { useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import Update from "../components/Crud/Professor/Update/Update";

import CardHome from "../components/CardHome";
import { IconProfessoresCard } from "../images/IconProfessoresCard";
import TituloCrud from "../components/Crud/TituloCrud";
import { IconDisciplinaCard } from "../images/IconDisciplinaCard";

function Home(){

    const navigate = useNavigate()

    let [loading, setLoading] = useState(false);
    const location = useLocation();
    const {user} = location.state || {}

    const token = localStorage.getItem('token')
    const [selected, setSelected] = useState('home')
    console.log(user)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            
        },1500)
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

                        <Sidebar username={user.user.username} selected={selected} setSelected={setSelected}/>
                        
                        <div className="w-full h-screen ml-[300px] flex flex-col items-center justify-center"> 

                            <div className="px-50 mb-30 w-full">
                            <h1 className="text-[#7C7C7C] text-4xl font-medium mb-24">Api Professores</h1>

                                <div className="flex justify-between items-center ">
                                    <CardHome label={'Professores'} Icon={<IconProfessoresCard/>} onClick={()=>{
                                        setSelected('professores')
                                        navigate('/professores')
                                    }} />
                                    <CardHome label={'Disciplinas'} Icon={<IconDisciplinaCard/>} onClick={()=> {
                                        setSelected('disciplina')
                                        navigate('/disciplinas', {state: {selected: selected, user: user, setSelected:setSelected}})
                                    }}/>

                                </div>
                            </div>

                        </div>

            
                    </div>
                )
            }

        </div>

    )
}

export default Home