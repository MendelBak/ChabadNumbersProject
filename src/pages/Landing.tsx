import { Button, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function Landing () {
  const navigate = useNavigate()

  return (
    <Layout>
    <StyledContent>
      <Title level={2}>Help us find out what the real data on the Chabad community is like</Title>
      <StyledButton size='large' type='primary' onClick={() => navigate('/survey')}>Take The Survey</StyledButton>
    </StyledContent>
  </Layout>
  )
}

const StyledContent = styled(Content)`
display: flex;
flex-direction: column;
justify-content: center;
height: 60vh;
align-items: center;
justify-content: space-around;
`

const StyledButton = styled(Button)`
width: 20%;
`
