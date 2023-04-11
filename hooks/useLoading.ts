import { useState } from 'react'

const useLoading = () => {
  
  const [isLoading, setIsloading] = useState(false)

  const withLoading = async (cb: (args?: any) => Promise<void>) => {
    setIsloading(true)
    await cb()
    setIsloading(false)
  }

  return {
    isLoading,
    withLoading,
  }
}

export default useLoading
