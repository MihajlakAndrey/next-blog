export const createMongoQuery = (query: {
  [key: string]: string | string[] | undefined
}) => {
  let mongoQuery: any = {
    find: {},
    sort: {},
  }

  if (query.sort) {
    mongoQuery.sort = { [query.sort as string]: -1 }
  } else {
    mongoQuery.sort = { createdAt: -1 }
  }
  if (query.title) {
    mongoQuery.find.title = { $regex: query.title, $options: 'i' }
  }

  if (query.tag) {
    mongoQuery.find.tags = { $in: [query.tag] }
  }

  return mongoQuery
}
