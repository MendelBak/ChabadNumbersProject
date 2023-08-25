import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Survey from './pages/Survey'
import Landing from './pages/Landing'
import Results from './pages/Results'
import { ConfigProvider } from 'antd'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .ant-typography a {
    color: white;
    text-decoration: none;
  }
`

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: 'survey',
        element: <Survey />
      },
      {
        path: 'results',
        element: <Results />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f6ffed'
      },
      components: {
        Button: {
          borderRadiusLG: 12
        },
        InputNumber: {
          borderRadiusLG: 12
        },
        Input: {
          borderRadiusLG: 12
        },
        Select: {
          borderRadiusLG: 12
        }
      }
    }}
  >
    <GlobalStyle />
    <RouterProvider router={router} />
  </ConfigProvider>
  </React.StrictMode>
)
