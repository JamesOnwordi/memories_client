import axios from "axios"
import { useEffect } from "react"
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

    useEffect(()=>{
        const token = localStorage.getItem('jwt')
        // set request headers
        const options = {
          headers: {
            "Content-Type": "multipart/form-data",
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
        <div className='text-center'>

            <p>-</p>
            <h1 className='text-xl'>Edit this memory</h1>
            <p>-</p>

            <p>{msg}</p>

            <form onSubmit={handleSubmit}>

            <div className='flex ...'>
                <div className='flex-1 ...'>
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
                </div>

                <div className='flex-1 ... bg-slate-400'>
                <div className=' text-3xl mt-6 '>
                    <label htmlFor='title'></label>
                    <input
                        className='text-center'
                        type='text'
                        id='title'
                        placeholder="Title"
                        onChange={e => setFormTitle(e.target.value)}
                        value={formTitle}
                    />
                </div>

                <div className=' text-1xl my-8'>
                    <label htmlFor='note'></label>
                    <textarea
                    className='text-center'
                    id='note'
                    cols='90'
                    rows='23'
                    placeholder="Click here to Write Note"
                    onChange={e => setFormNote(e.target.value)}
                    value={formNote}
                    />
                </div>

            </div>
        </div>
        <p>-</p>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Submit Memory</button>
            </form>
        </div>
    )
}