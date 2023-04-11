import React from 'react'
import { useFormContext } from 'react-hook-form'

type PropsType = React.ComponentPropsWithoutRef<'input'> & {
  name: string
}

const FormField = ({ name, ...props }: PropsType) => {
   
  const {
    register,
    formState: { errors },
  } = useFormContext()

  
  return (
    <label className="text-left">
      <input
        {...props}
        className={`w-full rounded-md border text-2xl p-3 focus:outline-blue-500 ${
          errors[name]?.message && `focus:outline-red-500`
        }`}
        {...register(name)}
      />
      <p className="text-red-500 pl-1 text-sm">
        {errors[name]?.message as string}
      </p>
    </label>
  )
}

export default FormField
