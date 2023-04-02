
import React ,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import {getRandomPrompt} from "../utils"
import { FormField,Loader } from '../components'

const CreatePost = () => {

 const navigate = useNavigate();
 const [form,setForm] = useState({
  name:'',
  prompt:'',
  photo:'',
 });

 const [generatingImg, setGeneratingImg] = useState(false);
 const [loading,setLoading] = useState(false);

const generateImage = async() =>{
if(form.prompt){
  try {
    setGeneratingImg(true);
    const response = await fetch('http://localhost:8080/api/v1/dalle',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        prompt:form.prompt
      }),


    })

    const data = await response.json();

    setForm({...form,photo: `data:image/jpeg;base64,${data.photo}` });
  } catch (error) {
    alert(error);
  }finally{
    setGeneratingImg(false);
  }
}else{
  alert('Please Enter a Promt')
}
}

 const handleSubmit = () => {

 }
const handleChange = (e) => {
setForm({...form, [e.target.name] : e.target.value})
}

const handleSurpriseMe =() =>{
  const randomPrompt = getRandomPrompt(form.prompt);
  setForm({...form,prompt:randomPrompt})
}

  return (
    <section className='max-w-7xl mx-auto '>
      <div className='xl:flex gap-5 '>
      <div>
        <h1 className="font-extrabold text-[#000] text-[32px]">
          Create
        </h1>
        <p
          className="mt-2 text-[#1c4e7a]  text-[20px] max-w-[500px]
            "
        >
          Create imaginative and visually stunning
          images through AI.
        </p>
        <p
          className="mt-2 text-[#852c96]  text-[16px] max-w-[500px]
            "
        >
            Use Surprise Me button to generate images from random sentences. 
        </p>

      
      </div>
      <form className='w-3/5 p-5 ml-10 mt-5 max-w-3xl' onSubmit={handleSubmit}>
        
          <FormField 
          LabelName = "Prompt"
          type="text"
          name="prompt"
          placeholder="A plush toy robot sitting against a yellow wall"
          value = {form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
          /> 

          <div className='relative bg-gray-50 border border-gray-300
          text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 w-80 p-3
          h-80 flex justify-center items-center  mt-10'>

            {form.photo ? (
              <img 
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain" />
            ):(
              <img 
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-contain opacity-40" />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex 
              justify-center items-center bg-[rgba(0,0,0,0.5)]
              rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        
<div className='mt-5 flex gap-5'>
  <button
  type='button'
  onClick={generateImage}
  className="text-white bg-[#6469ff] font-medium 
  rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
{generatingImg ?  "Generating..." : "Generate Image"}
  </button>
</div>

      </form>
      </div>
    </section>
  )
}

export default CreatePost