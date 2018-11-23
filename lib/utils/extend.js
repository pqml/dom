export default function extend (obj, nObj) {
  for (var i in nObj) obj[i] = nObj[i]
  return obj
}
