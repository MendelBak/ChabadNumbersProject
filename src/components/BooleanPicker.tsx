import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { CSSProperties, useState } from 'react'

const defaultIconStyle: CSSProperties = {
  width: '100px',
  height: '100px'
}

const selectedIconStyle: CSSProperties = {
  fill: '#742c74',
  width: '100px',
  height: '100px',
  cursor: 'pointer'
}

type selectedIconChoice = 'up' | 'down' | 'none'

export default function BooleanPicker () {
  const [selectedIcon, setSelectedIcon] = useState<selectedIconChoice>('none')

  function handleClick (iconName) {
    setSelectedIcon(iconName)
  }

  return (
    <><FiThumbsUp style={selectedIcon === 'up' ? selectedIconStyle : defaultIconStyle } onClick={() => handleClick('up')}/><FiThumbsDown style={selectedIcon === 'down' ? selectedIconStyle : defaultIconStyle} onClick={() => handleClick('down')} /></>
  )
}
