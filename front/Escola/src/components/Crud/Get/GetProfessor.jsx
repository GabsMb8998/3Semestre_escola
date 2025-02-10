import { useEffect, useState } from "react"
import arrowGet from "./arrowGet.svg"
import DadoProfessor from "./DadoProfessor"
import { use } from "react"

function GetProfessor({nome, img, ni, email, cargo, imagem, }){

    const [arrow, setArrow] = useState(false)
    const [previewImg, SetPreviewImg] = useState(imagem)



    return(
        <li className="flex tems-center justify-center flex-col">

            <div className="flex justify-between" onClick={()=>{setArrow(!arrow)}}>

                <div className="flex gap-x-10 items-center">
                    <img className="w-16 h-16 bg-[#D9D9D9] rounded-xl " src={`http://127.0.0.1:8000/${previewImg}`} alt="" />

                    <p className="text-[#7C7C7C] text-2xl">{nome}</p>
                </div>

                <img className={`${arrow ? 'rotate-180 duration-300': 'duration-300'}`} src={arrowGet} alt="" />

            </div>

            {arrow && 
                <div className={`text-[#ADADAD] px-20 font-light mx-6 my-3 gap-y-1 flex flex-col`}>
                    <DadoProfessor label={ni} item={'ni'}/>
                    <DadoProfessor label={email} item={'email'}/>
                    <DadoProfessor label={cargo} item={'cargo'}/>
                </div>
            }
        </li>
    )
}

export default GetProfessor

