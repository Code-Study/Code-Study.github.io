import React, {useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import {useColorMode} from '@docusaurus/theme-common';
import {usePython} from "react-py";

import PythonIcon from '../../static/img/python-icon.svg'
import { Tab } from '@headlessui/react'
import { ArrowPathIcon, PlayIcon, StopIcon, CogIcon } from '@heroicons/react/24/solid'

import Input from './Input'
import Controls from './Controls'
import Loader from './Loader'
import clsx from 'clsx'

import './CodeEditor.css'

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false,
  showGutter: false
};

function setCommandEnabled(editor, name, enabled) {
    let command = editor.commands.byName[name]
    if (!command.bindKeyOriginal)
        command.bindKeyOriginal = command.bindKey
    command.bindKey = enabled ? command.bindKeyOriginal : null;
    editor.commands.addCommand(command);
}

const editorOnLoad = editor => {
    editor.renderer.setScrollMargin(10, 10, 0, 0);
    editor.renderer.setPadding(16);
    editor.moveCursorTo(0, 0);

    setCommandEnabled(editor, "indent", false);
    setCommandEnabled(editor, "outdent", false);

    editor.commands.on("afterExec", eventData => {
        if (eventData.command.name !== "disable-indent") {
            setCommandEnabled(editor, "indent", true);
            setCommandEnabled(editor, "outdent", true);
        }
    });

    editor.on("click", (e) => {
        setCommandEnabled(editor, "indent", true);
        setCommandEnabled(editor, "outdent", true);
    })

    editor.on("blur", (e) => {
        setCommandEnabled(editor, "indent", false);
        setCommandEnabled(editor, "outdent", false);
    })

    editor.commands.addCommand({
        name: 'disable-indent',
        bindKey: {win: "esc", mac: "esc"},
        exec: (editor) => {
            setCommandEnabled(editor, "indent", false);
            setCommandEnabled(editor, "outdent", false);
        }
    })
};

export default function CodeEditor(props) {
    const [main, setMain] = useState(props.codes);
    const [compareCode, setCompareCode] = useState('');
    const [envCode, setEnvCode] = useState('');
    const [headerCode, setHeaderCode] = useState('');
    const [footerCode, setFooterCode] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false); 

    useEffect(() => {
      setShowOutput(false);
      setMain(props.codes);
    }, [props.codes]);
  
    useEffect(() => {
      const fetchCodes = async () => {
        try {
          const compareCode = await fetch('/codes/python-compare').then(response => response.text());
          const envCode = await fetch('/codes/python-env').then(response => response.text());
          const headerCode = await fetch('/codes/python-header').then(response => response.text());
          const footerCode = await fetch('/codes/python-footer').then(response => response.text());

          if (compareCode.startsWith('<!DOCTYPE html>') || envCode.startsWith('<!DOCTYPE html>')) {
            throw new Error('Invalid file content: Received HTML instead of Python code');
          }
  
          setCompareCode(compareCode);
          setEnvCode(envCode);
          setHeaderCode(headerCode);
          setFooterCode(footerCode);
          setIsDataLoaded(true); // 데이터 로드 완료 설정
        } catch (error) {
          console.error('Error fetching Python codes:', error);
        }
      };
      fetchCodes();
    }, []);  

    const [selectedTab, setSelectedTab] = useState(0);
    
    const handleTabChange = (index) => {
      setSelectedTab(index);
    };

    const [showOutput, setShowOutput] = useState(false)

    const {colorMode} = useColorMode();

    const {
        runPython,
        stdout,
        stderr,
        isLoading,
        isRunning,
        interruptExecution,
        isAwaitingInput,
        sendInput,
        prompt
    } = usePython();

    function run() {
      const pythonCode = `
${headerCode}
${props.compare}
${main[selectedTab]}
func = getattr(Solution(), func_name)
                
if isinstance(datas[0], tuple):
    func(*datas[0])
else:
    func(datas[0])
`
        runPython(pythonCode)
        setShowOutput(true)
    }

    function stop() {
        interruptExecution()
        setShowOutput(false)
    }

    function compare() {
        const pythonCode = `
${headerCode}
import sys
import types

virtual_files = {
  ${main.filter(code => code != 'undefined').map((code, i) => `"${props.names[i]}": '''${headerCode}\n${code}'''`).join(",\n")}
}
${envCode}
${main.filter((code, i) => (code != 'undefined') || (i != selectedTab)).map((code, i) => `from ${props.names[i]} import Solution as Solution_${props.names[i]}\nsolutions.append(Solution_${props.names[i]}())`).join("\n\n")}
${compareCode}
${props.compare}
${footerCode}
`
        runPython(pythonCode)
        setShowOutput(true)
    }

    const updateArrayItem = (index: number, newValue: string) => {
      const newArray = [...main];
      newArray[index] = newValue;
      setMain(newArray);
    };

    interface CodeItem {
      name: string;
      code: string;
      setter: (index: number, newValue: string) => void;
    }
    
    const tabs: CodeItem[] = [];
    
    if (main.length > 0) {
      main.forEach((code: string, index: number) => {
        const newItem = {
          name: props.names[index],
          code: code,
          setter: updateArrayItem
        };
      
        tabs.push(newItem);
      });
    }

    return  (
        <div className="relative mt-10 mb-10 flex flex-col">
          <Controls
            items={[
              {
                label: 'Run',
                icon: PlayIcon,
                onClick: run,
                disabled: isLoading || isRunning,
                hidden: isRunning
              },
              { label: 'Stop', icon: StopIcon, onClick: stop, hidden: !isRunning },
              {
                label: 'Compare',
                icon: CogIcon,
                onClick: compare,
                disabled: isRunning || !isDataLoaded
              }
            ]}
            isAwaitingInput={isAwaitingInput}
          />
          {isLoading && <Loader />}
          <BrowserOnly fallback={<div>Loading...</div>}>
                {() => {
                  const AceEditor = require('react-ace').default
                  require('ace-builds/src-noconflict/mode-python')
                  require('ace-builds/src-noconflict/theme-textmate')
                  require('ace-builds/src-noconflict/theme-idle_fingers')
                  require('ace-builds/src-noconflict/ext-language_tools')
                  return (
                  <div className="flex flex-col">
                    <Tab.Group>
                    <Tab.List className="flex h-[4.25rem] space-x-2 rounded-t bg-neutral-700 p-3">
                        {tabs.map(({ name }, index) => (
                        <Tab
                            key={name}
                            className={({ selected }) =>
                            clsx(
                                'flex cursor-pointer items-center rounded border-none px-4 py-1 text-sm font-medium ring-1 ring-inset ring-neutral-900',
                                selected
                                ? 'bg-white text-neutral-700'
                                : 'bg-neutral-500 text-gray-50 hover:bg-white hover:text-neutral-700'
                            )
                            }
                            onClick={() => handleTabChange(index)}
                        >
                            <PythonIcon className="mr-1 -mb-1 h-4 w-4" />
                            {name}
                        </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        {tabs.map(({ code, setter }, index) => (
                        <Tab.Panel key={index}>
                            <div className="flex-1">
                            <AceEditor
                                value={code}
                                mode="python"
                                name="CodeBlock"
                                fontSize="0.9rem"
                                className="min-h-[4rem] overflow-clip rounded shadow-md"
                                theme={
                                colorMode === 'dark' ? 'idle_fingers' : 'textmate'
                                }
                                onChange={(newValue) => setter(index, newValue)}
                                width="100%"
                                maxLines={Infinity}
                                onLoad={editorOnLoad}
                                editorProps={{ $blockScrolling: true }}
                                setOptions={editorOptions}
                            />
                            </div>
                        </Tab.Panel>
                        ))}
                    </Tab.Panels>
                    </Tab.Group>
                </div>
                )
              }}
            </BrowserOnly>
            {isAwaitingInput && <Input prompt={prompt} onSubmit={sendInput} />}
            {showOutput && (
                <pre className="mt-4 py-6 text-left">
                    <code>{stdout}</code>
                    <code className="text-red-500">{stderr}</code>
                </pre>
            )}
        </div>
    )
} 