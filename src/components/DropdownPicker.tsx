import { Select } from 'antd'
import styled from 'styled-components'

interface IDropdownPickerProps {
  question
  updateResults
}

export default function DropdownPicker (props: IDropdownPickerProps) {
  const { question, updateResults } = props

  function handleOnChange (newValue) {
    updateResults(newValue)
  }

  return (
    <StyledSelect
      size='large'
      placeholder='Select a value'
      onChange={handleOnChange}
      style={{ width: 400 }}
      options={question.dropdownOptions}
    />
  )
}

const StyledSelect = styled(Select)`
  span.ant-select-selection-placeholder {
    color: black;
  }
`
