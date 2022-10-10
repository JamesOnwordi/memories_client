import axios from 'axios'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'


export default function Memories(){
    
    const [memories,setMemories] = useState([])
    const [deleted,setDeleted] = useState(1)
    const homePage = process.env.REACT_APP_SERVER_URL
    
    useEffect(()=>{
        const url = homePage+"/api-v1/memories"
        console.log(url)
        axios.get(url)
        .then(response=>{
            console.log(response.data)
            const allMemories = response.data.map(memory=>{
                //console.log(memory)
                return({
                    id: memory._id,
                    title: memory.title,
                    image: memory.images[0] ? memory.images[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfill0VxdWtC5GsoWnIiTzUu4GMzMuVlUMKA&usqp=CAU",
                    note: memory.note,
                    date: memory.date
                })
            })
            setMemories(allMemories)
            console.log(allMemories)
        })
    },[deleted])
    
    const handleDelete = async (id) =>{
        console.log(window)
        const result = window.confirm("are you sure you want to delete this memory")
        console.log(result)
        if(result){
            await axios.delete(homePage+"/api-v1/memories/"+id)
            let deleteCount = deleted
            console.log(deleteCount)
            setDeleted(deleteCount+1)
            console.log(deleted)
        }
            
        console.log(homePage)
        console.log("deleted")
    }

    const displayMemories = memories.map((memory,id)=>{
        return (
            
            <div key={memory.id} style={{margin:"30px"}}>
                <p>{memory.title}</p>
                <Link to="/">
                <img src={memory.image}/>
                </Link>
                <p>{memory.note}</p>
                <p>{memory.date}</p>
                <button>Edit</button>
                <span> </span>
                <button onClick={()=>handleDelete(memory.id)}>Delete</button>
            </div>
            

        )
    })



    return (
        <div style={{display:"flex" ,flexWrap:"wrap"}}>
            {displayMemories}
        </div>
    )
}