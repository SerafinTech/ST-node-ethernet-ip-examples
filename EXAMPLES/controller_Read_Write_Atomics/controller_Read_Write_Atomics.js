const {Controller} = require('st-ethernet-ip')


const PLC = new Controller()


PLC.connect('192.168.86.200').then(async () => {

  PLC.tagList.forEach(tag => {
    console.log('Program: ', tag.program, ' Name: ', tag.name)
  })
  
  const tankLevel = PLC.newTag('tankLevel')
  const recipeNumber = PLC.newTag('recipeNumber', 'MainProgram')

  await PLC.readTag(tankLevel)
  await PLC.readTag(recipeNumber)

  console.log('Tank Level: ', tankLevel.value, '%')
  console.log('Recipe: ', recipeNumber.value)

  recipeNumber.value = 2;

  await PLC.writeTag(recipeNumber)

  console.log('New Recipe: ', recipeNumber.value)

}).catch(e => {
  console.log(e)
})