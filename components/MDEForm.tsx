import React from 'react'
import dynamic from 'next/dynamic'
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type PropsType = {
  text: string
  setText: (text: string) => void
}

const MDEForm = ({ text, setText }: PropsType) => {
  return (
    <SimpleMdeReact value={text} onChange={setText} placeholder="Text..." />
  )
}

export default MDEForm
