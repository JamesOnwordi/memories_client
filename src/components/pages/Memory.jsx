import React from 'react';
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import { Sync } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { useState, useEffect ,useRef } from 'react';
import axios from 'axios';
import './memory.css';


export default function Memory() {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const [plugins, setPlugins] = useState([]);
  
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
    circular={true}>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364312/cld-sample-5.jpg" alt="image1" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364310/cld-sample.jpg" alt="image2" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364311/cld-sample-2.jpg" alt="image3" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364311/cld-sample-3.jpg" alt="image4" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364312/cld-sample-5.jpg" alt="image5" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364312/cld-sample-4.jpg" alt="image6" />
    </div>
  </Flicking>
  <Flicking ref={flicking1}
    moveType="freeScroll"
    bound={true}
    bounce={30}
    align="center"
    autoResize={true}
    adaptive={true}
    circular={true} >
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364312/cld-sample-5.jpg" alt="image1" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364310/cld-sample.jpg" alt="image2" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364311/cld-sample-2.jpg" alt="image3" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364311/cld-sample-3.jpg" alt="image4" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364312/cld-sample-5.jpg" alt="image5" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="https://res.cloudinary.com/ddmvwck8i/image/upload/v1665364312/cld-sample-4.jpg" alt="image6" />
    </div>
  </Flicking>
  </div>



};
