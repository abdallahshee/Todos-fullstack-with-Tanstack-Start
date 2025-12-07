import { logoutUser } from '@/functions/account.functions'
import { useServerFn } from '@tanstack/react-start'
import { Button } from 'primereact/button'
import React from 'react'

const Header = () => {
  const logoutFunc=useServerFn(logoutUser)
  const handleClick=()=>{
    logoutFunc()
  }
  return (
    <div>
      <Button label='logout' size='large' onClick={handleClick}/>
    </div>
  )
}

export default Header