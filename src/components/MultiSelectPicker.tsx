import { Select } from 'antd'
import styled from 'styled-components'

export default function MultiSelectPicker({
  question,
  updateResults,
}: {
  question
  updateResults
}) {
  console.log('MultiSelectPicker ~ question:', question)
  const handleChange = (value: string[]) => {
    updateResults(value)
  }

  let incomingValues = []
  incomingValues = question?.response?.map((response) => {
    return { label: response, value: response }
  })
  return (
    <StyledSelect
      size="large"
      mode="multiple"
      allowClear
      style={{ width: '30%' }}
      placeholder="Please select"
      onChange={handleChange}
      options={question.dropdownOptions}
      value={incomingValues}
    />
  )
}

const StyledSelect = styled(Select)`
  span.ant-select-selection-placeholder {
    color: black;
  }
`
