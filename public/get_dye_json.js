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

        switch(colours[key]['categories'][0]) {
        case "Gray":
          document.querySelector('#greys').appendChild(dyeElement);
          break;
        case "Brown":
          document.querySelector('#browns').appendChild(dyeElement);
          break;
        case "Red":
          document.querySelector('#reds').appendChild(dyeElement);
          break;
        case "Orange":
          document.querySelector('#oranges').appendChild(dyeElement);
          break;
        case "Yellow":
          document.querySelector('#yellows').appendChild(dyeElement);
          break;
        case "Blue":
          document.querySelector('#blues').appendChild(dyeElement);
          break;
        case "Green":
          document.querySelector('#greens').appendChild(dyeElement);
          break;
        case "Purple":
          document.querySelector('#purples').appendChild(dyeElement);
          break;
        default:
          break;
        }
      }
    }
  })
};

module.exports = get_dye_json;