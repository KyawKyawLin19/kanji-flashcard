import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KanjiFlashcardApp from './KanjiFlashcardApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KanjiFlashcardApp />
  </StrictMode>,
)
