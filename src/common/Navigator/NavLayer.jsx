import React from 'react'

export default function NavLayer({ data, filterFunc, parseName }) {
    const handleClick = () => {
        return filterFunc(data)
    }
  return (
    <div onClick={handleClick}>
        {parseName(data)}
    </div>
  )
}
