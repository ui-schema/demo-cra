import React from 'react';
import AceEditor from "react-ace";
import ace from 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-statusbar";
import "ace-builds/src-noconflict/theme-cobalt";

ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/");
ace.config.setModuleUrl('ace/mode/javascript_worker', "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-javascript.js");

const RichCodeEditor = ({
                            value, onChange, name, readOnly,
                            tabSize = 2, fontSize = 13, theme = 'cobalt', mode = 'json', raw = false, renderChange = 0,
                        }) => {
    const [editor, setEditor] = React.useState({});

    React.useEffect(() => {
        if(editor && editor.resize && editor.renderer) {
            editor.resize();
            editor.renderer.updateFull();
        }
    }, [editor, renderChange]);

    if(raw) {
        return <textarea
            onChange={e => onChange(e.target.value)} value={value}
            style={{
                fontSize, fontFamily: 'Consolas, "Lucida Console", Courier, monospace', lineHeight: '1.27em',
                width: '100%', height: 'auto', flexGrow: 2,
                border: '1px solid lightgrey', display: 'block', margin: 0, boxSizing: 'border-box'
            }}
        />;
    }

    return <AceEditor
        mode={mode}
        theme={theme}
        value={value}
        onChange={onChange}
        name={name}
        editorProps={{$blockScrolling: true}}
        showGutter={true}
        showPrintMargin={false}
        highlightActiveLine={true}
        orientation={'below'}
        style={{width: '100%', height: 'auto', flexGrow: 2, lineHeight: '1.27em'}}
        width={'100%'}
        minLines={10}
        enableSnippets
        enableBasicAutocompletion
        enableLiveAutocompletion
        wrapEnabled
        readOnly={readOnly}
        onLoad={editor => setEditor(editor)}
        tabSize={tabSize}
        setOptions={{
            wrap: true,
            autoScrollEditorIntoView: true,
            enableMultiselect: true,
            wrapBehavioursEnabled: true,
            useWorker: false,// currently shows errors for valid JSON, to turn syntax checking on change to `true` and check imports/workers at top of page
            mergeUndoDeltas: true,
            showLineNumbers: true,
            scrollPastEnd: 0.3,
            fontSize: fontSize,
        }}
    />
};

export {RichCodeEditor}
