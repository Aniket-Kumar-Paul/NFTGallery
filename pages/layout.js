import React from 'react'

// INTERNAL IMPORTS
import { Button, Card, Logo } from '../Components'

const layout = () => {
  return (
    <div className='home'>
      <Logo />
      <p>BUTTON</p>
      <Button />
      <p>CARD</p>
      <Card />
    </div>
  )
}

export default layout