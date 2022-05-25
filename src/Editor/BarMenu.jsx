import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import AutoValue from "./components/attr/AutoValue";
import ManualValue from "./components/attr/ManualValue";
import Properti from "./components/setting/Properti";
import Action from "./components/action/Action";
import Attachment from "./components/Attachment/Attachment";
import { useSelector, useDispatch } from "react-redux";
const Attr = require("../System/config/attribute.json");

export default function BarMenu(props) {
  const dispatch = useDispatch();
  const [pageItem, setpageItem] = useState(() => {});
  const hndelPageAttr = (name) => {
    setpageItem(
      <AutoValue {...props} config={Attr.find((x) => x.name === name)} />
    );
  };
  return (
    <div className='containers-bar'>
      <div className='top-bar-clases'>
        {/* <button className='btn-ui'>attr</button> */}
        <Popup
          trigger={<button className='btn-ui'>attr</button>}
          position='left top'>
          <ul className='ul-dropdown'>
            {Attr.map((attr, index) => (
              <li
                className='li-dropdown'
                key={index}
                onClick={() => {
                  hndelPageAttr(attr.name);
                }}>
                <a className='button-dropdown'>{attr.title}</a>
              </li>
            ))}
            <li
              className='li-dropdown'
              onClick={() => {
                setpageItem(<ManualValue {...props} />);
              }}>
              <button className='button-dropdown'>Inputan</button>
            </li>
          </ul>
        </Popup>
        <button
          className='btn-ui'
          onClick={() => {
            setpageItem(<Properti modal={`show-mod`} />);
          }}>
          prop
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: "MODAL-ACTION", payload: "show-mod" });
            setpageItem(<Action />);
          }}>
          action
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: "MODAL-ATTAC", payload: "show-mod" });
            setpageItem(<Attachment />);
          }}>
          attac
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: "PREVIEW", payload: "show-preview" });
          }}>
          preview
        </button>
      </div>
      {pageItem}
      {/* <ManualValue {...props} />
      {Config.map((resource, i) => (
        <AutoValue {...props} config={resource} />
      ))} */}
      {/* {props.children} */}
    </div>
  );
}
