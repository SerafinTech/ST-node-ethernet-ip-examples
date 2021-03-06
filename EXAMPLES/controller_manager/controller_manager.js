const {ControllerManager} = require('st-ethernet-ip')

const cm = new ControllerManager()

const cont = cm.addController('192.168.86.200')

cont.connect()

//addTag(tagname, program = null, arrayDims = 0, arraySize = 0x01)
cont.addTag('tankLevel')
cont.addTag('systemMessages', null, 1, 10)

cont.on('TagInit', (tag, prevValue) => {
  console.log(tag.name, ' init ', prevValue, ' => ', tag.value)

  if (tag.name === 'systemMessages') {
    tag.value[6] = 'Warning'
  }

})

cont.on('TagChanged', (tag, prevValue) => {
  console.log(tag.name, ' changed ', prevValue, ' => ', tag.value)
})

cont.on('Error', (e) => {
  if (e.message) 
  console.log(e)
})

