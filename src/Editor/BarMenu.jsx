import React from "react";

export default function BarMenu(props) {
  return (
    <div className='containers-bar'>
      <div className='top-bar-clases'>
        <button className='btn-ui'>attr</button>
        <button className='btn-ui'>prop</button>
        <button className='btn-ui'>action</button>
        <button className='btn-ui'>attac</button>
        <button
          className='btn-ui'
          onClick={() => {
            props.previes();
          }}>
          preview
        </button>
      </div>
      {props.children}
    </div>
  );
}
