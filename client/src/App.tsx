import './App.css'
import Layout from './layout/Layout'
import { AppRoutes } from './routes/AppRoutes'

function App() {

  return (
    <div className='app'>
      <Layout children={<AppRoutes />} />
    </div>
  )
}

export default App
