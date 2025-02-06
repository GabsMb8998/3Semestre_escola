import SyncLoader   from "react-spinners/SyncLoader";
import { useEffect, useState,  } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Header from "../components/Header/Header";
import { data } from "react-router-dom";

function Home(){
    let [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token')

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            
        },2500)
    }, [])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/professores', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response=>{
            if(!response.ok){
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json()
        }).then(data=>console.log(data))
    },[])

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
                        <Sidebar/>
                        <div className="w-full">
                            <Header/>
                        </div>

            
                    </div>
                )
            }

        </div>

    )
}

export default Home