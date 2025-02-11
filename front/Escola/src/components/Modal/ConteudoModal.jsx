function ConteudoModal({nome, ni, email, cargo }){
    return( 
        <div className="text-xl text-[#ADADAD] flex flex-col gap-y-2 mt-3">
            <p>nome : {nome}</p>
            <p>ni : {ni}</p>
            <p>email : {email}</p>
            <p>cargo : {cargo}</p>
        </div>
    )
}

export default ConteudoModal