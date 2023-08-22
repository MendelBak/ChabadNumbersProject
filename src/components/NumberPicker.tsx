import { InputNumber } from 'antd'
import styled from 'styled-components'

export default function NumberPicker ({ placeholderText }: { placeholderText: string }) {
  console.log('NumberPicker ~ placeholderText:', placeholderText)
  const onChange = (value: number) => {
    console.log('changed', value)
  }

  return (
    <StyledInputNumber size="large" min={0} max={120} placeholder={placeholderText} onChange={onChange} />
  )
}

const StyledInputNumber = styled(InputNumber)`
  width: 30%;
  height: 100%;
  font-weight: bolder;
  font-size: 50px;

  div.ant-input-number-input-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input.ant-input-number-input{
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100px;
  }

`
