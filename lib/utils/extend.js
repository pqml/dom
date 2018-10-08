export default function extend (obj, nObj) {
  for (let i in nObj) obj[i] = nObj[i]
  return obj
}
