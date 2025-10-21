import React, { createContext, useContext, useMemo, useState } from 'react'

export type Phase = 'locked' | 'horiz' | 'vertical'

type PhaseContextValue = {
  phase: Phase
  setPhase: (p: Phase) => void
  allowHorizontal: () => boolean
  allowVertical: () => boolean
}

const PhaseContext = createContext<PhaseContextValue | null>(null)

export const PhaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [phase, setPhase] = useState<Phase>('locked')

  const value = useMemo<PhaseContextValue>(() => ({
    phase,
    setPhase,
    allowHorizontal: () => phase === 'horiz',
    allowVertical: () => phase === 'vertical',
  }), [phase])

  return (
    <PhaseContext.Provider value={value}>{children}</PhaseContext.Provider>
  )
}

export const usePhase = () => {
  const ctx = useContext(PhaseContext)
  if (!ctx) throw new Error('usePhase must be used within PhaseProvider')
  return ctx
}

