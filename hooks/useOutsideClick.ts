import { useEffect } from 'react'

const useOutsideClick = (ref: React.MutableRefObject<any>, onOutsideClick: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }
 
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}


export default useOutsideClick