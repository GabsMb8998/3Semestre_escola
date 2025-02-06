function ItemNav({selected, label, onClick}){
    return(
        <div>
            <p className={`${selected ? 'text-[#A9D2C5] font-medium' : 'text-[#7C7C7C] font-normal hover:text-[#3C3C3C]'}`} onClick={onClick}>{label}</p>
        </div>
    )
}

export default ItemNav