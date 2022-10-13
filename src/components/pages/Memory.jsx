import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import { Sync } from "@egjs/flicking-plugins";
import { useParams, useNavigate} from 'react-router-dom';
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './memory.css';


export default function Memory() {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const [plugins, setPlugins] = useState([]);
  const [memory, setMemory] = useState({});
  const [panelImages, setPanelImages] = useState([])
  const [thumbImages, setThumbImages] = useState([])
  const [comments, setComments] = useState([])
  const [theComment,setTheComment] = useState('')
  const {id} = useParams()
  const inputRef = useRef(null)
  const navigate = useNavigate()

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
        const allComments = foundMemory.images.map((image, i) => {
          return (
            <div className="space-y-4  my-4">

              <div className="flex">      
                <div className="flex-shrink-0 mr-3">
                  <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""></img>
                </div>
                <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>Sarah</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat, sed diam voluptua.
                  </p>
                  <div className="mt-4 flex items-center">
                  </div>
                </div>
              </div>

            </div>
          )
        })
        setComments(allComments)
        setPanelImages(panelImages)
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
  }, []);

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
  }, []);

  const submitComment = async(e) =>{
    e.preventDefault()
    console.log(id)
    
    try{
    const formData = new FormData()
    formData.append('comment', theComment)
    // pull token from local storage
    const token = localStorage.getItem('jwt')
    // set request headers
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": token
      }
    }
    console.log(formData.values)
    axios.post(process.env.REACT_APP_SERVER_URL + '/api-v1/memories/comment/'+id , formData, options)
  }catch(err){
    console.log(err)
  }
  }
   
console.log(theComment)
  return <div>
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

    <div className='text-center my'>
        <p className="mb-4 text-xl font-semibold text-gray-900 font-mono">
          Note
        </p>
      </div>
      <div className='relative'>

        <div className='container text-xl mx-auto px-4 font-mono'>
          <p> {memory.note}</p>
        </div>
      </div>

    <div className='my-10 text-center'>
      
    </div>
    <div className="antialiased mx-auto max-w-screen-xl">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

      <div >

        {/* for comments */}
      {comments}

      <form>
        <div>
          <input type='text' value={theComment} onChange={e=>{setTheComment(e.target.value)}}></input>
        </div>
        <button onClick={submitComment}>Add Comment</button>
      </form>
      </div>
      </div>
    </div>

};


