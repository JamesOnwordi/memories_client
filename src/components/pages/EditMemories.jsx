import axios from "axios"
import { useEffect } from "react"
import { useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDropzone } from "react-dropzone"

export default function EditMemories(){
    const [formImg, setFormImg] = useState([])
    const [formTitle, setFormTitle] = useState('')
    const [formNote, setFormNote] = useState('')
    const [msg, setMsg] = useState('')
    
    const { id } = useParams()
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
          'image/*': []
        },
        maxFiles: 20,
        noDragEventsBubbling: true,
        onDropAccepted: files => {
          setFormImg(files)
          setMsg('Images ready for submission')
        },
        onDropRejected: () => setMsg('Please upload image files only')
      })

    useEffect(()=>{
        const token = localStorage.getItem('jwt')
        // set request headers
        const options = {
          headers: {
            "Authorization": token
          }
        }

        const url = process.env.REACT_APP_SERVER_URL+'/api-v1/memories/'+id
        axios.get(url,options)
        .then(response=>{
            const data = response.data
            setFormTitle(data.title)
            setFormNote(data.note)
        })
        
    },[])

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            // server url
            const url = process.env.REACT_APP_SERVER_URL + '/api-v1/memories/' + id
            // build form data
            const formData = new FormData()
            for (const file of formImg) {
                formData.append('images', file)
            }
            formData.append('title', formTitle)
            formData.append('note', formNote)
            // pull token from local storage
            const token = localStorage.getItem('jwt')
            // set request headers
            const options = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                }
            }
            const response = await axios.put(url, formData, options)
            // console.log(response.data)
            navigate('/memories')
        } catch (error) {
            console.log(error)
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }
    return(
        <div className='text-center container mx-auto'>
        <h1 className='text-xl mt-4 mb-8'>Edit this memory!</h1>

        <h3 className='text-center my-4'>{msg}</h3>

        <form 
          onSubmit={handleSubmit}
          encType='multipart/form'
          
        >
          <div className='flex ... justify-around'>
            <section className='w-1/2 bg-slate-300 border-2 border-slate-500 border-dashed hover:cursor-pointer hover:bg-slate-200'>
              <div {...getRootProps({
                className: 'dropzone flex justify-center w-full h-full',
              })}>
                <label htmlFor='image-upload' hidden>Upload photos</label>
                <input {...getInputProps()}
                  id='image-upload'
                  ref={inputRef}
                />
                <p className='self-center text-4xl mx-4'>Drag and drop any photos you would like to add here! Or click me to select images</p>
              </div>
            </section>

            <div className='flex-1 ... w-1/2 bg-slate-400'>
              <div className='text-3xl mt-4'>
                <label htmlFor='title'> </label>
                <input
                  type='text'
                  id='title'
                  className='text-center'
                  placeholder='Title'
                  onChange={e => setFormTitle(e.target.value)}
                  value={formTitle}
                />
              </div>
  
              <div className=' text-1xl'>
                <label htmlFor='note'> </label>
                <textarea
                id='note'
                className='mx-1 my-8 text-center box-border w-11/12 h-96'
                onChange={e => setFormNote(e.target.value)}
                placeholder='Click to Begin Note Here'
                value={formNote}
                />
              </div>
            </div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mt-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Submit Memory</button>
        </form>
      </div>
    )
}