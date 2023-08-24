import surveyData from './survey/survey.json'
import { useEffect, useState } from 'react'
import BooleanPicker from '../components/BooleanPicker'
import { IAge, IBackground, IChildren, IEducation, IIncome, IShlichus, ISurvey } from './survey/ISurvey'
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

  // Get the survey sections and initialize the section and question iterators
  const surveySections = Object.keys(surveyData)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)

  // Get the current section and question
  const currentSection: IBackground[] | IAge[] | IShlichus[] | IIncome[] | IEducation[] | IChildren[] = surveyData[surveySections[sectionIndex]]
  const currentQuestion = currentSection[questionIndex]

  // Check if the current question fulfills the mustBeTrue condition
  let mustBeTrueFulfilled = true
  if ('mustBeTrue' in currentQuestion) {
    const mustBeTrueKey = currentQuestion.mustBeTrue
    const mustBeTrueQuestion = currentSection.find(
      (question) => question.key === mustBeTrueKey
    )
    mustBeTrueFulfilled = !!mustBeTrueQuestion && !!mustBeTrueQuestion.response
  }
  // Move to the next legal question
  function handleNext () {
    let newSectionIndex = sectionIndex
    let newQuestionIndex = questionIndex

    while (true) {
      if (newQuestionIndex < currentSection.length - 1) {
        // Move to the next question in the current section
        newQuestionIndex++
      } else if (newSectionIndex < surveySections.length - 1) {
        // Move to the first question in the next section
        newSectionIndex++
        newQuestionIndex = 0
      } else {
        // We've reached the end of the survey
        navigate('/results')
      }

      const newSection = surveyData[surveySections[newSectionIndex]]
      const newQuestion = newSection[newQuestionIndex]
      let newMustBeTrueFulfilled = true
      if (newQuestion.mustBeTrue) {
        const newMustBeTrueKey = newQuestion.mustBeTrue
        const newMustBeTrueQuestion = newSection.find(
          (question) => question.key === newMustBeTrueKey
        )
        newMustBeTrueFulfilled =
          newMustBeTrueQuestion && newMustBeTrueQuestion.response
      }

      if (newMustBeTrueFulfilled) {
        // We've found a legal question, so we can stop here
        break
      }
    }

    setSectionIndex(newSectionIndex)
    setQuestionIndex(newQuestionIndex)
  }

  // Move to the previous legal question
  function handleBack () {
    let newSectionIndex = sectionIndex
    let newQuestionIndex = questionIndex

    while (true) {
      if (newQuestionIndex > 0) {
        // Move to the previous question in the current section
        newQuestionIndex--
      } else if (newSectionIndex > 0) {
        // Move to the last question in the previous section
        newSectionIndex--
        newQuestionIndex =
          surveyData[surveySections[newSectionIndex]].length - 1
      } else {
        // We've reached the beginning of the survey
        break
      }

      const newSection = surveyData[surveySections[newSectionIndex]]
      const newQuestion = newSection[newQuestionIndex]
      let newMustBeTrueFulfilled = true
      if (newQuestion.mustBeTrue) {
        const newMustBeTrueKey = newQuestion.mustBeTrue
        const newMustBeTrueQuestion = newSection.find(
          (question) => question.key === newMustBeTrueKey
        )
        newMustBeTrueFulfilled =
          newMustBeTrueQuestion && newMustBeTrueQuestion.response
      }

      if (newMustBeTrueFulfilled) {
        // We've found a legal question, so we can stop here
        break
      }
    }

    setSectionIndex(newSectionIndex)
    setQuestionIndex(newQuestionIndex)
  }

  // Handle changes to section and question indices
  useEffect(() => {
    if (!mustBeTrueFulfilled) {
      handleNext()
    }
  }, [sectionIndex, questionIndex])

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
    setSurveyResponseObj((prevState) => {
      const newSection = [...prevState[surveySections[sectionIndex]]]
      newSection[questionIndex] = {
        ...newSection[questionIndex],
        response: userResponse
      }

      return {
        ...prevState,
        [surveySections[sectionIndex]]: newSection
      }
    })
  }

  function displayBackButton () {
    if (questionIndex > 0 || sectionIndex > 0) {
      return (
        <Button type="primary" size="large" style={{ marginRight: '15%' }} onClick={() => handleBack()} >Back</Button>
      )
    }
  }

  return (
    <Layout style={{ height: '100%' }}>
    <StyledContent>
      <StyledSteps current={sectionIndex} items={surveySections.map(key => { return { title: key } })}
  />
      {mustBeTrueFulfilled && (
      <>
        <div>
        <Title level={1}>{currentSection[questionIndex]?.header}</Title>
        <Title level={4}>{currentSection[questionIndex]?.subHeader}</Title>
        </div>
        <div>{returnQuestionComponent(currentQuestion)}</div>
      </>
      )}
      <QuestionComponent>
        {displayBackButton()}
        <Button type="primary" size="large" onClick={() => handleNext()} >{sectionIndex === surveySections.length - 1 ? 'Submit' : 'Next'}</Button>
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
