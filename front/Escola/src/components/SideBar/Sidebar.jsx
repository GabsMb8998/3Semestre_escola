import { useState } from "react"
import { IconCrud } from "./IconCrud"
import ItemSidebar from "./ItemSidebar"
import { IconHome } from "./iconHome"
import { IconProfessores } from "./iconProfessores"
import { IconDisciplina } from "./IconDisciplinas"

function Sidebar({username, selected, setSelected}){

   
    return(
        <aside className="border-r-2 w-[300px] h-screen border-[#EDEDED] px-9 py-10 font-medium fixed">
            <div className="text-[#7C7C7C] ">
                Senai
            </div>

            <div className="py-14 flex flex-col gap-y-7">
                <ItemSidebar label={'Home'} iconCrud={<IconHome selected={selected==='home'}/>} onClick={()=>setSelected('home')} selected={selected === 'home'}/>
                <ItemSidebar label={'Professores'} iconCrud={<IconProfessores selected={selected==='professores'}/>} onClick={()=>setSelected('professores')} selected={selected === 'professores'}/>
                <ItemSidebar label={'Disciplinas'} iconCrud={<IconDisciplina selected={selected==='disciplinas'}/>} onClick={()=>setSelected('disciplinas')} selected={selected === 'disciplinas'}/>
            </div>

            <div className="flex items-center gap-x-3  text-[#AEAEAE] absolute bottom-14">
                <div className="w-10 h-10 bg-[#7C7C7C] rounded-full"></div>
                <p className="font-normal">{username}</p>
            </div>
        </aside>
    )
}

export default Sidebar