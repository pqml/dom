import 'raf/polyfill'
import test from 'tape-promise/tape'
import * as dom from '../lib'

test('simple dom batch', async t => {
  const log = []

  dom.mutate(() => { log.push(2) })
  dom.measure(() => { log.push(0) })
  const endMutation = dom.mutate(() => { log.push(3) }, true)
  dom.measure(() => { log.push(1) })

  await endMutation

  t.deepEqual(log, [0, 1, 2, 3])
  t.end()
})

test('abort dom batching', async t => {
  const log = []

  dom.mutate(() => { log.push(1) })
  dom.measure(() => { log.push(0) })
  const endMutation = dom.mutate(() => { log.push(2) }, true)
  dom.measure(toAbort)

  function toAbort () {
    log.push('bad')
  }

  dom.removeMeasure(toAbort)

  await endMutation

  t.deepEqual(log, [0, 1, 2])
  t.end()
})
