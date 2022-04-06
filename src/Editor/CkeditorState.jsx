import React, { useEffect, useState, useRef } from "react";
import {
  useCKEditor,
  CKEditorEventAction,
  registerEditorEventHandler,
} from "ckeditor4-react";
import $ from "jquery";
import "../style/style.scss";
import Bar from "./BarMenu";
import { TemplateRole } from "../System/data/template_role";
import { attribute_dinamic } from "../System/config/attribute";
import ComponsnetAttr from "./components/attribute";
import { praWizard } from "../System/proocces/main_api";
import { makeid } from "../System/Helpers/___func";
export default function Ckeditor({ someProp }) {
  const [heightEditor, setHeightEditor] = useState(0);
  const [element, setElement] = React.useState();
  const [sesion] = useState(makeid(10));
  String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
  };

  // configurasi editor
  const { editor } = useCKEditor({
    element,
    // `dispatchEvent` is memoized, so initial value of `someProp` will be always used.
    dispatchEvent: (action) => {
      switch (action.type) {
        case CKEditorEventAction.focus:
          console.log(`Will be called with initial value of ${someProp}.`);
          break;
        case CKEditorEventAction.change:
          //actios change
          sessionStorage.setItem("_contens", action.payload.editor.getData());
          praWizard(
            {
              code: action.payload.editor.getData(),
              session: sesion,
            },
            (res) => {
              console.log(res);
            }
          );
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
      allowedContent: true,
      width: "100%",
      // onSelectionChange: () => {
      //   console.log("ok");
      // },
      // initData: ,
      sharedSpaces: {
        top: "top",
        bottom: "bottoms",
      },
      // removeButtons: "PasteFromWord",
    },
  });
  React.useEffect(() => {
    if (editor) {
      editor.config.height = heightEditor + "px";
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
  useEffect(() => {
    console.log($("#container-editor").height() - $("#top").height());
  }, []);
  useEffect(() => {
    setHeightEditor(parseFloat($("#container-editor").height()) - 150);
  }, []);
  useEffect(() => {
    console.log(TemplateRole.model_insert_default("xx", "Y"));
  }, []);
  // ===========================
  function generateRandomFloatInRange(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  // action data
  const hndelClick = () => {
    editor.insertHtml(attribute_dinamic("xs", "nama_lengkap", "penduduk"));
  };
  const hndelAddAttr = (attr) => {
    editor.insertHtml(
      attribute_dinamic(
        generateRandomFloatInRange(),
        attr.data.label,
        attr.type,
        attr.data.label
      )
    );
  };
  const hndelPreviews = () => {
    console.log(editor.getData());
  };
  // =========================

  return (
    <div id='main-container-editor'>
      <div className='top-bar-clases'>
        {heightEditor != 0 && <div id='top'></div>}
        <div>{/* right menu add */}</div>
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
              }}
              className='editor-canvas'>
              {sessionStorage.getItem("_contens")}
            </textarea>
          )}
        </div>
        <div className='sidebar-container'>
          <Bar previes={hndelPreviews}>
            <ComponsnetAttr addAttr={hndelAddAttr} />
          </Bar>
        </div>
      </div>
    </div>
  );
}
