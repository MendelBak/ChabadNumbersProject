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

type selectedIconChoice = true | false | undefined

export default function BooleanPicker ({ question, updateResults }: {question, updateResults}) {
  const [selectedIcon, setSelectedIcon] = useState<selectedIconChoice>(question.response || undefined)

  function handleClick (value) {
    setSelectedIcon(value)
    updateResults(value)
  }

  return (
    <>
      <FiThumbsUp style={selectedIcon === true ? selectedIconStyle : defaultIconStyle } onClick={() => handleClick(true)}/>
      <FiThumbsDown style={selectedIcon === false ? selectedIconStyle : defaultIconStyle} onClick={() => handleClick(false)} />
    </>
  )
}
