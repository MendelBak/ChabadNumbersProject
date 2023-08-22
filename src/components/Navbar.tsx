import { Avatar, Box, Button, Header, Heading, Nav } from 'grommet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
`

export default function Navbar () {
  const gravatarSrc =
  '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

  const items = [
    { label: 'Survey', href: 'survey' },
    { label: 'About', href: 'about' }
  ]

  return (
    <Header background="brand" pad="small" >
    <Box direction="row" align="center" gap="small">
      <Avatar src={gravatarSrc} />
    </Box>

    <Heading margin="none" responsive><NavLink to={'/'}>The Chabad Numbers Project</NavLink></Heading>

    <Nav direction="row">
      {items.map((item) => (
        <Button label={<NavLink className='link' to={item.href}>{item.label}</NavLink>} key={item.label} />
      ))}
    </Nav>
  </Header>
  )
}
