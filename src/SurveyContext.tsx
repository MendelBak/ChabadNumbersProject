import { createContext, useContext, useEffect, useReducer } from 'react'
import sourceData from './pages/survey/survey.json'
import { ISurvey } from './pages/survey/ISurvey'
import localforage from 'localforage'

export const SurveyContext = createContext(null)
export const SurveyDispatchContext = createContext(null)

export function useSurvey() {
  return useContext(SurveyContext)
}

export function useSurveyDispatch() {
  return useContext(SurveyDispatchContext)
}

export function SurveyProvider({ children }) {
  const [data, dispatch] = useReducer(surveyReducer, initialSurvey)
  console.log(`SurveyProvider ~ data:`, data)

  useEffect(() => {
    try {
      localforage.setItem('surveyResponse', data)
      console.log('setting item in localforage')
    } catch (error) {
      console.error('error saving user responses to local storage')
    }
  }, [data])

  return (
    <SurveyContext.Provider value={data}>
      <SurveyDispatchContext.Provider value={dispatch}>
        {children}
      </SurveyDispatchContext.Provider>
    </SurveyContext.Provider>
  )
}

function surveyReducer(data, action) {
  switch (action.type) {
    case 'update': {
      return action.response
    }
    default: {
      throw Error('Unknown reducer action: ' + action.type)
    }
  }
}

const initialSurvey: ISurvey = await setInitialSurveyData()

async function setInitialSurveyData() {
  try {
    const response: ISurvey = await localforage.getItem('surveyResponse')
    if (response) {
      return response
    } else {
      return JSON.parse(JSON.stringify(sourceData))
    }
  } catch (error) {
    console.error('Error fetching user response data from local storage')
  }
}
