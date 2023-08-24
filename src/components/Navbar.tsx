import { Header } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Navbar () {
  // const items = [
  //   { label: 'Survey', href: 'survey' },
  //   { label: 'About', href: 'about' }
  // ]

  return (
  <Header style={{ display: 'flex', alignItems: 'center' }}>
    <Title level={2}>
      <StyledLink to="/">The Chabad Numbers Project</StyledLink>
    </Title>
  </Header>
  )
}
const StyledLink = styled(Link)`
color: white;
`
