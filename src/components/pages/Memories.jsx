

import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Memories() {

    const [memories, setMemories] = useState([])
    const [deleted, setDeleted] = useState(1)
    const homePage = process.env.REACT_APP_SERVER_URL

    // pull token from local storage
    const token = localStorage.getItem('jwt')
    // set request headers
    const options = {
        headers: {
            "Authorization": token
        }
    }

    useEffect(() => {

        // pull token from local storage
        const token = localStorage.getItem('jwt')
        // set request headers
        const options = {
            headers: {
                "Authorization": token
            }
        }

        const url = process.env.REACT_APP_SERVER_URL + "/api-v1/memories"
        console.log(url)
        axios.get(url, options)
            .then(response => {
                console.log(response.data)
                const allMemories = response.data.map(memory => {
                    //console.log(memory)
                    return ({
                        id: memory._id,
                        title: memory.title,
                        image: memory.images[0],
                        note: memory.note,
                        date: memory.date
                    })
                })
                setMemories(allMemories)
                console.log(allMemories)
            })
    }, [deleted])

    const handleDelete = async (id) => {
        console.log(window)
        const result = window.confirm("are you sure you want to delete this memory")
        console.log(result)
        if (result) {
            await axios.delete(process.env.REACT_APP_SERVER_URL + "/api-v1/memories/" + id, options)
            let deleteCount = deleted
            console.log(deleteCount)
            setDeleted(deleteCount + 1)
            console.log(deleted)
        }

        console.log(homePage)
        console.log("deleted")
    }

    const displayMemories = memories.map((memory, id) => {
        return (

            
            
            <div key={memory.id} className='container mx-auto shadow-lg rounded-lg max-w-md hover:shadow-2xl transition duration-300' style={{ margin: "30px" }}>
                <Link to={`/memories/${memory.id}`}>
                {memory.image ? <img className="rounded-t-lg w-full" src={memory.image.url} alt={`img${id}`} /> :  <img class="rounded-t-lg w-full" src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" alt={`img${id}`} /> }
                </Link>
                <div className="p-6">
                <p className="md:text-1xl text-xl hover:text-indigo-600 transition duration-200  font-bold text-gray-900 text-center">{memory.title}</p>

                <p>{memory.note.substring(0,50)}</p>
                </div>
                <p >{memory.date}</p>
                <div className='text-center my-4'>
                <Link to={`/memories/${memory.id}/edit`}>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 mx-8 rounded" >Edit</button>
                </Link>
                <button  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-8" onClick={() => handleDelete(memory.id)}>Delete</button>
                </div>
                
            </div>


        )
    })



    return (
        <div className="bg-gray-100 min-h-screen py-32 px-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 "> 
            {displayMemories}
        </div>
        </div>
    )
}