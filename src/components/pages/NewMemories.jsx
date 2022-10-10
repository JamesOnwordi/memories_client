import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function NewMemories() {
    const [formTitle, setFormTitle] = useState('')
    const [formNote, setFormNote] = useState('')
    const [formImg, setFormImg] = useState('')
    const [msg, setMsg] = useState('')
  
    const inputRef = useRef(null)
    const navigate = useNavigate()
  
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
      <>
        <h1>Create a new Memory!</h1>

        <input type='file'></input>

        <h3>{msg}</h3>

        <form 
          onSubmit={handleSubmit}
          encType='multipart/form'
        >
          <div>
            <label htmlFor='image-upload'>Upload photos: </label>
            <input 
              type='file'
              id='image-upload'
              accept='images/*'
              multiple
              ref={inputRef}
              onChange={e => setFormImg(e.target.files)}
            />
          </div>
  
          <div>
            <label htmlFor='title'>Title: </label>
            <input
              type='text'
              id='title'
              onChange={e => setFormTitle(e.target.value)}
              value={formTitle}
            />
          </div>
  
          <div>
            <label htmlFor='note'>Note: </label>
            <textarea
            id='note'
            onChange={e => setFormNote(e.target.value)}
            value={formNote}
            />
          </div>
  
          <input type="submit" />
        </form>
      </>
    )
}