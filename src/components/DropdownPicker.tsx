import { Select } from 'antd'
import { useState } from 'react'
import { IDropdownOptions } from '../pages/survey/ISurvey'

interface IDropdownPickerProps {
  dropdownOptions: [IDropdownOptions];
}

export default function DropdownPicker (props: IDropdownPickerProps) {
  const { dropdownOptions } = props

  const [value, setValue] = useState<any>()
  return (
    <Select
      size='large'
      placeholder='Select a value'
      onChange={setValue}
      style={{ width: 400 }}
      options={dropdownOptions}
      value={value}
    />
  )
}
