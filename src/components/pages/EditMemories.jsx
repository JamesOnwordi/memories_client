import axios from "axios"
import { useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function EditMemories(){
    const [formImg, setFormImg] = useState([])
    const [formTitle, setFormTitle] = useState('')
    const [formNote, setFormNote] = useState('')
    const [msg, setMsg] = useState('')
    
    const { id } = useParams()
    const navigate = useNavigate()
    const inputRef = useRef(null)

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
            console.log(response.data)
            navigate('/memories')
        } catch (error) {
            console.log(error)
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }
    return(
        <div>
            <h1>Edit this memory</h1>

            <p>{msg}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='image-upload'>Add more photos: </label>
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
                    <label htmlFor='title'>Edit title: </label>
                    <input
                        type='text'
                        id='title'
                        onChange={e => setFormTitle(e.target.value)}
                        value={formTitle}
                    />
                </div>

                <div>
                    <label htmlFor='note'>Edit note: </label>
                    <textarea
                    id='note'
                    onChange={e => setFormNote(e.target.value)}
                    value={formNote}
                    />
                </div>

                <button type="submit">Memorize</button>
            </form>
        </div>
    )
}