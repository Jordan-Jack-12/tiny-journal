import React from 'react'

type MoodCardType = {
    date: string,
    data: string,
}

const MoodCard = ({data, date} : MoodCardType) => {
  return (
    <div>
        <p>Date : {date}</p>
        <h2>Mood : {data}</h2>
    </div>
  )
}

export default MoodCard