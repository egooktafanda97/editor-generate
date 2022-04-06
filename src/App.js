import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Popper from "popper.js";

import Editor from "./Editor/CkeditorState";

function App() {
  return (
    <div className='App'>
      <Editor />
    </div>
  );
}

export default App;
