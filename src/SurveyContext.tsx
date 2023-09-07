import { createContext, useContext, useReducer } from 'react'
import * as test from './pages/survey/survey.json'
import { ISurvey } from './pages/survey/ISurvey'

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
      return data
    }
    default: {
      throw Error('Unknown reducer action: ' + action.type)
    }
  }
}

const initialSurvey: ISurvey = JSON.parse(JSON.stringify(test))
