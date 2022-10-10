import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function EditMemories(){

    const [data,setData] = useState({
        title:'',
        note: ''
    })


    // useEffect(()=>{
    //     const url = 
    //     axios.get()
    //     .then((response)=>{
    //         console.log(console.log)
    //     })
    // })

    const handleChange = (e) =>{
        console.log(e.target.value)
        console.log(data)
        
        console.log({...data}.note = 'a')

    }
    return(
        <div>
               
            <form onChange={handleChange} >

                 <div>
                    <input type='file' />
                    <p/>
                </div>
                <p></p>
                <div>
                    <p> Title: <input type="text" onChange={e=>data.title=e.target.value}/></p> 
                    
                </div>
                

                <div>
                    <input type='text' style={{width:'500px' , height:'300px'}} onChange={e=>{setData({note:e.target.value})}}/>
                </div>
                <div>
                    <p/>
                    <button><p>Memorize</p></button>
                </div>
            </form>
        </div>
    )

}