export type PostType = {
  _id: string
  title: string
  text: string
  tags: string[]
  viewsCount: number
  owner: UserType
  comments: any[]
  createdAt: string
  updatedAt: string
  image: string
}

export type UserType = {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  image?: string
  postCount: number
  commentCount: number
}

export type CommentType = {
  text: string
  owner: UserType
  relatedPost: string
  _id: string
  createdAt: string
  updatedAt: string
}

export type CloudinaryResType = {
  access_mode: string
  asset_id: string
  bytes: number
  created_at: string
  etag: string
  folder: string
  format: string
  height: number
  original_filename: string
  placeholder: boolean
  public_id: string
  resource_type: string
  secure_url: string
  signature: string
  tags: any[]
  type: string
  url: string
  version: number
  version_id: string
  width: number
}

export type PostDataType = {
  title: string
  text: string
  tags?: string
  image?: string
}
export type UserDataType = {
  email: string
  name?: string
  image?: string
}
