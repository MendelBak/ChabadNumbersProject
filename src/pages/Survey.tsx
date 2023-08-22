import surveyData from './survey/survey.json'
import { useEffect, useState } from 'react'
import BooleanPicker from '../components/BooleanPicker'
import { ISurvey } from './survey/ISurvey'
import { useNavigate } from 'react-router-dom'
import NumberPicker from '../components/NumberPicker'
import DropdownPicker from '../components/DropdownPicker'
import { Button, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import styled from 'styled-components'
import MultiNumberPicker from '../components/MultiNumberPicker'

export default function Survey () {
  const navigate = useNavigate()

  const surveyKeys = Object.keys(surveyData)
  // The survey contains sections such as age, education, etc. Each section can contain multiple questions
  const [sectionIterator, setSectionIterator] = useState(0)
  // This tracks the current section in the survey
  const [surveySection, setSurveySection] = useState<ISurvey[keyof ISurvey]>(surveyData[surveyKeys[sectionIterator]])
  // This tracks the current question in the current section
  const [currentQuestionIterator, setCurrentQuestionIterator] = useState(0)

  // Updates the current section when the sectionIterator changes.
  useEffect(() => {
    setSurveySection(surveyData[surveyKeys[sectionIterator]])
  }, [sectionIterator])

  function returnCurrentQuestion () {
    return returnQuestionComponent(surveySection[currentQuestionIterator])
  }

  function returnQuestionComponent (question) {
    switch (question.type) {
      case 'boolean':
        return <BooleanPicker key={question} />
      case 'number':
        return <NumberPicker key={question} placeholderText={question.placeholderText} />
      case 'dropdown':
        return <DropdownPicker dropdownOptions={question?.dropdownOptions }/>
      case 'multiNumber':
        return <MultiNumberPicker key={question} />
      default:
        console.error('question type not found')
        return null
    }
  }

  function lastQuestion (): void {
    if (sectionIterator === 0) {
      // If reached the start of the survey, don't return the back button
      return null
    } else if (currentQuestionIterator > 0) {
      // If not at the beginning of a section. go to the previous question in the section
      setCurrentQuestionIterator(currentQuestionIterator - 1)
    } else if (currentQuestionIterator === 0) {
      // If at the begnning of a section, go back to the first question in the previous section
      setSectionIterator(sectionIterator - 1)
      setCurrentQuestionIterator(0)
    }
  }

  function nextQuestion (): void {
    if (sectionIterator === surveyKeys.length - 1) {
      // If reached the end of the survey, go to the results page.
      navigate('/results')
    } else if (surveySection.length > currentQuestionIterator + 1) {
      // If not at the end of a section, go to the next question in the section
      setCurrentQuestionIterator(currentQuestionIterator + 1)
    } else if (surveySection.length === currentQuestionIterator + 1) {
      // If at the end of a section. go to the next section and the first question in the new section
      setSectionIterator(sectionIterator + 1)
      setCurrentQuestionIterator(0)
    }
  }

  function displayBackButton () {
    if (currentQuestionIterator > 0 || sectionIterator > 0) {
      return (
        <Button type="primary" style={{ marginRight: '15%' }} onClick={() => lastQuestion()} >Back</Button>
      )
    }
  }

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Layout style={{ height: '100%' }}>
    <StyledContent>
      <div>
      <Title style={{ color: 'GrayText' }} level={1}>Section - {capitalizeFirstLetter(surveyKeys[sectionIterator])}</Title>
      <Title level={1}>{surveySection[currentQuestionIterator]?.header}</Title>
      <Title level={4}>{surveySection[currentQuestionIterator]?.subHeader}</Title>
      </div>
      <div>{returnCurrentQuestion()}</div>
      <QuestionComponent>
        {displayBackButton()}
        <Button type="primary" onClick={() => nextQuestion()} >{sectionIterator === surveyKeys.length - 1 ? 'Submit' : 'Next'}</Button>
      </QuestionComponent>

    </StyledContent>
  </Layout>
  )
}

const QuestionComponent = styled.div`
  /* max-height: 6%; */
  /* margin-top:auto; */
  margin-bottom:5%;
`

const StyledContent = styled(Content)`
height: 60vh;
/* background-color: orange; */
/* margin-top: 1%; */
/* align-content: center; */
justify-content: space-between;
text-align: center;
display: flex;
flex-direction: column
  `
