import { useState } from "react"
import ItemNav from "./ItemNav"
import BarraPesquisa from "./BarraPesquisa"

function Header(){

    const [selected, setSelected] = useState('vizualizar')

    function ChangeSelected(selected){
        setSelected(selected)
    }   

    return(
        <header className="border-b-2 border-[#EDEDED] py-8 px-28 flex items-center justify-between">

            <nav className="flex gap-x-20">
                <ItemNav label={'Vizualizar'} selected={selected === 'vizualizar'} onClick={()=>ChangeSelected('vizualizar')}/>
                <ItemNav label={'Adicionar'}  selected={selected === 'adicionar'} onClick={()=>ChangeSelected('adicionar')}/>
                <ItemNav label={'Atualizar'} selected={selected === 'atualizar'} onClick={()=>ChangeSelected('atualizar')}/>
                <ItemNav label={'Deletar'} selected={selected === 'deletar'} onClick={()=>ChangeSelected('deletar')}/>
            </nav>

            <BarraPesquisa/>

        </header>
    )
}

export default Header