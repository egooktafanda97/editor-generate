import React, { useState, useEffect } from "react";
import Select from "react-select";
import swal from "@sweetalert/with-react";
import { FaFileAlt, FaTimes, FaCog, FaTrash } from "react-icons/fa";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
// ==========================================================

export default function Attachment(props) {
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  const closeModal = () => {
    dispatch({ type: "MODAL-ACTION", payload: "hide-mod" });
  };

  const addAttc = () => {
    const Att = getRedux.ATTACHMENT;
    dispatch({
      type: "ATTACHMENT",
      payload: [...Att, { name: $("#name").val(), value: $("#label").val() }],
    });
  };
  return (
    <div>
      <div className={`modal-costumes ${getRedux.MODALATTAC}`}>
        <div className='flex flex-row justify-between w-full items-center mb-3'>
          <h5>Attachment</h5>
          <span
            className='btn-closed'
            onClick={() => {
              $(".modal-costumes").addClass("hide-mod").removeClass("show-mod");
              closeModal();
            }}>
            <FaTimes />
          </span>
        </div>
        <hr />
        <div className='cards'>
          <div className='row'>
            <div className='col-12 text-left mt-4'>
              <div
                className='from-group mb-1'
                style={{
                  width: "100%",
                }}>
                <label htmlFor='' className='labels'>
                  Name
                </label>
                <div className='text-left msg-inp'>
                  {/* <i>jenis input</i> */}
                </div>
                <input
                  type='text'
                  className='form-input-style h-30px shadow-sm'
                  id='name'
                  placeholder='lebel atribut'
                />
              </div>
              <div
                className='from-group mb-1'
                style={{
                  width: "100%",
                }}>
                <label htmlFor='' className='labels'>
                  Label
                </label>
                <div className='text-left msg-inp'>
                  {/* <i>jenis input</i> */}
                </div>
                <input
                  type='text'
                  className='form-input-style h-30px shadow-sm'
                  id='label'
                  placeholder='lebel atribut'
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}>
                <button
                  className='btn-ui btn-main-primary'
                  style={{ color: "#fff" }}
                  onClick={addAttc}>
                  Add
                </button>
              </div>
            </div>
            <hr />
            <div className='col-12 text-left mt-4'>
              <table className='table' style={{ fontSize: ".6em" }}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Label</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {getRedux.ATTACHMENT.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.value}</td>
                        <td>
                          <button
                            className='btn-ui btn-main-danger'
                            onClick={() => {
                              const Att = getRedux.ATTACHMENT;
                              Att.splice(index, 1);
                              dispatch({
                                type: "ATTACHMENT",
                                payload: Att,
                              });
                            }}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
