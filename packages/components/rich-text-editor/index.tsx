"use client";

import React, {useEffect, useRef, useState} from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Import the styles for the Quill editor


function RichTextEditor({value, onChange}: {value: string;
     onChange: (content: string) => void}) {
    const [editorValue, setEditorValue] = useState(value || '');
    const quillRef = useRef(false)
    useEffect(() => {
        if (typeof window !== 'undefined' && !quillRef.current) {
          quillRef.current = true;
          setTimeout(() => {
            document.querySelectorAll('.ql-editor').forEach((toolbar, index) => {
              if (index > 0) {
                toolbar.remove();
              }
            });
          }, 1000);
        }
      }, []);
      

  return (
    <div className='relative'>
        <ReactQuill
        theme="snow"
            value={editorValue}
            onChange={(content) => {
                setEditorValue(content);
                onChange(content);
            }}
            modules={{
                toolbar: [
                   [{font: []}],
                   [{header: [1,2,3,4,5,6,false]}],
                   [{size: ["small", false, "large", "huge"]}],
                   ['bold', 'italic', 'underline', 'strike'],
                     [{color: []}, {background: []}],
                     [{script: 'sub'}, {script: 'super'}],
                     [{list: 'ordered'}, {list: 'bullet'}],
                     [{align: []}],
                     ['blockquote', 'code-block'], 
                     ['link', 'image', 'video'],
                     ['clean'] // remove formatting button
                ],
            }}
            placeholder="Write a detailed description here..."
            className = "bg-transparent border border-gray-700 text-white rounded-md"
            style={{
                minHeight: '250px',
            }}
        />

        <style>
            {`
            .ql-toolbar {
                background-color: transparent;
                border-color: #444;
            }
            .ql-container {
                background-color: transparent !important;
                border-color: #444
                color: white
            }
            .ql-picker {
                color: white!important;
            }
            .ql-editor {
            min-height: 200px;
            }
            .ql-snow {
            border-color: #444 !important;
            }
            .ql-editor.ql-blank::before {
            color: #aaa !important;
            }
            .ql-picker-options {
                background-color: #333 !important;
                color: white !important;    
            }
            .ql-picker-item {
                color: white !important;
            }
                .ql-stroke {
                    stroke: white !important;
                }
                `}
        </style>      
    </div>
  )
}

export default RichTextEditor
