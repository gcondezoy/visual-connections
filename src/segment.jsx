import { createContext, useContext, useState } from 'react'

// Segmento de audiencia global: 'hogar' | 'empresa'.
// Controla hero, servicios y planes desde un solo lugar.
const SegmentContext = createContext(null)

export function SegmentProvider({ children }) {
  const [segment, setSegment] = useState('hogar')
  return (
    <SegmentContext.Provider value={{ segment, setSegment }}>
      {children}
    </SegmentContext.Provider>
  )
}

export function useSegment() {
  return useContext(SegmentContext)
}
