import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import '../../Style/Welcome.css'

export default function NewMemories() {
    const [formTitle, setFormTitle] = useState('')
    const [formNote, setFormNote] = useState('')
    const [formImg, setFormImg] = useState('')
    const [msg, setMsg] = useState('')
  
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  
    const handleSubmit = async e => {
      e.preventDefault()
      try {
        // build form and headers
        const formData = new FormData()
        for (let i = 0; i < formImg.length; i++) {
          formData.append('images', formImg[i])
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
        // make req
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/api-v1/memories', formData, options)
        console.log(data)
        // reset input val
        if (inputRef) inputRef.current.value = ''
        navigate(`/memories/${data._id}`)
      } catch (err) {
        console.log(err)
        setMsg('ooooooooo noooooo 🤬')
      }
    }
  
    return (
      <div className='text-center'>
        <h1 className='text-xl mt-4 mb-8'>Create a new Memory!</h1>

        <h3 className='text-center'>{msg}</h3>

        <form 
          onSubmit={handleSubmit}
          encType='multipart/form'
          
        >
          <div className='flex ...'>
            <section>
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getRootProps()}
                  id=''
                />
                <p>dragin and droppin</p>
              </div>
            </section>

            <div className='flex-1 ... bg-slate-400'>
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
                cols='90'
                rows='23'
                class='m-8 text-center'
                style={{backgroundImage:""}}
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