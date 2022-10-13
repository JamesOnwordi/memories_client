/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import { Sync } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './memory.css';
import { useAccordion } from '@material-tailwind/react';


export default function Memory({ currentUser }) {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const [plugins, setPlugins] = useState([]);
  const [memory, setMemory] = useState({});
  const [panelImages, setPanelImages] = useState([]);
  const [thumbImages, setThumbImages] = useState([]);

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
    <div class="antialiased mx-auto max-w-screen-xl">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">{memory.title}</h3>

      <div class="space-y-4">
        <div class="flex">
          <div class="flex-shrink-0 mr-3">
            <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""></img>
          </div>
          <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>{currentUser.name}</strong> <span class="text-xs text-gray-400">{memory.createdAt}</span>
            <p class="text-sm">
           {memory.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>     
};


