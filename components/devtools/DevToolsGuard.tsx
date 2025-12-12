'use client'

import { useEffect } from 'react'

export default function DevToolsGuard() {
  useEffect(() => {
    try {
      const win = window as any
      if (!win.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        win.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
          renderers: new Map(),
          rendererInterfaces: new Map(),
          // minimal API surface used by some versions of the extension
          supportsFiber: true,
          inject: () => {},
          on: () => {},
          off: () => {},
          emit: () => {}
        }
      } else {
        // ensure rendererInterfaces exists and is a Map
        if (!win.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces) {
          win.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces = new Map()
        }
        if (!win.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers) {
          win.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers = new Map()
        }
      }

      // Prevent semver parsing crashes by ensuring all registered renderers have a valid version string
      const renderers = win.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers
      if (renderers && typeof renderers.forEach === 'function') {
        renderers.forEach((value: any) => {
          try {
            if (!value || !value.version) {
              value.version = '0.0.0'
            }
          } catch {
            // ignore
          }
        })
      }

      // Wrap Map.set to sanitize future writes to renderers and rendererInterfaces
      try {
        const wrapMapSet = (map: Map<any, any>) => {
          if (!map) return
          const originalSet: any = (map as any).set
          if (originalSet && originalSet._wrapped) return
          const wrapped = function (this: Map<any, any>, key: any, val: any) {
            try {
              if (val && typeof val === 'object' && !val.version) {
                val.version = '0.0.0'
              }
            } catch {}
            return originalSet.call(this, key, val)
          }
          wrapped._wrapped = true
          map.set = wrapped as any
        }

        wrapMapSet(win.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers)
        wrapMapSet(win.__REACT_DEVTOOLS_GLOBAL_HOOK__.rendererInterfaces)
      } catch {
        // ignore
      }
    } catch {
      // noop
    }
  }, [])

  return null
}
