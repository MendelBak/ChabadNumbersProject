/* eslint-disable no-prototype-builtins */
import { Row, Col, Slider, InputNumber } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { useSurvey } from '../SurveyContext'

export default function MultiNumberPicker({
  question,
  updateResults,
}: {
  question
  updateResults
}) {
  const [inputValue, setInputValue] = useState(1)
  const surveyResponseObj = useSurvey()

  const test = Object.values(surveyResponseObj).includes(question?.mustBeTrue)
  console.log(
    `surveyResponseObj:`,
    surveyResponseObj,
    question,
    test,
    question?.mustBeTrue
  )

  const onChange = (newValue: number) => {
    setInputValue(newValue)
  }

  // Some questions have parent questions that must be true. This will return that one, if it matches.
  // function findParentQuestion(jsonObj, mustBeTrueValue) {
  //   for (const key in jsonObj) {
  //     if (jsonObj.hasOwnProperty(key)) {
  //       const arr = jsonObj[key]
  //       for (let i = 0; i < arr.length; i++) {
  //         if (arr[i].hasOwnProperty('key') && arr[i].key === mustBeTrueValue) {
  //           return arr[i]
  //         }
  //       }
  //     }
  //   }
  //   return null
  // }

  // const parentQuestion = findParentQuestion(surveyResponseObj, question?.mustBeTrue)
  // console.log(parentQuestion)

  return (
    <StyledRow>
      <Col span={5}>
        <StyledSlider
          min={1}
          max={120}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <StyledInputNumber
          min={1}
          max={120}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </StyledRow>
  )
}

const StyledRow = styled(Row)`
  justify-content: center;
`

const StyledSlider = styled(Slider)`
  div.ant-slider-rail,
  div.ant-slider-track {
    height: 200%;
    margin-top: 5%;
  }
  div.ant-slider-handle {
    margin-top: 5%;
    :after,
    :before {
      width: 200%;
      height: 200%;
      margin-top: 50%;
    }
    :hover,
    :active {
      margin-top: 6%;
    }
  }
`

const StyledInputNumber = styled(InputNumber)`
  width: 50%;
  font-size: 50px;
  border-radius: 15%;

  input.ant-input-number-input {
    text-align: center;
  }
`
