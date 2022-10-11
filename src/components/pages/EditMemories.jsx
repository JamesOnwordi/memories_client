import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function EditMemories(){
    const {id} = useParams()
    const [data,setData] = useState({})
    console.log(id)
    useEffect(()=>{
        // pull token from local storage
     const token = localStorage.getItem('jwt')
     // set request headers
     const options = {
     headers: {
         "Authorization": token
     }
     }
     console.log(id)
        const url = process.env.REACT_APP_SERVER_URL+ '/api-v1/memories/' + id 
        axios.get(url,options)
        .then((response)=>{
            console.log(response)
            ({
                title:'',
                note: ''
            })
            console.log(console.log)
        })
    })

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(data)

    }
    return(
        <div>
               
            <form  onSubmit={handleSubmit}>

                 <div>
                    <input type='file' />
                    <p/>
                </div>
                <p></p>
                <div>
                    <p> Title: <input type="text" onChange={e=>data.title=e.target.value}/></p> 
                    
                </div>
                

                <div>
                    <input type='text' name='note' style={{width:'500px' , height:'300px'}} onChange={e=>data.note = e.target.value}/>
                </div>
                <div>
                    <p/>
                    <button type="submit" ><p>Memorize</p></button>
                </div>
            </form>
        </div>
    )

}