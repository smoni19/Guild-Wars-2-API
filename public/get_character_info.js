const get_character_info = (character_name) => {
  fetch(`https://api.guildwars2.com/v2/characters/${character_name}?access_token=${access_token}`).then((response) => {
    return response.json();
  })
  .then((character) => {
    infoElement = document.createElement('p');
    infoElement.innerText = `${character.name} - ${character.race} ${character.profession}`;
    document.querySelector('#character_info').appendChild(infoElement);
  })
};

const get_character_names = () => {
  fetch(`https://api.guildwars2.com/v2/characters?access_token=${access_token}`).then((response) => {
    return response.json();
  })
  .then((character_list) => {
    character_list.sort().forEach(function(character) { get_character_info(character); });
  })
};
