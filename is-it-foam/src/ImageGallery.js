import React, { useState, useEffect, useRef } from 'react';
import './ImageGallery.css';
import reactor from './reactorData.js';

const imageDivStyle = {
  border: 'black 1px solid',
  margin: '5px',
  display: 'grid'
}
const imageStyle = {
  maxWidth: '90%',
  padding: '1vh',
}

const gridItems = ['item1', 'item2', 'item3'];

const parsePhotoDate = (photoURL) => {
  return photoURL.slice(74, 84);
}

const parsePhotoTime = (photoURL) => {
  return photoURL.slice(89, 96);
}

const tagButton = (label) => {
  return (
    <button onClick={() => {console.log('perform ' + label + ' function')}}>
      {label}
    </button>
  )
}

function ImageGallery() {
  const [displayCount, setDisplayCount] = useState(12);
  const [filter, setFilter] = useState('no filter');

  const ref = useRef();

  const changeFilter = (e) => {
    setFilter(e.target.value);
  }

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setDisplayCount(displayCount + 3);
      }
    }
  }

  return (
    <>
      <div onChange={changeFilter}>
        Select a filter:
        <input
          type="radio"
          value="no filter"
          name="filter"
          checked={filter === "no filter"}
        />
        no filter
        <input
          type="radio"
          value="unclassified"
          name="filter"
          checked={filter === "unclassified"}
        />
        unclassified
        <input
          type="radio"
          value="foaming"
          name="filter"
          checked={filter === "foaming"}
        />
        foaming
        <input
          type="radio"
          value="not foaming"
          name="filter"
          checked={filter === "not foaming"}
        />
        not foaming
      </div>
      <div
        className="grid-container"
        onScroll={onScroll}
        ref={ref}
        style={{ height: "80vh", overflowY: "auto" }}
      >
        {reactor.data.slice(0, displayCount).map((reactor, idx) => {
          return <div className={gridItems[idx%3]} style={imageDivStyle}>
            <img style={imageStyle} src={reactor.url} alt='reactor image' key={idx} />
            <p style={{fontSize: '10px', margin: '0px'}}>
              image taken on {parsePhotoDate(reactor.url)}
              at {parsePhotoTime(reactor.url)}
            </p>
            <p>
              Mark image as: {tagButton('foaming')} {tagButton('not foaming')}
            </p>
          </div>
        })}
      </div>
    </>
  )
}

export default ImageGallery;
