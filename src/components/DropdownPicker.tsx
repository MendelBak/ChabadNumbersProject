import { Select } from 'antd'

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
    <Select
      size='large'
      placeholder='Select a value'
      onChange={handleOnChange}
      style={{ width: 400 }}
      options={question.dropdownOptions}
    />
  )
}
