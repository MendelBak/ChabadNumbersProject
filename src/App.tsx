import './App.css'
import { Layout, theme } from 'antd'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'

function App () {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
      <Layout className="App layout" style={{ background: colorBgContainer, height: '98vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={2}>
          <StyledLink to="/">The Chabad Numbers Project</StyledLink>
          </Title>
      </Header>
      <Content style={{ margin: 1 }}>
          <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>The Chabad Numbers Project - 2023</Footer>
    </Layout>
  )
}
const StyledLink = styled(Link)`
color: white;
`
export default App
