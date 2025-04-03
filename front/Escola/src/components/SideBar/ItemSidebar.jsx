import { IconCrud } from "./IconCrud"

function ItemSidebar({label, iconCrud, selected, onClick}){
    return(
        <div className={`${selected ? 'text-[#A9D8C9] bg-[#F0FAF7] font-medium ' : 'text-[#C5C5C5] font-normal'} rounded-sm px-5 py-3 flex gap-x-3 ${selected === false && 'hover:bg-[#FAFAFA]'}`} onClick={()=>onClick()}>
            <i>{iconCrud}</i>
            <p>{label}</p>
        </div>
    )
}

export default ItemSidebar