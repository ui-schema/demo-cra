import React from 'react';
import {Paper, Typography, useTheme} from "@material-ui/core";
import {FormatSize, FormatShapes, Code, SpaceBar, RestorePage, HorizontalSplit, VerticalSplit} from "@material-ui/icons";
import {isInvalid, createMap, createOrderedMap, SchemaEditorProvider, SchemaRootRenderer, useSchemaData} from "@ui-schema/ui-schema";
import {widgets} from "@ui-schema/ds-material";
import Nav from "../component/Nav";
import {RichCodeEditor} from "../component/RichCodeEditor";

const IconInput = ({
                       verticalSplit, title,
                       onChange, value, min,
                       Icon, opacity = 0.4, scale = 0.8,
                   }) => {
    return <div
        style={{margin: verticalSplit ? '0 0 6px 0' : '3px 6px 3px 0', flexShrink: 0, padding: 6, display: 'flex', position: 'relative'}}
    ><span style={{margin: 'auto'}}>
        <input type={'number'} className={'no-spin'}
               title={title}
               style={{
                   position: 'absolute', zIndex: 2, top: 0, right: 0, bottom: 0, left: 0,
                   background: 'transparent', border: '1px solid lightgrey', boxSizing: 'border-box',
                   textAlign: 'center', fontSize: '0.9rem', fontFamily: 'Consolas, "Lucida Console", Courier, monospace', fontWeight: 'bold',
                   width: '100%', paddingBottom: 10
               }}
               value={value} onChange={onChange} min={min}/>
        <Icon
            style={{visibility: 'hidden', display: 'block'}}
            fontSize={'small'}
        />
        <Icon
            style={{opacity, display: 'block', transform: 'scale(' + scale + ')', position: 'absolute', bottom: -2}}
            fontSize={'small'}
        />
    </span></div>
};

const unFocus = e => {
    let found = false;
    let parent = e.target;

    do {
        if(parent.nodeName === 'BUTTON') {
            let t = parent;
            setTimeout(() => t.blur(), 400);
            found = true
        } else parent = parent.parentElement;
    } while(!found && parent);
};

const EditorsNav = ({
                        verticalSplit, changeSplit,
                        setTabSize, tabSize,
                        setFontSize, fontSize,
                        activeSchema, changeSchema,
                        toggleRichIde, richIde,
                        schemas,
                    }) => <div
    style={{
        marginBottom: verticalSplit ? 'auto' : 0, marginLeft: verticalSplit ? 12 : 0, display: 'flex',
        flexDirection: verticalSplit ? 'column-reverse' : 'row', order: 2,
        borderTop: verticalSplit ? 0 : '1px solid lightgrey',
    }}
>
    {verticalSplit ? null : <div style={{marginRight: 'auto', display: 'flex'}}>
        <SchemaChanger schemas={schemas} style={{margin: 'auto 4px'}} activeSchema={activeSchema} changeSchema={changeSchema}/>
    </div>}

    <IconInput
        title={'Font Size'} value={fontSize} onChange={e => setFontSize(e.target.value * 1)}
        verticalSplit={verticalSplit} min={6}
        Icon={FormatSize}
    />
    <IconInput
        title={'Indentation Size'} value={tabSize} onChange={e => setTabSize(e.target.value * 1)}
        verticalSplit={verticalSplit} min={2}
        Icon={SpaceBar} opacity={0.5} scale={0.9}
    />

    <button
        style={{cursor: 'pointer', margin: verticalSplit ? '0 0 6px 0' : '3px 6px 3px 0', flexShrink: 0, padding: 6, display: 'flex', border: '1px solid lightgrey'}}
        onClick={() => changeSchema(activeSchema)} onMouseUp={unFocus}
        aria-label={'reset data and schema'}
    ><span style={{margin: 'auto'}}>
        <RestorePage
            titleAccess={'reset data and schema'}
            style={{display: 'block'}}
            fontSize={'small'}
        />
    </span></button>

    <button
        style={{cursor: 'pointer', margin: verticalSplit ? '0 0 6px 0' : '3px 6px 3px 0', flexShrink: 0, padding: 6, display: 'flex', border: '1px solid lightgrey'}}
        onClick={() => toggleRichIde()}
        aria-label={'Switch to ' + (richIde ? 'text' : 'web ide')}
    ><span style={{margin: 'auto'}}>
        {richIde ? <Code
            titleAccess={'Switch to ' + (richIde ? 'text' : 'web ide')}
            style={{display: 'block'}}
            fontSize={'small'}
        /> : <FormatShapes
            titleAccess={'Switch to ' + (richIde ? 'text' : 'web ide')}
            style={{display: 'block'}}
            fontSize={'small'}
        />}
    </span></button>

    <button
        style={{cursor: 'pointer', margin: verticalSplit ? '0 0 6px 0' : '3px 6px 3px 0', flexShrink: 0, padding: 6, display: 'flex', border: '1px solid lightgrey'}}
        onClick={changeSplit} onMouseUp={unFocus}
        aria-label={'Switch to ' + (verticalSplit ? 'horizontal' : 'vertical') + ' split'}
    ><span style={{margin: 'auto'}}>
        {verticalSplit ? <HorizontalSplit
            titleAccess={'Switch to ' + (verticalSplit ? 'horizontal' : 'vertical') + ' split'}
            style={{display: 'block'}}
            fontSize={'small'}
        /> : <VerticalSplit
            titleAccess={'Switch to ' + (verticalSplit ? 'horizontal' : 'vertical') + ' split'}
            style={{transform: 'rotate(180deg)', display: 'block'}}
            fontSize={'small'}
        />}
    </span></button>
</div>;

const SchemaJSONEditor = ({schema, setJsonError, setSchema, vertical, tabSize, fontSize, richIde}) => {
    return <RichCodeEditor
        vertical={vertical}
        tabSize={tabSize}
        fontSize={fontSize}
        raw={!richIde}
        value={typeof schema === 'string' ? schema : JSON.stringify(schema.toJS(), null, tabSize)}
        onChange={(newValue) => {
            try {
                setJsonError(false);
                setSchema(createOrderedMap(JSON.parse(newValue)));
            } catch(e) {
                setJsonError(e.toString());
                setSchema(newValue);
            }
        }}
        name={'live-editor'}
    />
};

const SchemaDataDebug = ({vertical, tabSize, fontSize, richIde}) => {
    const {store} = useSchemaData();

    return <RichCodeEditor
        value={JSON.stringify(store.toJS(), null, tabSize)}
        name={'live-editor-debug'}
        vertical={vertical}
        tabSize={tabSize}
        fontSize={fontSize}
        raw={!richIde}
        readOnly
    />
};

const SchemaChanger = ({activeSchema, changeSchema, style, schemas}) => {
    const {palette} = useTheme();

    return <Typography component={'label'} variant={'overline'} style={{...style, lineHeight: '2.4', display: 'flex', flexWrap: 'wrap'}}>
        <span style={{padding: '0 4px', background: palette.text.primary, color: palette.background.default, flexShrink: 0}}>Active Example:</span>
        <Typography
            component={'select'} variant={'overline'}
            value={activeSchema} onChange={e => changeSchema(e.target.value * 1)}
            style={{border: '1px solid lightgrey', padding: 3, fontWeight: 'bold', letterSpacing: '0.11em', lineHeight: '1.3'}}
        >
            {schemas.map((schema, i) => (
                <option key={i} value={i}>{schema[0]}</option>
            ))}
        </Typography>
    </Typography>
};

const initialLocalBoolean = (key, def) => {
    if(
        typeof window.localStorage.getItem('live-editor-vertical') !== 'undefined' &&
        window.localStorage.getItem('live-editor-vertical') !== null &&
        !isNaN(window.localStorage.getItem('live-editor-vertical') * 1)
    ) {
        return !!(window.localStorage.getItem('live-editor-vertical') * 1);
    }

    return def;
};

const Editor = ({schemas}) => {
    const [showValidity, setShowValidity] = React.useState(false);
    const [validity, setValidity] = React.useState(createMap());

    // Custom State for Live-Editor
    let initialVertical = initialLocalBoolean('live-editor-vertical', 800 < window.innerWidth);// Vertical by default for desktop
    let initialRichIde = initialLocalBoolean('live-editor-rich-ide', true);
    const [verticalSplit, setVerticalSplit] = React.useState(initialVertical);
    const [richIde, setRichIde] = React.useState(initialRichIde);
    const [jsonError, setJsonError] = React.useState(false);
    const [activeSchema, setActiveSchema] = React.useState(0);
    const [tabSize, setTabSize] = React.useState(2);
    const [fontSize, setFontSize] = React.useState(13);
    const [schema, setSchema] = React.useState(schemas[activeSchema][1]);
    const [data, setData] = React.useState(schemas[activeSchema][2]);

    const changeSplit = React.useCallback(() => {
        // toggle verticalSplit and change selected in localStorage
        setVerticalSplit(p => {
            window.localStorage.setItem('live-editor-vertical', p ? '0' : '1');
            return !p;
        })
    }, [setVerticalSplit]);

    const toggleRichIde = React.useCallback(() => {
        // toggle richIde and change selected in localStorage
        setRichIde(p => {
            window.localStorage.setItem('live-editor-rich-ide', p ? '0' : '1');
            return !p;
        })
    }, [setRichIde]);

    const changeSchema = React.useCallback(i => {
        setShowValidity(false);
        setActiveSchema(i);
        setSchema(schemas[i][1]);
        setData(schemas[i][2]);
        // `setValidity` is not needed, as it cleans itself on dismounts and fills itself again on new mounts
    }, [setActiveSchema, setShowValidity, setSchema, setData, schemas]);

    return <SchemaEditorProvider
        schema={schema}
        store={data}
        onChange={setData}
        widgets={widgets}
        validity={validity}
        showValidity={showValidity}
        onValidity={setValidity}
    >
        <div style={{display: 'flex', flexGrow: 2, overflow: 'auto', flexDirection: verticalSplit ? 'row' : 'column'}}>
            <div style={{
                width: verticalSplit ? '45%' : '100%', flexShrink: 0,
                display: 'flex', minHeight: verticalSplit ? 'auto' : '350px',
                order: verticalSplit ? 1 : 3,
                overflow: 'auto',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: verticalSplit ? 'column' : 'row',
                    minWidth: verticalSplit ? 'auto' : 800,
                    flexGrow: 2,
                }}>
                    {verticalSplit ? <SchemaChanger schemas={schemas} style={{marginLeft: 4}} activeSchema={activeSchema} changeSchema={changeSchema}/> : null}

                    <div style={{height: 'auto', flexGrow: 2, display: 'flex', flexDirection: 'column', width: verticalSplit ? 'auto' : '50%', paddingRight: verticalSplit ? 0 : 6}}>
                        <Typography component={'p'} variant={'overline'} style={{marginLeft: 4}}>
                            Schema:
                        </Typography>
                        <SchemaJSONEditor
                            schema={schema}
                            setJsonError={setJsonError}
                            setSchema={setSchema}
                            vertical={verticalSplit}
                            tabSize={tabSize}
                            fontSize={fontSize}
                            richIde={richIde}
                        />
                    </div>

                    <div style={{height: verticalSplit ? '30%' : 'auto', display: 'flex', flexDirection: 'column', flexShrink: 0, width: verticalSplit ? 'auto' : '50%', paddingLeft: verticalSplit ? 0 : 6}}>
                        <Typography component={'p'} variant={'overline'} style={{marginLeft: 4}}>
                            Data:
                        </Typography>
                        <SchemaDataDebug tabSize={tabSize} fontSize={fontSize} richIde={richIde} vertical={verticalSplit}/>
                    </div>
                </div>
            </div>

            <EditorsNav
                setJsonError={setJsonError}
                changeSplit={changeSplit}
                verticalSplit={verticalSplit}
                activeSchema={activeSchema}
                changeSchema={changeSchema}
                setTabSize={setTabSize}
                tabSize={tabSize}
                setFontSize={setFontSize}
                fontSize={fontSize}
                toggleRichIde={toggleRichIde}
                richIde={richIde}
                schemas={schemas}
            />

            <main className="App-main" style={{height: '100%', overflow: 'auto', maxWidth: 'none', margin: verticalSplit ? '0 auto' : 0, order: verticalSplit ? 3 : 1}}>
                {jsonError ?
                    <Paper style={{margin: 12, padding: 24}}>
                        <Typography component={'h2'} variant={'h5'} color={'error'}>
                            JSON-Error:
                        </Typography>

                        <Typography component={'p'} variant={'subtitle1'} style={{marginTop: 12}}>
                            {jsonError.replace('SyntaxError: JSON.parse: ', '')}
                        </Typography>
                    </Paper> :
                    typeof schema === 'string' ? null : <Paper style={{margin: 12, padding: 24}}>
                        <SchemaRootRenderer/>

                        <InvalidLabel invalid={isInvalid(validity)}/>
                    </Paper>}

                <Paper style={{margin: 12, padding: 24}}>
                    <Nav/>
                </Paper>

                <div style={{height: 24, width: 1, flexShrink: 0}}/>
            </main>
        </div>
    </SchemaEditorProvider>;
};

const InvalidLabel = ({invalid}) => {
    const {palette} = useTheme();

    return <Typography
        component={'p'} variant={'body1'}
        style={{color: invalid ? palette.error.main : palette.success.dark, margin: '24px 0'}}
    >
        {invalid ? ' ❌ failed data validation' : ' ✔ valid data'}
    </Typography>;
}

export default Editor;