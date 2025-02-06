import ItemSidebar from "./ItemSidebar"

function Sidebar(){
    return(
        <aside className="border-r-2 w-64 h-screen border-[#EDEDED] p-10 font-medium">
            <div className="text-[#7C7C7C] ">
                Senai
            </div>

            <div className="py-14">
                <ItemSidebar/>
            </div>

            <div className="flex items-center gap-x-3  text-[#AEAEAE] absolute bottom-14">
                <div className="w-10 h-10 bg-[#7C7C7C] rounded-full"></div>
                <p>usuário 112345</p>
            </div>
        </aside>
    )
}

export default Sidebar