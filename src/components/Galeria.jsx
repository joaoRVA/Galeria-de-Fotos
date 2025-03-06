import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import SingleFoto from '../pages/SingleFoto'

const Galeria = (props) => {
  
  return (
    <div>
        <div className="ml-24 grid grid-cols-4 gap-3 mt-10">
        {props.displayImages.map((image) => (

          <Link to={`/foto/${image.id}`} state={{imageData: image}} key={image.id}>
            <div className='cursor-pointer' >

                <img src={image.url} alt={`Imagem ${image.id}`} className="w-60 h-60 transition hover:scale-90 hover:drop-shadow-xl hover:shadow-indigo-200 object-cover rounded-lg shadow-lg" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Galeria