import React, { memo } from 'react'

import MyButton from '../../UI/MyButton'

type PropsType = {
  fileRef: React.RefObject<HTMLInputElement>
  preview: string | ArrayBuffer | null
  image: string
  onChange: (changeEvent: React.ChangeEvent<HTMLInputElement>) => void
  removeImage: Generator<void, boolean, unknown>
}

const PostImage = memo((props: PropsType) => {
  const { fileRef, preview, image, onChange, removeImage } = props
  const isImage = !!(preview || image)

  return (
    <div>
      <div className="flex justify-between mb-2">
        <MyButton
          type="button"
          variant="main"
          onClick={() => fileRef.current?.click()}
        >
          {isImage ? `Change image ` : `Add image`}
        </MyButton>
        <button
          hidden={!isImage}
          type="button"
          onClick={() => removeImage.next()}
        >
          <span className="text-black text-3xl p-1 font-bold">&#x2715;</span>
        </button>
      </div>

      <img className="object-cover w-full" src={(preview as string) || image} />

      <input ref={fileRef} onChange={onChange} type="file" hidden />
    </div>
  )
})

export default PostImage
