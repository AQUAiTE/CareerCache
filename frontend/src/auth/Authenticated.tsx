import {ReactNode, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Authenticated(props: {children: ReactNode}) {
  const isLoggedIn = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === null) {
      return false
    }
    const decoded = JSON.parse(atob(accessToken.split('.')[1]))
    return Date.now() / 1000 < decoded.exp
  }

  const navigate = useNavigate()
  const isUser = isLoggedIn()

  useEffect(() => {
    if (!isUser) {
      navigate('/login')
    }
  }, [isUser])

  return isLoggedIn() ? props.children : null
}
