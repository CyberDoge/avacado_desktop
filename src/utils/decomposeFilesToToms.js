export default function decomposeFilesToToms(rootPath, pagesUrl) {
  let result = []
  let level = { result }
  // todo change to dynamic protocol
  const protocol = "file:/"
  const lengthOfProtocol = protocol.length
  pagesUrl.forEach((path) => {
    path
      .substr(lengthOfProtocol + rootPath.length)
      .split("/")
      .reduce((r, title) => {
        if (!r[title]) {
          r[title] = { result: [] }
          r.result.push({ title, children: r[title].result, key: title, path })
        }
        return r[title]
      }, level)
  })

  deleteEmptyChildren(result)
  return result
}

// todo delete
function deleteEmptyChildren(object) {
  if (object.children?.length === 0) {
    object.isLeaf = true
    object.key = object.path
  }
  if (Array.isArray(object)) {
    object.forEach(deleteEmptyChildren)
  } else {
    for (let property in object) {
      if (
        object.hasOwnProperty(property) &&
        typeof object[property] === "object"
      ) {
        deleteEmptyChildren(object[property])
      }
    }
  }
}