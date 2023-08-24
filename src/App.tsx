import './App.css'
import { Layout, theme } from 'antd'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App () {
  return (
      <Layout className="App layout" style={{ height: '98vh' }}>
        <Navbar />
      <Content style={{ margin: 1 }}>
          <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>The Chabad Numbers Project - 2023</Footer>
    </Layout>
  )
}

export default App
