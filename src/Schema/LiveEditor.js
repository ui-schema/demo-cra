import React from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom'
import {Box, Button, Paper, Typography, useTheme} from "@material-ui/core";
import {DragHandle, SpeakerNotes, SpeakerNotesOff, Add, Remove, FormatSize, FormatShapes, Code, SpaceBar, RestorePage, HorizontalSplit, VerticalSplit} from "@material-ui/icons";
import {isInvalid, createMap, createOrderedMap, SchemaEditorProvider, SchemaRootRenderer, useSchemaData} from "@ui-schema/ui-schema";
import {widgets} from "@ui-schema/ds-material";
import Nav from "../component/Nav";
import {RichCodeEditor} from "../component/RichCodeEditor";
import {Markdown} from "../component/Markdown";
import {PageNotFound} from "../component/PageNotFound";

const IconInput = ({
                       verticalSplit, title,
                       onChange, value, min, max = 15,
                       Icon, opacity = 0.4, scale = 0.8,
                   }) => {
    const {palette} = useTheme();
    const [hasFocus, setFocus] = React.useState(false);
    const [hasHover, setHover] = React.useState(false);

    return <div
        style={{margin: verticalSplit ? '0 0 6px 0' : '3px 6px 3px 0', border: '1px solid lightgrey', zIndex: 2, flexShrink: 0, padding: 6, display: 'flex', position: 'relative'}}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
        {hasFocus || hasHover ? <button
            style={{
                position: 'absolute', padding: 0, cursor: 'pointer',
                top: verticalSplit ? 0 : 'calc(-100% - 1px)', right: verticalSplit ? '-100%' : 0, left: verticalSplit ? 'auto' : 0,
                width: '100%', height: '100%', border: 0,
                background: palette.text.primary, color: palette.background.default
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onClick={() => onChange(value + 1)}
            disabled={value >= max}
        >
            <Add fontSize={'small'} style={{transform: 'scale(0.85)'}} fill={palette.background.default}/>
        </button> : null}

        <input type={'number'} className={'no-spin'}
               title={title}
               onFocus={() => setFocus(true)}
               onBlur={() => setFocus(false)}
               style={{
                   position: 'absolute', zIndex: 2, top: 0, right: 0, bottom: 0, left: 0,
                   background: 'transparent', border: 0, boxSizing: 'border-box',
                   textAlign: 'center', fontSize: '0.9rem', fontFamily: 'Consolas, "Lucida Console", Courier, monospace', fontWeight: 'bold',
                   width: '100%', height: '100%', paddingBottom: 10,
               }}
               value={value} onChange={e => e.target.value <= max ? onChange(e.target.value * 1) : undefined} min={min} max={max}/>

        {hasFocus || hasHover ? <button
            style={{
                position: 'absolute', padding: 0, cursor: 'pointer',
                width: '100%', height: '100%', border: 0,
                background: palette.text.primary, color: palette.background.default,
                bottom: verticalSplit ? 0 : 'calc(-100% - 1px)', left: verticalSplit ? '-100%' : 0, right: verticalSplit ? 'auto' : 0,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onClick={() => onChange(value - 1)}
            disabled={value <= min}
        >
            <Remove fontSize={'small'} style={{transform: 'scale(0.85)'}} fill={palette.background.default}/>
        </button> : null}

        <Icon
            style={{visibility: 'hidden', display: 'block'}}
            fontSize={'small'}
        />
        <Icon
            style={{opacity, display: 'block', transform: 'scale(' + scale + ')', position: 'absolute', bottom: -3}}
            fontSize={'small'}
        />
    </div>
};

const unFocus = e => {
    let found = false;
    let parent = e.target;

    do {
        if(parent.nodeName === 'BUTTON') {
            let t = parent;
            setTimeout(() => t ? t.blur() : undefined, 400);
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
                        showInfo, toggleInfoBox, hasInfo,
                        setJsonEditHeight, setRenderChange,
                    }) => {
    const [upDownHandler, setUpDownHandler] = React.useState(false);

    const handleMouseDown = React.useCallback((e) => {
        let clientY = false;
        if(e.touches) {
            if(e.touches[0]) {
                clientY = e.touches[0].clientY;
            }
        } else {
            clientY = e.clientY;
        }

        let nextPos = window.innerHeight - clientY - 40;
        if(clientY !== false && nextPos % 2 === 0) {
            if(nextPos < (window.innerHeight - 40 - 60)) {
                // throttle to every second pixel
                setJsonEditHeight(window.innerHeight - clientY - 40);
            } else {
                setJsonEditHeight(window.innerHeight - 40 - 60);
            }
        }
    }, [setJsonEditHeight]);

    return <div
        style={{
            marginTop: verticalSplit ? 'auto' : 0, marginLeft: verticalSplit ? 12 : 0, display: 'flex', order: 2,
            borderTop: verticalSplit ? 0 : '1px solid lightgrey', position: 'relative',
            flexWrap: verticalSplit ? 'no-wrap' : 'wrap',
        }}
    >
        {verticalSplit ? null : <button
            style={{
                height: '1rem', overflow: 'hidden', border: 0, position: 'absolute', cursor: 'pointer',
                left: '50%', transform: 'translate(-50%, -8px)', display: 'flex', margin: 0, padding: '1px 4px 1px 4px',
            }}
            onMouseDown={(e) => {
                let target = e.target;

                if(!upDownHandler) {
                    setUpDownHandler(true);
                    document.addEventListener('mousemove', handleMouseDown);
                    document.addEventListener('mouseup', function mouseUpHandler(ev) {
                        this.removeEventListener('mouseup', mouseUpHandler, false);
                        document.removeEventListener('mousemove', handleMouseDown);
                        setUpDownHandler(false);
                        target.blur();

                        setRenderChange(p => p + 1);
                    });
                }
            }}
            onTouchStart={(e) => {
                let target = e.target;

                if(!upDownHandler) {
                    setUpDownHandler(true);
                    document.addEventListener('touchmove', handleMouseDown);
                    document.addEventListener('touchend', function mouseUpHandler(ev) {
                        this.removeEventListener('touchend', mouseUpHandler, false);
                        document.removeEventListener('touchmove', handleMouseDown);
                        setUpDownHandler(false);
                        target.blur();

                        setRenderChange(p => p + 1);
                    });
                }
            }}
            onClick={() => undefined}
            title={'Drag to change Height'}
        ><DragHandle style={{pointerEvents: 'none', transform: 'translateY(-3px)'}} fontSize={'small'}/></button>}

        {verticalSplit ? null : <div style={{marginRight: 'auto', display: 'flex'}}>
            <SchemaChanger schemas={schemas} style={{margin: 'auto 4px'}} activeSchema={activeSchema}
                           changeSchema={changeSchema} toggleInfoBox={toggleInfoBox} showInfo={showInfo} hasInfo={hasInfo} setRenderChange={setRenderChange}/>
        </div>}

        <div style={{display: 'flex', flexDirection: verticalSplit ? 'column' : 'row', paddingLeft: 4}}>
            {/*<div style={{display: 'flex', flexDirection: verticalSplit ? 'column-reverse' : 'row', paddingLeft: 4}}>*/}
            <IconInput
                title={'Font Size'} value={fontSize} onChange={setFontSize}
                verticalSplit={verticalSplit} min={6} max={30}
                Icon={FormatSize}
            />
            <IconInput
                title={'Indentation Size'} value={tabSize} onChange={setTabSize}
                verticalSplit={verticalSplit} min={2} max={8}
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
        </div>
    </div>
};

const SchemaJSONEditor = ({schema, setJsonError, setSchema, tabSize, fontSize, richIde, renderChange}) => {
    return <RichCodeEditor
        tabSize={tabSize}
        fontSize={fontSize}
        raw={!richIde}
        renderChange={renderChange}
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

const SchemaDataDebug = ({tabSize, fontSize, richIde, renderChange}) => {
    const {store} = useSchemaData();

    return <RichCodeEditor
        value={JSON.stringify(store.toJS(), null, tabSize)}
        name={'live-editor-debug'}
        tabSize={tabSize}
        fontSize={fontSize}
        renderChange={renderChange}
        raw={!richIde}
        readOnly
    />
};

const SchemaChanger = ({activeSchema, changeSchema, style, schemas, toggleInfoBox, showInfo, hasInfo, setRenderChange}) => {
    const {palette} = useTheme();

    return <Typography component={'label'} variant={'overline'} style={{...style, padding: '5px 0', lineHeight: '2.4', display: 'flex', flexWrap: 'wrap'}}>
        <span className={'hide-sm'} style={{padding: '0 4px', background: palette.text.primary, color: palette.background.default, flexShrink: 0}}>Select Example</span>
        <Typography
            component={'select'} variant={'overline'}
            value={activeSchema} onChange={e => changeSchema(e.target.value * 1)}
            style={{border: '1px solid lightgrey', padding: 3, fontWeight: 'bold', letterSpacing: '0.11em', lineHeight: '1.3'}}
        >
            {schemas.map((schema, i) => (
                <option key={i} value={i}>{schema[0]}</option>
            ))}
        </Typography>

        {hasInfo ? <button
            style={{border: 0, display: 'flex'}}
            onClick={() => {
                toggleInfoBox(p => !p);
                if(setRenderChange) {
                    setRenderChange(p => p + 1);
                }
            }}
        ><span style={{margin: 'auto 0'}}>
            {showInfo ? <SpeakerNotesOff fontSize={'small'}/> : <SpeakerNotes fontSize={'small'}/>}
        </span></button> : null}
    </Typography>
};

const initialLocalBoolean = (key, def) => {
    if(
        typeof window.localStorage.getItem(key) !== 'undefined' &&
        window.localStorage.getItem(key) !== null &&
        !isNaN(window.localStorage.getItem(key) * 1)
    ) {
        return !!(window.localStorage.getItem(key) * 1);
    }

    return def;
};

const toggleLocalBoolean = (setter, key) => {
    setter(p => {
        window.localStorage.setItem(key, p ? '0' : '1');
        return !p;
    })
};

const searchActiveSchema = (schemas, schema) => {
    let found = false;
    for(let id in schemas) {
        if(schemas[id][0].split(' ').join('-') === schema) {
            found = id;
            break;
        }
    }

    return found;
};

const EditorHandler = ({matchedSchema, activeSchema, setActiveSchema, schemas}) => {
    const history = useHistory();

    let initialVertical = initialLocalBoolean('live-editor-vertical', 800 < window.innerWidth);// Vertical by default for desktop
    let initialRichIde = initialLocalBoolean('live-editor-rich-ide', true);
    const [verticalSplit, setVerticalSplit] = React.useState(initialVertical);
    const [richIde, setRichIde] = React.useState(initialRichIde);
    const [jsonError, setJsonError] = React.useState(false);
    const [tabSize, setTabSize] = React.useState(2);
    const [fontSize, setFontSize] = React.useState(13);
    const [showInfo, setInfoBox] = React.useState(false);
    const [jsonEditHeight, setJsonEditHeight] = React.useState(350);
    const [renderChange, setRenderChange] = React.useState(0);// Ace Editor Re-Size Re-Calc
    const infoBox = React.useRef();// to scroll to top of info text when toggling/switching sides

    // default schema state - begin
    const [showValidity, setShowValidity] = React.useState(false);
    const [validity, setValidity] = React.useState(createMap());
    const [schema, setSchema] = React.useState(schemas[activeSchema][1]);
    const [data, setData] = React.useState(schemas[activeSchema][2]);
    // end - default schema state

    const toggleInfoBox = React.useCallback((setter) => {
        setInfoBox(setter);
    }, [setInfoBox]);

    const changeSplit = React.useCallback(() => {
        // toggle verticalSplit and change selected in localStorage
        toggleLocalBoolean(setVerticalSplit, 'live-editor-vertical');
        setRenderChange(p => p + 1);
    }, [setVerticalSplit]);

    const toggleRichIde = React.useCallback(() => {
        // toggle richIde and change selected in localStorage
        toggleLocalBoolean(setRichIde, 'live-editor-rich-ide');
    }, [setRichIde]);

    const changeSchema = React.useCallback(i => {
        setShowValidity(false);
        setActiveSchema(i);
        setSchema(schemas[i][1]);
        setData(schemas[i][2]);
        setRenderChange(p => p + 1);
        history.push('/examples/' + (schemas[i][0].split(' ').join('-')));
        // `setValidity` is not needed, as it cleans itself on dismounts and fills itself again on new mounts
    }, [setActiveSchema, setShowValidity, setSchema, setData, schemas, history]);

    React.useEffect(() => {
        if(infoBox.current) {
            infoBox.current.scrollTo(0, 0)
        }
    }, [activeSchema, infoBox]);

    React.useEffect(() => {
        if(showInfo && infoBox.current) {
            infoBox.current.scrollTo(0, 0)
        }
    }, [showInfo, infoBox]);

    React.useEffect(() => {
        if(typeof matchedSchema !== 'undefined') {
            let foundSchema = matchedSchema ? searchActiveSchema(schemas, matchedSchema) : matchedSchema;
            if(foundSchema !== activeSchema && foundSchema !== false) {
                changeSchema(foundSchema)
            }
        }
    }, [matchedSchema, changeSchema, activeSchema, schemas]);

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
                width: verticalSplit ? '45%' : '100%',
                height: verticalSplit ? 'auto' : (jsonEditHeight + 'px'),
                maxHeight: verticalSplit ? 'none' : '95vh',
                display: 'flex', flexShrink: 0,
                order: verticalSplit ? 1 : 3,
                overflow: 'auto',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: verticalSplit ? 'column' : 'row',
                    minWidth: verticalSplit ? 'auto' : 800,
                    flexGrow: 2,
                }}>
                    {verticalSplit ? <SchemaChanger
                        toggleInfoBox={toggleInfoBox} showInfo={showInfo} hasInfo={!!schemas[activeSchema][3]}
                        schemas={schemas} style={{marginLeft: 4}}
                        setRenderChange={setRenderChange}
                        activeSchema={activeSchema} changeSchema={changeSchema}/> : null}

                    {(verticalSplit || (!verticalSplit && showInfo)) && schemas[activeSchema][3] ?
                        <div style={{
                            height: verticalSplit ? 'auto' : 'auto', display: 'flex', flexDirection: 'column', flexShrink: 0,
                            width: verticalSplit ? 'auto' : schemas[activeSchema][3] ? showInfo ? '33%' : 'auto' : showInfo ? '50%' : 'auto',
                            maxHeight: verticalSplit ? '35%' : 'none', paddingLeft: verticalSplit ? 0 : 6
                        }}>
                            <Typography component={'p'} variant={'overline'} style={{marginLeft: 4, display: 'flex', flexShrink: 0}}>
                                Info:
                                <button
                                    style={{border: 0, margin: 'auto 0 auto 4px', display: 'flex-inline'}}
                                    onClick={() => {
                                        toggleInfoBox(p => !p);
                                        if(setRenderChange) {
                                            setRenderChange(p => p + 1);
                                        }
                                    }}
                                ><span style={{margin: '0'}}>
                                    {showInfo ? <SpeakerNotesOff fontSize={'small'}/> : <SpeakerNotes fontSize={'small'}/>}
                                </span></button>
                            </Typography>

                            {showInfo ? <Box ml={2} mr={verticalSplit ? 0 : 1.5} style={{overflow: 'auto', padding: '0 6px 0 0'}} ref={infoBox}>
                                <div style={{overflow: 'visible', margin: 0,}}>
                                    <Markdown source={schemas[activeSchema][3]}/>
                                </div>
                            </Box> : null}
                        </div> : null}

                    <div style={{
                        height: 'auto', flexGrow: 2, flexShrink: 0, display: 'flex', flexDirection: 'column',
                        width: verticalSplit ? 'auto' : showInfo && schemas[activeSchema][3] ? '33%' : '50%',
                    }}>
                        <Typography component={'p'} variant={'overline'} style={{marginLeft: 4}}>
                            Schema:
                        </Typography>
                        <SchemaJSONEditor
                            schema={schema}
                            setJsonError={setJsonError}
                            setSchema={setSchema}
                            tabSize={tabSize}
                            fontSize={fontSize}
                            richIde={richIde}
                            renderChange={renderChange}
                        />
                    </div>

                    <div style={{
                        height: verticalSplit ? showInfo ? 'auto' : '30%' : 'auto', display: 'flex', flexDirection: 'column', flexShrink: 0,
                        width: verticalSplit ? 'auto' : showInfo && schemas[activeSchema][3] ? '33%' : showInfo ? 'auto' : '50%',
                        paddingLeft: verticalSplit ? 0 : 12, boxSizing: 'border-box',
                    }}>
                        <Typography component={'p'} variant={'overline'} style={{marginLeft: 4, display: 'flex'}}>
                            Data:
                            {showInfo && verticalSplit && !!schemas[activeSchema][3] ? <button
                                style={{border: 0, display: 'flex'}}
                                onClick={() => {
                                    toggleInfoBox(p => !p);
                                    if(setRenderChange) {
                                        setRenderChange(p => p + 1);
                                    }
                                }}
                            ><span style={{margin: 'auto 0'}}>
                                {showInfo ? <SpeakerNotesOff fontSize={'small'}/> : <SpeakerNotes fontSize={'small'}/>}
                            </span></button> : null}
                        </Typography>
                        {showInfo && schemas[activeSchema][3] && verticalSplit ? null :
                            <SchemaDataDebug tabSize={tabSize} fontSize={fontSize} richIde={richIde} renderChange={renderChange}/>}
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
                showInfo={showInfo}
                toggleInfoBox={toggleInfoBox}
                hasInfo={!!schemas[activeSchema][3]}
                jsonEditHeight={jsonEditHeight}
                setJsonEditHeight={setJsonEditHeight}
                setRenderChange={setRenderChange}
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

                        <InvalidLabel invalid={isInvalid(validity)} setShowValidity={setShowValidity} showValidity={showValidity}/>
                    </Paper>}

                <Paper style={{margin: 12, padding: 24}}>
                    <Nav/>
                </Paper>

                <div style={{height: 24, width: 1, flexShrink: 0}}/>
            </main>
        </div>
    </SchemaEditorProvider>;
};

const Editor = ({schemas}) => {
    const match = useRouteMatch();

    // Custom State for Live-Editor
    const [activeSchema, setActiveSchema] = React.useState(() =>
        match.params.schema ?
            searchActiveSchema(schemas, match.params.schema) : 0
    );

    React.useEffect(() => {
        let foundSchema = searchActiveSchema(schemas, match.params.schema);
        if(foundSchema !== activeSchema && foundSchema !== false) {
            setActiveSchema(foundSchema)
        } else if(foundSchema === false && typeof match.params.schema === 'undefined') {
            setActiveSchema(0)
        }
    }, [activeSchema, setActiveSchema, match, schemas]);

    if(activeSchema === false) return <PageNotFound/>;

    return <EditorHandler
        activeSchema={activeSchema}
        setActiveSchema={setActiveSchema}
        matchedSchema={match.params.schema}
        schemas={schemas}
    />
};

const InvalidLabel = ({invalid, setShowValidity, showValidity}) => {
    const {palette} = useTheme();

    return <div>
        <Typography
            component={'p'} variant={'body1'}
            style={{color: invalid ? palette.error.main : palette.success.dark, margin: '24px 0'}}
        >
            {invalid ? ' ❌ failed data validation' : ' ✔ valid data'}
        </Typography>
        <Button
            onClick={() => setShowValidity(p => !p)}
            variant={'contained'}
        >{showValidity ? 'Hide' : 'Show'} Validity</Button>
    </div>;
}

export default Editor;
