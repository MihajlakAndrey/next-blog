import { AxiosInstance, AxiosPromise } from 'axios'

import { UserType } from '../types'
import { UserDataType } from '../lib/utils/UpdateUser'

export const UserApi = (axiosInstance: AxiosInstance) => ({
  async updateMe(updateData: UserDataType) {
    const data = await axiosInstance.post<UserType, AxiosPromise<UserType>>(
      '/api/auth/me',
      updateData
    )
    return data
  },
})
