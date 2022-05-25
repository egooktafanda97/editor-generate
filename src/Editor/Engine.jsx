import React, { useEffect, useState, useRef } from "react";
import {
  useCKEditor,
  CKEditorEventAction,
  registerEditorEventHandler,
} from "ckeditor4-react";
import $ from "jquery";
import "../styles/style.scss";
import Bar from "./BarMenu";
import { useSelector, useDispatch } from "react-redux";
import { FaFileExport } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ---------------------------------------------
import { praWizard } from "../System/proocces/main_api";
import { makeid, cm2px } from "../System/Helpers/___func";
import { export_wizard } from "../System/Model/model_api";
import { GenerateSource, getTypeManualName } from "../System/Helpers/lib";

const EditorCofig = require("../System/config/config.json");

export default function Engine({ someProp }) {
  // ---- redux --------------------------------
  const getRedux = useSelector((state) => state);
  //--------------------------------------------
  const [loading, setLoading] = useState(true);
  const [heightEditor, setHeightEditor] = useState(0);
  const [element, setElement] = React.useState();
  const [open, setOpen] = useState(false);

  const [sesion] = useState(makeid(10));
  String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
  };

  // configurasi editor
  const { editor } = useCKEditor({
    element,
    dispatchEvent: (action) => {
      switch (action.type) {
        case CKEditorEventAction.focus:
          console.log(`Will be called with initial value of ${someProp}.`);
          break;
        case CKEditorEventAction.change:
          localStorage.setItem("_contens", action.payload.editor.getData());
          break;
        default:
          break;
      }
    },
    subscribeTo: ["focus", "change"],
    contenteditable: true,
    config: {
      extraPlugins: "fixed",
      extraPlugins: "sharedspace",
      removePlugins: "maximize,resize",
      resize_enabled: false,

      tabSpaces: 4,
      allowedContent: true,
      sharedSpaces: {
        top: "top",
        bottom: "bottoms",
      },

      removeButtons: "PasteFromWord",
    },
  });
  useEffect(() => {
    if (editor) {
      editor.config.height = heightEditor + "px";
      editor.config.width = EditorCofig.editor.width;

      // Registers new handler with high priority whenever value of `someProp` changes.
      const cleanup = registerEditorEventHandler({
        editor,
        evtName: "focus",
        handler: () => {
          console.log(
            `Will be called with current value of ${someProp} before regular event handlers.`
          );
        },
        priority: 0,
      });
      return cleanup;
    }
  }, [editor, someProp]);
  const setterLayout = () => {
    editor.resize(200, heightEditor + "px");
  };
  // useEffect(() => {
  //   if (editor) {
  //     // console.log(
  //     //   cm2px(getRedux.papperSetting.height),
  //     //   cm2px(getRedux.papperSetting.width)
  //     // );
  //     // cm2px(getRedux.papperSetting.height)
  //     // console.log($(".editor-frame").width());
  //     editor.resize("100px", "350");
  //   }
  // }, [getRedux.papperSetting.height, getRedux.papperSetting.width]);
  useEffect(() => {
    if (loading == false) {
      setHeightEditor(parseFloat($("#container-editor").height()) - 150);
    }
  }, [loading]);
  // useEffect(() => {
  //   console.log($("#container-editor").height() - $("#top").height());
  // }, []);

  // useEffect(() => {
  //   console.log(TemplateRole.model_insert_default("xx", "Y"));
  // }, []);
  // ===========================

  const hndelAddAttr = (attr) => {
    editor.insertHtml(attr);
  };

  const hndelPreviews = () => {
    // console.log(editor.getData());
    praWizard(
      {
        code: editor.getData(),
        session: sesion,
      },
      (res) => {
        console.log(res);
      }
    );
  };
  // =========================

  $(".sidebar-container").css(
    "height",
    `calc(100% - ${$(".top-bar-clases").height()}px)`
  );
  // inisiasi
  useEffect(() => {
    setLoading(false);
  }, []);

  // =========================
  const onCloseModal = () => setOpen(false);
  const exportsPapper = () => {
    setOpen(true);
  };
  const hndelExports = (ev) => {
    ev.preventDefault();
    onCloseModal();
    $(".containerLoadingFull").addClass("show-load").removeClass("hide-load");
    const form_data = new FormData(ev.target);
    form_data.append("code", editor.getData());
    form_data.append("session_code", sesion);
    form_data.append("code", localStorage.getItem("_contens"));
    form_data.append("config", localStorage.getItem("config"));
    form_data.append(
      "manual_name",
      JSON.stringify(getTypeManualName(editor.getData()))
    );
    export_wizard(form_data, (res) => {
      var refreshIntervalId = setInterval(() => {
        swal("Success", "Export Success", "success");
        $(".containerLoadingFull")
          .addClass("hide-load")
          .removeClass("show-load");
        clearInterval(refreshIntervalId);
      }, 2000);
    });
  };
  return loading ? (
    <div>loading...</div>
  ) : (
    <div id='main-container-editor'>
      <div className='top-bar-clases'>
        {heightEditor != 0 && <div id='top'></div>}
        <div className='mt-3' style={{ marginRight: "15px" }}>
          {/* export */}
          <button className='btn-ui btn-main-export' onClick={exportsPapper}>
            <FaFileExport /> Export
          </button>
          {/* right menu add */}
        </div>
      </div>

      <div
        id='container-editor'
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}>
        <div className='editor-frame'>
          {heightEditor != 0 && (
            <textarea
              ref={setElement}
              id='bottoms'
              style={{
                width: "100%",
                height: heightEditor + "px",
                padding: 1000,
              }}
              className='editor-canvas'>
              {localStorage.getItem("_contens")}
            </textarea>
          )}
        </div>
        <div className='sidebar-container'>
          <Bar previes={hndelPreviews} addAttr={hndelAddAttr} />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={hndelExports}>
          <div className='cards p-3' style={{ width: "400px" }}>
            <div
              className='from-group mb-1'
              style={{
                width: "100%",
              }}>
              <label htmlFor='' className='labels'>
                Papper Title
              </label>
              <div className='text-left msg-inp'>
                {/* <i>label kan menjadi label pada text input</i> */}
              </div>
              <input
                type='text'
                className='form-input-style h-30px shadow-sm'
                style={{ border: "1px solid #ccc" }}
                name='name'
                placeholder='lebel atribut'
              />
            </div>
            <div
              className='from-group mb-1'
              style={{
                width: "100%",
              }}>
              <label htmlFor='' className='labels'>
                Kode Desa
              </label>
              <div className='text-left msg-inp'>
                {/* <i>label kan menjadi label pada text input</i> */}
              </div>
              <input
                type='text'
                className='form-input-style h-30px shadow-sm'
                style={{ border: "1px solid #ccc" }}
                name='kode_desa'
                placeholder='lebel atribut'
              />
            </div>
            <div
              className='from-group mb-1'
              style={{
                width: "100%",
              }}>
              <label htmlFor='' className='labels'>
                Papper Code
              </label>
              <div className='text-left msg-inp'>
                {/* <i>label kan menjadi label pada text input</i> */}
              </div>
              <input
                type='text'
                className='form-input-style h-30px shadow-sm'
                style={{ border: "1px solid #ccc" }}
                name='kode_surat'
                placeholder='lebel atribut'
              />
            </div>
            <div
              className='from-group mb-1'
              style={{
                width: "100%",
              }}>
              <label htmlFor='' className='labels'>
                Description
              </label>
              <div className='text-left msg-inp'>
                {/* <i>jika perlu tambahkan keterangan input di sini</i> */}
              </div>
              <textarea
                style={{ border: "1px solid #ccc" }}
                type='text'
                className='form-input-style shadow-sm'
                name='description'
                placeholder='keternagan pada inputan'></textarea>
            </div>
            <hr />
            <div
              className='from-group mb-1 mt-3'
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <button className='btn-ui btn-main-primary color-whith'>
                Export
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <div className='containerLoadingFull hide-load'>
        <div className='loaderWidget'></div>
        <h2 className='mt-3 loadText'>Loading</h2>
      </div>
    </div>
  );
}
