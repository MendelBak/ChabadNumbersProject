import './App.css'
import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { SurveyProvider } from './SurveyContext'

function App() {
  return (
    <SurveyProvider>
      <Layout className="App layout" style={{ height: '98vh' }}>
        <Navbar />
        <Content style={{ margin: 1 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          The Chabad Numbers Project - 2023
        </Footer>
      </Layout>
    </SurveyProvider>
  )
}

export default App
