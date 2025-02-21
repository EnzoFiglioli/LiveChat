import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChatProvider } from './context/ChatContext.tsx';

createRoot(document.getElementById('root')!).render(
  <ChatProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ChatProvider>
)
