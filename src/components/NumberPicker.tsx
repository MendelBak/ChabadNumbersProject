import { InputNumber } from 'antd'
import styled from 'styled-components'

export default function NumberPicker({
  question,
  updateResults,
}: {
  question
  updateResults
}) {
  const onChange = (value: number) => {
    updateResults(value)
  }

  return (
    <StyledInputNumber
      size="large"
      min={0}
      max={120}
      placeholder={question.placeholderText}
      onChange={onChange}
      value={question.response}
    />
  )
}

const StyledInputNumber = styled(InputNumber)`
  width: 30%;
  height: 100%;
  font-size: 50px;

  div.ant-input-number-input-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input.ant-input-number-input {
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100px;
  }
`
