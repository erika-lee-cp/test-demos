import './App.css'
import { NovuHeader } from './Header'

function App() {

  const sendNotification = async () => {
    // TODO: send API request to backend that triggers a workflow
  }
  
  return (
    <>
      <NovuHeader>header</NovuHeader>
      <button onClick={sendNotification}>Notify</button>
    </>
  )
}


export default App
