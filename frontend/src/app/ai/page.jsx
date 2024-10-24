import React from 'react'
import { callAIPrompt } from '@/utils/functions'

const AiPlayGround = async() => {
  const data = await callAIPrompt();
  console.log(data)

  return (
    <div>AiPlayGround</div>
  )
}

export default AiPlayGround