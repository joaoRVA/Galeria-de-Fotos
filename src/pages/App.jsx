import { useEffect, useState } from "react"
import AddFoto from "../components/AddFoto.jsx"
import Galeria from "../components/Galeria"


function App() {
    const [fotos, setFotos] = useState([])
    const [displayImages, setDisplayImages] = useState([]); // Armazena as imagens exibidas
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState([])

    // buscar imagens e exibir na tela ao carregar
    const fethImages = async () =>{
      try {
        const response = await fetch('http://localhost:5000/images');
        const data = await response.json();
        const imagesArray = Array.isArray(data) ? data : [];

        const imageUrls = imagesArray.map((image) => ({
          id: image.id,
          url: `http://localhost:5000/uploads/${image.path}`,
          description: image.post?.description || "Sem descrição",}))
        setDisplayImages(imageUrls);
        setImageData(data)
      } catch (error){
        console.error("Erro ao buscar Imagens", error)
      }
    };

    useEffect(() => {
      fethImages();
    }, []);

    const handleFileChange = (e) => {
        const foto = Array.from(e.target.files)
        if (foto.length > 0){
          setFotos((prevfotos) => [...prevfotos, ...foto])
        }
        
    
    };

    const handleUpload = () => {
      if (fotos.length > 0) {
        const imagePreviews = fotos.map((file) => {
          // Cria um objeto FileReader para ler o arquivo
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => 
            resolve({
            id: Math.random(), // ID temporário para evitar conflito
            url: reader.result,
            description: description || "Sem descrição",
          });
            reader.readAsDataURL(file); // Lê o arquivo como uma URL base64 para exibir na web
          });
        });
  
        Promise.all(imagePreviews).then((fotos) => {
          setDisplayImages((prevImages) => [...prevImages, ...fotos]); // Mantém as imagens antigas e adiciona as novas
        });
  
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (fotos.length == 0) {
        alert("Nenhuma foto selecionada!");
        return;
      }

      const formData = new FormData();
      formData.append('description', description)
      fotos.forEach((foto)=>{
        formData.append('fotos', foto)
      })

      try{
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok){
          alert('Fotos enviadas com sucesso!')
          setFotos([]);
          setDescription("");
          document.querySelector("#fileInput").value='';

          
          await fethImages();
        }
        else {
          alert('Erro ao enviar fotos!')
        }
      }catch(error){
        console.error(error) 
      }
  }

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      
      
      <h1 className="font-bold text-3xl text-center pt-20">Fotos de Usuário</h1>

      <form onSubmit={handleSubmit}>
        <AddFoto 
        description={description}
        setDescription={setDescription}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}/>

      </form>
    
      
      <Galeria imageData={imageData} displayImages={displayImages}/>
      {/* <div>
        <h2 className="font-bold text-2xl text-center mt-7">Dados das Imagens</h2>
        <pre>{JSON.stringify(imageData, null, 2)}</pre>
      </div> */}
    </div>
      
  )

}
export default App

