export const createURLSearchParams = (objQuery: any): string => {
  const params = new URLSearchParams(objQuery)
  params.forEach((value, key) => {
    if (value == '') {
      params.delete(key)
    }
  })

  return params.toString()
}
