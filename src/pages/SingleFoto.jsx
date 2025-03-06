import React from 'react'
import { useLocation, useParams, useNavigate} from 'react-router-dom'

const SingleFoto = () => {
    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const {imageData} = location.state || {}
    
    const abrirpopup = () => {
      document.getElementById('popup').classList.remove("hidden");
      document.getElementById('popup').classList.add("flex");
    }

    const fecharPopup = () => {
      document.getElementById('popup').classList.remove("flex");
      document.getElementById('popup').classList.add("hidden");
    }

    const excluirFoto = async () => {
      try{
        const response = await fetch(`http://localhost:5000/images/${id}`,{
          method: 'DELETE',
        })

        if (response.ok){
          alert('Imagem excluída com sucesso!')
          fecharPopup()
          navigate('/')
          
        }else{
          alert('Erro ao excluir imagem!')
        }
      }catch (error){
        console.error("Erro ao excluir imagem", error)
        alert('Erro ao excluir imagem')
      }
      
    }

  return (
    <div className="bg-gray-800 min-h-screen text-white">
        <h1 className='font-bold text-3xl text-center pt-20'>Detalhes da Foto</h1>

        {imageData && (
          <div className='flex justify-center mt-10'>

          {/* Layout Imagem */}
            <img src={imageData.url} alt={`Imagem ${imageData.id}`} className="w-125 h-125 object-cover rounded-lg shadow-lg" />
            <div className='flex flex-col ml-10 justify-between'>
              <div>
                <p><span className='text-amber-200'>ID:</span> {imageData.id}</p>
                <p className='mt-5'><span className='text-amber-200'>Descrição:</span> {imageData.description}</p>
              </div>
            
              <button onClick={() => abrirpopup()} className='flex justify-center shadow-lg p-4 w-50 bg-red-500 text-white rounded-lg text-lg font-bold cursor-pointer hover:bg-red-950'>
                <p>Excluir Imagem</p>
              </button>

            </div>
          {/* end Layout Imagem */}

          {/* Pop-up */}

            <div id='popup' className='fixed inset-0 bg-black/60 items-center justify-center hidden'>
              <div className='bg-gray-800 p-10 rounded-lg'>
                <p className='text-white font-bold text-center'>Deseja realmente excluir a imagem?</p>
                <div className='flex justify-center mt-5'>
                  <button className='bg-red-500 text-white p-3 pt-2 pb-2 rounded-lg mr-5 cursor-pointer hover:bg-red-900' onClick={() => excluirFoto()}>Sim</button>
                  <button className='bg-gray-800 text-white p-2 rounded-lg border border-white cursor-pointer hover:bg-slate-500' onClick={() => fecharPopup()}>Não</button>
                </div>
              </div>
            </div>

          {/* end Pop-up */}
        </div>
        )}
    </div>
  )
}

export default SingleFoto