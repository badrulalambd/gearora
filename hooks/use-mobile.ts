import * as React from "react"

const MOBILE_BREAKPOINT = 768

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

export function useIsMobile() {
  // Hydration-safe: false on the server and during hydration, the real value
  // on the client (instead of setState inside an effect, which fails lint).
  return React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false,
  )
}
