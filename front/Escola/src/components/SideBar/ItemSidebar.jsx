import { IconCrud } from "./IconCrud"

function ItemSidebar(){
    return(
        <div className="text-[#A9D2C5] flex gap-x-3 font-semibold">
            <i><IconCrud/></i>
            <p>Crud</p>
        </div>
    )
}

export default ItemSidebar