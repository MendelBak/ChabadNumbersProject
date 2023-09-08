import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Results() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Results Page</h1>
      <Button type="dashed" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </>
  )
}
