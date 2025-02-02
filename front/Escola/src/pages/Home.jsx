import SyncLoader   from "react-spinners/SyncLoader";
import { useEffect, useState,  } from "react";

function Home(){
    let [loading, setLoading] = useState(false);

    useEffect(()=>{
        
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            
        },2500)
    }, [])

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
                    <div>
                        TEste
                    </div>
                )
            }

        </div>

    )
}

export default Home