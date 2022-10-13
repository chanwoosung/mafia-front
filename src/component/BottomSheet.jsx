import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const toastRoot = document.querySelector('#bottom-sheet-root')

export default function BottomSheet({ children, close, className }) {
  const el = useRef(document.createElement('div'))

  useEffect(() => {
    if (toastRoot === null) return
    const current = el.current
    if (toastRoot !== null) toastRoot.appendChild(current)

    return () => {
      toastRoot !== null && toastRoot.removeChild(current)
    }
  }, [])
  useEffect(() => {
    window.addGlobalOverflowHidden()
    return () => window.removeGlobalOverflowHidden()
  }, [])

  return createPortal(
    <>
      <div
        className={ className + ' fixed bottom-0 left-0 h-[75vh] w-[100vw] bg-bgSecondary z-50 rounded-t-[20px]' }>
        {children}
      </div>
      <div className="z-40 top-0 left-0 fixed w-[100vw] h-[100vh] bg-[#000000CC]" onClick={close} />
    </>,
    el.current,
  )
}
