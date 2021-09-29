const {Controller} = require('st-ethernet-ip');

const PLC = new Controller()


PLC.connect('192.168.86.200').then(async () => {

  const mixerSpeeds = PLC.newTag('mixerSpeeds', null, null, 1, 5)
  const recipes = PLC.newTag('recipes', 'MainProgram', null, 1, 10)
  
  await PLC.readTag(mixerSpeeds)
  await PLC.readTag(recipes)

  console.log('MixerSpeeds: ', mixerSpeeds.value)
  console.log('Recipes:', recipes.value)
  
  recipes.value[0].RecipeName = 'Base Recipe'
  recipes.value[0].MixerSpeed = mixerSpeeds.value[0] 
  
  await PLC.writeTag(recipes)

  recipes.value[1] = { ...recipes.value[0] }
  recipes.value[1].RecipeName = 'Thin Crust Dough'
  recipes.value[1].MixerSpeed = mixerSpeeds.value[1]
  
  await PLC.writeTag(recipes)

  console.log('Recipes:', recipes.value)
  
}).catch(e => {
  console.log(e)
})