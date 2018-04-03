let finish
let p

function batch () {
  if (!p) p = new Promise(resolve => { finish = resolve })
  return p
}

(async () => {
  const finished = batch()
  console.log('Wait A')
  await finished
  console.log('A')
})()

;(async () => {
  console.log('Wait B')
  await batch()
  console.log('B')
})()

setTimeout(finish, 1000)
