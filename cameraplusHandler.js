const path = require('path')
const fs = require('fs');

const camplusPath = 'D:/Programs/Steam/steamapps/common/Beat Saber/UserData/CameraPlus/cameraplus.cfg'
let camplusConfigData

// Read cameraplus config 
fs.readFile(camplusPath, 'utf8', function(err, data){
  if(err){
    console.log(err.message)
	return undefined
  }
  camplusConfigData = data
})

function setCameraMenu() {
  camplusConfigData = setConfigParam(camplusConfigData, 'thirdPerson', true)

  writeConfigFile()
}

function setCameraSong() {
  camplusConfigData = setConfigParam(camplusConfigData, 'thirdPerson', false)

  writeConfigFile()
}

function setConfigParam(data, paramName, value) {
  let splitData = data.split('\r\n')

  for (let i = 0; i < splitData.length; ++i) {
    let item = splitData[i]
    let pair = item.split('=')
    if (pair[0] === paramName) {
      splitData[i] = `${pair[0]}=${value}`
    }
  }

  let combinedData = splitData.toString().replace(/,/g, '\r\n')
  return combinedData
}

function writeConfigFile() {
  fs.writeFile(camplusPath, camplusConfigData, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log(`Config file ${camplusPath} was saved!`);
  })
}

module.exports = { setCameraMenu, setCameraSong }