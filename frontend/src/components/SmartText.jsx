"use client"
import React, { useState } from 'react'

const SmartText = ({text}) => {
  const [showMore, setshowMore] = useState(false)
  return (
    <div className='max-w-48'>
      <p className='text-sm'>
        {showMore ? text : `${text.substring(0,100)} ${text.length > 100 ? '...' : ''}`}
        {text.length > 100 && (
          <button className='text-blue-500' onClick={() => setshowMore(!showMore)}>
            {showMore ? 'show less' : 'show more'}
          </button>
        )}
      </p>
    </div>
  )
}

export default SmartText