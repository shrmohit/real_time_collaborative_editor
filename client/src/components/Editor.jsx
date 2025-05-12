import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

const Editor = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editor.setSize(null, "100%");
    };
    init();
  }, []);
  return (
    <div className="h-[600px]">
      <textarea
        id="realtimeEditor"
        className="w-full h-full resize-none p-4 bg-gray-900 text-white rounded-md outline-none"
      />
    </div>
  );
};

export default Editor;
