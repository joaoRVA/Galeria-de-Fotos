import React, { useState } from 'react'

const AddFoto = (props) => {
  const [fileName, setFileName] = useState("Nenhuma foto selecionada.")


  const fecharPopup = () =>{
    document.getElementById("addfoto").classList.remove('flex')
    document.getElementById("addfoto").classList.add('hidden')
  }

  const abrirPopup = () =>{
    document.getElementById("addfoto").classList.remove('hidden')
    document.getElementById("addfoto").classList.add('flex')
  }
  return (
      <>
      <button type='button'
      className='p-3 w-40 
      font-bold ml-10 mt-10
      rounded-md cursor-pointer hover:bg-slate-600 
      transition shadow shadow-blue-200
    bg-slate-500' 
      onClick={() => abrirPopup()}>Enviar Foto</button>

      <div id='addfoto' className='fixed inset-0 p-10 bg-black/60 items-center justify-center hidden'>
      
        <div className='bg-gray-800 flex flex-col p-20 rounded-lg'>
          <label htmlFor="fileInput" className='bg-slate-400 rounded-md p-2 text-center cursor-pointer hover:bg-slate-500'>
            Escolher Arquivo
          </label>
          <input 
          id="fileInput"
          className='hidden'
          multiple
          onChange={(e) => {props.handleFileChange(e);
          setFileName(e.target.files[0].name);
          }} 
          type="file"/>
          <p className='text-amber-300'>{fileName}</p>

          <input type="text" value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          placeholder="Descrição"
          className="bg-gray-700 p-2 mt-4 rounded-md mb-4"/>

          <div className='flex justify-between'>

            <button type='submit' onClick={() => {props.handleUpload;
            fecharPopup();
            setFileName("Nenhuma foto selecionada.")}
            }
            className='bg-slate-600 transition rounded-md w-20 cursor-pointer hover:bg-green-600 p-2'>Enviar</button>

            <button type='button'
             onClick={() => {fecharPopup();
            setFileName("Nenhuma foto selecionada.")}}
             className='bg-slate-600 transition rounded-md w-20 cursor-pointer hover:bg-red-500 p-2'>Cancelar</button>
          </div>
        </div>

      </div>
      </> 
  )
}

export default AddFoto