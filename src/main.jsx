import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ME } from './content.js'
import './styles.css'

document.title = `${ME.name} — ${ME.role}`
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
