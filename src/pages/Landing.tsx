import { Button, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import { Link } from 'react-router-dom'

export default function Landing () {
  return (
    <Layout>
    <Content>
      <Title level={2}>Help us find out what the real data on the Chabad community is like.</Title>
      <Button type='primary' href='survey' ><Link to='survey'>Hello</Link></Button>
    </Content>
  </Layout>
  )
}
