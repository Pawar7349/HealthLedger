import { EthProvider } from './contexts/EthContext'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import { AlertProvider } from './contexts/AlertContext/AlertContext'

const App = ()=> {
  const content = useRoutes(routes)

  return (
    <EthProvider>
      <AlertProvider>{content}</AlertProvider>
    </EthProvider>
  )
}

export default App