import React from 'react'

const Header = (props: { [key: string]: string }) => {
  return (
    <header>
      <h1 className="text-4xl text-gray-800 font-bold py-4">{props.name}</h1>
      {props.additionalText && (
        <p className="text-gray-400 ">{props.additionalText}</p>
      )}
    </header>
  )
}

export default Header
