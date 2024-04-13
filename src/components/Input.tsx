import React, { useEffect, useRef, useState } from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/20/solid'

interface InputProps {
  prompt: string
  onSubmit: (value: string) => void
}

export default function Input(props: InputProps) {
  const { prompt, onSubmit } = props
  const [input, setInput] = useState('')

  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef.current])

  return (
    <div className="w-full">
      <div className="flex shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            ref={inputRef}
            type="text"
            name="input"
            id="input"
            className="block w-full border-none bg-neutral-200 px-2 py-1.5 placeholder-gray-400 focus:outline-none shadow-sm dark:bg-neutral-600 sm:text-sm"
            placeholder="Input"//{prompt}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit(input)}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 border border-none border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-100 focus:border-sky-500 focus:outline-none focus:ring-sky-500 dark:bg-neutral-300 dark:text-gray-700"
          onClick={() => onSubmit(input)}
        >
          <PaperAirplaneIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
}