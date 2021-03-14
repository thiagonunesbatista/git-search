export const parseURLPagination = (url, rel) => {
  let auxUrl = url.split(',').find(current => current.includes(rel))

  if (auxUrl) {
    auxUrl = auxUrl.replace(/\s|<|>/g, '').split(';')[0]
  }

  return auxUrl
}
