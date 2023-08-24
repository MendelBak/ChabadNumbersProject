import surveyData from './survey/survey.json'
import { useEffect, useState } from 'react'
import BooleanPicker from '../components/BooleanPicker'
import { ISurvey } from './survey/ISurvey'
import { useNavigate } from 'react-router-dom'
import NumberPicker from '../components/NumberPicker'
import DropdownPicker from '../components/DropdownPicker'
import { Button, Layout, Steps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import styled from 'styled-components'
import MultiNumberPicker from '../components/MultiNumberPicker'

export default function Survey () {
  const navigate = useNavigate()
  const [surveyResponseObj, setSurveyResponseObj] = useState<ISurvey>(surveyData)

  const surveyKeys = Object.keys(surveyResponseObj)
  // The survey contains sections such as age, education, etc. Each section can contain multiple questions
  const [sectionIterator, setSectionIterator] = useState(0)
  // This tracks the current section in the survey
  const [currentSection, setCurrentSection] = useState<ISurvey[keyof ISurvey]>(surveyResponseObj[surveyKeys[sectionIterator]])
  // This tracks the current question Iterator in the current section
  const [currentQuestionIterator, setCurrentQuestionIterator] = useState(0)
  const currentQuestion = currentSection[currentQuestionIterator]

  // Updates the current section when the sectionIterator changes.
  useEffect(() => {
    setCurrentSection(surveyResponseObj[surveyKeys[sectionIterator]])
  }, [sectionIterator])

  // Checks to see if the requiredParentConditions are met and if not to continue to the next question.
  useEffect(() => {
    if (!requiredParentConditionMet()) nextQuestion()
    // if (!requiredParentConditionMet()) setCurrentQuestionIterator(currentVal => currentVal + 1)
  }, [currentQuestionIterator])

  function returnCurrentQuestion () {
    return returnQuestionComponent(currentQuestion)
  }

  function returnQuestionComponent (question) {
    switch (question.type) {
      case 'boolean':
        return <BooleanPicker key={question} question={question} updateResults={updateResults} />
      case 'number':
        return <NumberPicker key={question} question={question} updateResults={updateResults} />
      case 'dropdown':
        return <DropdownPicker question={question} updateResults={updateResults} />
      case 'multiNumber':
        return <MultiNumberPicker key={question} />
      default:
        console.error('question type not found')
        return null
    }
  }

  function updateResults (userResponse) {
    setSurveyResponseObj(prevState => ({
      ...prevState,
      [surveyResponseObj[surveyKeys[sectionIterator]][currentQuestionIterator].response]: userResponse
    }))

    console.log(userResponse, surveyResponseObj[surveyKeys[sectionIterator]])
  }

  function lastQuestion (): void {
    if (sectionIterator === 0) {
      // If reached the start of the survey, don't return the back button
      return null
    } else if (currentQuestionIterator > 0) {
      // If not at the beginning of a section. go to the previous question in the section
      setCurrentQuestionIterator(currentVal => currentVal - 1)
    } else if (currentQuestionIterator === 0) {
      // If at the begnning of a section, go back to the first question in the previous section.
      // Ideally, should just go back one question, but this is much easier. lol
      setSectionIterator(currentVal => currentVal - 1)
      setCurrentQuestionIterator(0)
    }
  }

  function nextQuestion (): void {
    if (sectionIterator === surveyKeys.length - 1) {
      // If reached the end of the survey, go to the results page.
      navigate('/results')
    } else if (currentSection.length > currentQuestionIterator + 1) {
      // If not at the end of a section, go to the next question in the section
      setCurrentQuestionIterator(currentVal => currentVal + 1)
    } else if (currentSection.length === currentQuestionIterator + 1) {
      // If at the end of a section. go to the next section and the first question in the new section
      setCurrentQuestionIterator(0)
      setSectionIterator(currentVal => currentVal + 1)
    }
  }

  function displayBackButton () {
    if (currentQuestionIterator > 0 || sectionIterator > 0) {
      return (
        <Button type="primary" size="large" style={{ marginRight: '15%' }} onClick={() => lastQuestion()} >Back</Button>
      )
    }
  }

  function requiredParentConditionMet (): boolean {
    const question = currentSection[currentQuestionIterator]
    if ('mustBeTrue' in question) {
      const mustBeTrueKey = question.mustBeTrue
      const mustBeTrueQuestion = currentSection.find(
        (question) => question.key === mustBeTrueKey
      )
      if (mustBeTrueQuestion && mustBeTrueQuestion.response === true) {
        // The mustBeTrue condition is met, so you can proceed with this question
        return true
      } else {
        // The mustBeTrue condition is not met, so you should skip this question
        return false
      }
    } else {
      // There is no mustBeTrue condition for this question, so you can proceed with it
      return true
    }
  }

  return (
    <Layout style={{ height: '100%' }}>
    <StyledContent>
      <div>
      <StyledSteps current={sectionIterator} items={surveyKeys.map(key => { return { title: key } })}
  />
      <Title level={1}>{currentSection[currentQuestionIterator]?.header}</Title>
      <Title level={4}>{currentSection[currentQuestionIterator]?.subHeader}</Title>
      </div>
      <div>{returnCurrentQuestion()}</div>
      <QuestionComponent>
        {displayBackButton()}
        <Button type="primary" size="large" onClick={() => nextQuestion()} >{sectionIterator === surveyKeys.length - 1 ? 'Submit' : 'Next'}</Button>
      </QuestionComponent>

    </StyledContent>
  </Layout>
  )
}
const StyledSteps = styled(Steps)`
  padding: 1% 1%
`

const QuestionComponent = styled.div`
  margin-bottom:5%;
`

const StyledContent = styled(Content)`
height: 60vh;
justify-content: space-between;
text-align: center;
display: flex;
flex-direction: column
  `
