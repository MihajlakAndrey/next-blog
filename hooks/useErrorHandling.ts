import { AxiosError } from 'axios'
import { useState } from 'react'

const useErrorHandling = () => {
  const [error, setError] = useState<{
    errorMessage: string
    error: Error | AxiosError
  } | null>(null)
  const [isError, setIsError] = useState(false)

  const errorHandler = (error: Error | AxiosError) => {
    const err = error as AxiosError<any>
      
    if (err.response) {
      setIsError(true)
      setError({
        error: err,
        errorMessage:
          err.response.data.error?.message || err.response.data.message,
      })
    } else {
      console.log('Error', error.message)
      setIsError(true)
      setError({
        error: err,
        errorMessage: error.message,
      })
    }
  }

  return {
    isError,
    errorHandler,
    error,
  }
}

export default useErrorHandling
