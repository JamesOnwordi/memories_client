import React from 'react';
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import { Sync } from "@egjs/flicking-plugins";
import { useParams, useNavigate} from 'react-router-dom';
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './memory.css';
import { useAccordion } from '@material-tailwind/react';


export default function Memory({ currentUser }) {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const [plugins, setPlugins] = useState([]);
  const [memory, setMemory] = useState({comment:''});
  const [panelImages, setPanelImages] = useState([])
  const [thumbImages, setThumbImages] = useState([])
  const [comments ,setComments] = useState([])
  const {id} = useParams()
  const [theComment, setTheComment] = useState([])
  const [change, setChange] = useState(true)

  useEffect(() => {
    // pull token from local storage
    const token = localStorage.getItem('jwt')
    // set request headers
    const options = {
      headers: {
        "Authorization": token
      }
    }
    const url = window.location.pathname
    console.log(url)
    axios.get(process.env.REACT_APP_SERVER_URL + '/api-v1' + url, options)
      .then(response => {
        const foundMemory = response.data
        setMemory(foundMemory)
        console.log(foundMemory)
        // map images for panels
        const panelImages = foundMemory.images.map((image, i) => {
          return (
            <div className="flicking-panel full has-background-primary">
              <img className="panel-image" src={image.url} alt={`image${i}`} />
            </div>
          )
        })
        setPanelImages(panelImages)

        const allComments = foundMemory.comments.map((comment, i) => {
          return (
            <div className="space-y-4  my-4">
      
              <div className="flex">      
                <div className="flex-shrink-0 mr-3">
                  <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""></img>
                </div>
                <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>{foundMemory.userId.name}</strong> <span className="text-xs text-gray-400">{" commented at "+comment.createdAt.substring(11,16) + " on the " + comment.createdAt.substring(0,10)}</span>
                  <p className="text-sm">
                    
                    <p className="text-lg"> {comment.note} </p>
                  </p>
                  <div className="mt-4 flex items-center">
                  </div>
                </div>
                <div className='text-center flex ml-3'>
                <button onClick={()=>{deleteComment(comment._id)}}>
                  Delete
                </button>
              </div>
              </div>
              
            </div>
          )
        })
        setComments(allComments)
        // map images for thumbnails
        const thumbImages = foundMemory.images.map((image, i) => {
          return (
            <div className='flicking-panel full has-background-primary'>
              <img className='thumb-image' src={image.url} alt={`image${i}`} />
            </div>
          )
        })
        setThumbImages(thumbImages)
      }).catch(error => {
        console.log(error)
      })
  }, [change]);

  useEffect(() => {
    setPlugins([new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        {
          flicking: flicking0.current,
          isSlidable: true
        },
        {
          flicking: flicking1.current,
          isClickable: true,
          activeClass: "active"
        }
      ]
    })]);
  }, [change]);

  const submitComment = async(e) =>{
    e.preventDefault()
    console.log(id)
    
    try{
      console.log(theComment)
      const data = {
        
        note:theComment
      }
    // pull token from local storage
    
    const token = localStorage.getItem('jwt')
    // set request headers
    const options = {
      headers: {
        "Authorization": token
      }
    }
    axios.post(process.env.REACT_APP_SERVER_URL + '/api-v1/memories/comment/'+id , data, options)
    .then(()=>{
      setTheComment('')
      setChange(!change)
      
    })
  }catch(err){
    console.log(err)
  }
  }
  const deleteComment = async(cid) =>{
    console.log(cid)
    console.log(id)
    
    try{
    // pull token from local storage
    
    const token = localStorage.getItem('jwt')
    // set request headers
    const options = {
      headers: {
        "Authorization": token
      }
    }
    axios.delete(process.env.REACT_APP_SERVER_URL + '/api-v1/memories/comment/'+id+'/'+cid, options)
    .then(()=>{
      setChange(!change)
    })
  }catch(err){
    console.log(err)
  }
  }



  

console.log(theComment)
console.log(comments)
  return <div className='mt-4'>
    <Flicking ref={flicking0}
      className="mb-4"
      bounce={30}
      plugins={plugins}
      align="center"
      autoResize={true}
      adaptive={true}
      circular={true}
    >
      {panelImages}
    </Flicking>

    <Flicking ref={flicking1}
      moveType="freeScroll"
      bounce={30}
      align="center"
      autoResize={true}
      adaptive={true}
      circular={true}
    >
      {thumbImages}
    </Flicking>

    <div class="antialiased mx-auto max-w-screen-xl">
      <div className='text-center mt-6'>
      <h3 class="mb-4 text-3xl font-bold text-gray-900">{memory.title}</h3>
      <div className='container mx-auto'>
        <p className='text-xl font-mono'> {memory.note} </p>
      </div>
      </div>
      </div>
      
    <div class="antialiased mx-auto max-w-screen-xl">
    <div className='text-center mt-6'>
    </div>
      <div class="space-y-4">
        <p > {comments} </p>
        <div className='text-center'>
        <p className='py-4' onClick={submitComment} ></p>
        </div>
      </div>
      <form className='text-center'>
        <div className='' style={{backgroundColor:'grey'}}>
        <input className="placeholder:italic text-2xl text-center fon placeholder:text-slate-400 block bg-white w-full border border-slate-600 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "  placeholder=" make a new comment !" type="text" value={theComment} onChange={e=>{setTheComment(e.target.value)}} />
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 my-8 border-b-4 border-yellow-700 hover:border-yellow-500 rounded" onClick={submitComment}> Add new Comment</button>
      </form>
    </div>
  </div>

};