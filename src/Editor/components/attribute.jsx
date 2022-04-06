import React, { useState, useEffect } from "react";
import Select from "react-select";
import { pendudukSelect } from "../../System/data/dummy";
export default function Attribute(props) {
  const [value, setValue] = useState([]);
  const [type, setType] = useState("penduduk");
  return (
    <div className='group-attr'>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          Pilih Atribute Penduduk
        </label>
        <div className='text-left msg-inp'>
          <i>data akan otomatis terisi dengan data yang di pilih</i>
        </div>
        <Select
          className='select-module'
          options={pendudukSelect}
          onChange={(opt) =>
            setValue({
              data: opt,
              type: type,
            })
          }
        />
      </div>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <button
          className='btn-ui btn-main-primary'
          onClick={() => {
            props.addAttr(value);
          }}>
          apply
        </button>
      </div>
    </div>
  );
}
