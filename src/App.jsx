import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Gallery from './Gallery'
import GuardianCard from "./GuardianCard";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Create" element={<Create/>} />
          <Route path="/Gallery" element={<Gallery/>} />
          <Route path="/guardian/:id" element={<GuardianCard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
