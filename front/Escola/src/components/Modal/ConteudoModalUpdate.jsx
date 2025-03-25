function ConteudoModalUpdate({nome=null, ni=null, email=null, cargo=null }){
    return( 
        <div className="text-xl text-[#ADADAD] flex flex-col gap-y-2 mt-3">
            {nome =! '' && (
                <p>nome : {nome}</p>
            )}

            {ni != '' && (
                <p>ni : {ni}</p>
            )}

            {email != '' && (
                <p>email : {email}</p>
            )}

            {cargo != '' && (
                <p>cargo : {cargo}</p>
            )}
        </div>
    )
}

export default ConteudoModalUpdate