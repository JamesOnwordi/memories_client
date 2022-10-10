import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function EditMemories(){

    const [data,setData] = useState()

    useEffect(()=>{
        axios.get()
        .then((response)=>{
            console.log(console.log)
        })
    })
    return(
        <div>
            Insdie edit memories
        </div>
    )

}