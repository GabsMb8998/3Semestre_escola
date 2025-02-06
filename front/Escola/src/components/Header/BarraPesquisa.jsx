import lupa from './lupa.svg'

function BarraPesquisa(){
    return(
      <div className='relative'>
            <input type="text" placeholder="Pesquise por um professor" className="border-[1px] border-[#BCBCBC] w-[600px] h-5 rounded-full py-6 px-7" />
            <img className='absolute bottom-[23%] right-8' src={lupa} alt="" />
      </div>
      

    )
}

export default BarraPesquisa