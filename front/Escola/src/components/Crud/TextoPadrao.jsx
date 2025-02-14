function TextoPadrao({content, tamanho}){
    return(
        <p className={`${tamanho? 'text-[1.4rem]': 'text-3xl'}  text-[#898989]`}>{content}</p>
    )
}

export default TextoPadrao