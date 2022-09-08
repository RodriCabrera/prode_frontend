import React, { useState, useEffect, useCallback } from 'react'
import NavLayer from './NavLayer'

const defaultFinalCheck = (data) => {
  if (data?.home) return data;
  return false
}

const defaultParseName = (data) => {
  if (data.name) return data.name;
  if (data.home && data.away) return `${data.home.name} vs ${data.away.name}`
  else return data.id 
}

export default function Navigator({ children, data, isFinalCheck=defaultFinalCheck, parseName=defaultParseName }) {
  const [filteredData, setFilteredData] = useState([...data])
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState([{data: [...data], name: '...'}])

  const setFilter = useCallback(data => {
    setIsLoading(true)
    setFilteredData((current) => {
      const filtered = current.find(c => c.id === data.id)
      if (isFinalCheck(filtered)) return [filtered]
      const res = Object.entries(filtered).find(([key, value]) => typeof(value) === 'object')[1]
      if (isFinalCheck(res)) {
        return isFinalCheck(res)
      } else {
        setHistory((prevHistory) => [...prevHistory, {data: res, name: parseName(data)}])
        return res
      }
    })
    setIsLoading(false)
  }, [])

  const handleGoBack = (index) => {
    if (index >= history.length+1) return
    setHistory((prevVal) => [...prevVal.slice(0, index+1)])
    if (index === 0) return setFilteredData([...data])
    setFilteredData(history[index].data)
  }

  useEffect(() => {
    setFilteredData([...data])
  }, [data])

  return (
    <>
        {history.map((historyElement, index) => <button key={index} onClick={() => handleGoBack(index)}>{parseName(historyElement)}</button>)}
        {!isLoading && filteredData.map((item) => <NavLayer data={item} key={item.id} filterFunc={setFilter} parseName={parseName} /> )}
        { children }
    </>
  )
}
