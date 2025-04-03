import { IconCrud } from "./SideBar/IconCrud"

function CardHome({Icon, label, onClick}){
    return(
        <div className="border-[1.5px] border-[#CCCCCC] rounded-lg flex justify-center items-center w-[450px] h-[450px] hover:scale-110 duration-150" onClick={()=>onClick()}>
            
            <div className="flex flex-col justify-center self-center items-center">
                {Icon}
                <p className="self-center text-2xl font-medium text-[#B9B9B9]">{label}</p>
            </div>


        </div>
    )
}

export default CardHome