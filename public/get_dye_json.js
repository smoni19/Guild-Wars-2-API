const get_dye_json = () => {
  fetch('https://api.guildwars2.com/v1/colors.json').then((response) =>{
  return response.json();
}).then((jsonData)=> {
    colours = jsonData['colors'];

    for (var key in colours) {
      if (colours.hasOwnProperty(key)) {
        dyeElement = document.createElement('p');
        dyeElement.innerText = colours[key]['name'] + "\n" + colours[key]['cloth']['rgb'];
        dyeElement.style.backgroundColor = 'rgb(' + colours[key]['cloth']['rgb'][0] + ',' + colours[key]['cloth']['rgb'][1] + ',' + colours[key]['cloth']['rgb'][2] + ')';
        document.querySelector('#dyesContainer').appendChild(dyeElement);
      }
    }
  })
};

module.exports = get_dye_json;