const {Controller} = require('st-ethernet-ip')


const PLC = new Controller()


PLC.connect('192.168.86.200').then(async () => {

  PLC.tagList.forEach(tag => {
    console.log('Program: ', tag.program, ' Name: ', tag.name)
  })

  const recipe1 = PLC.newTag('recipe1', 'MainProgram')
  const status = PLC.newTag('systemStatus')
  
  await PLC.readTag(recipe1)
  await PLC.readTag(status)

  console.log('Recipe:', recipe1.value)
  console.log('Status:', status.value)
  
  recipe1.value.MixTime = 45
  status.value = 'Recipe1: Mix Time Changed To 45 Minutes'

  await PLC.writeTag(recipe1)
  await PLC.writeTag(status)
  
}).catch(e => {
  console.log(e)
})