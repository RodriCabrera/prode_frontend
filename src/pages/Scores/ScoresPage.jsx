import React from 'react'
import ScoresByGroup from './components/ScoresByGroup/ScoresByGroup'
import UserStats from './components/UserStats/UserStats'
import PieChart from './components/PieChart'

export default function ScoresPage() {
  return (
    <>
      <ScoresByGroup />
      {/* <PieChart data={[
        {name: 'resultado', ammount: 10, color: 'green'},
        {name: 'ganador', ammount: 3, color: 'gold'},
        {name: 'no suman', ammount: 12, color: 'tomato'}
      ]} /> */}
    </>
  )
}
