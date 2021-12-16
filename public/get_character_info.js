const get_character_info = (character_name) => {
  fetch(`https://api.guildwars2.com/v2/characters/${character_name}?access_token=${access_token}`).then((response) => {
    return response.json();
  })
  .then((character) => {
    characterBox = document.createElement('div');
    characterBox.className = "characterBox";
    characterName = document.createElement('p');
    characterName.className = "characterName";
    characterName.innerText = `${character.name}`;

    characterRace = document.createElement('a');
    characterRace.className = "characterRace";
    characterRace.href = `https://wiki.guildwars2.com/wiki/${character.race}`;
    characterRace.innerText = `${character.race}`;

    characterProf = document.createElement('a');
    characterProf.className = "characterProf";
    characterProf.href = `https://wiki.guildwars2.com/wiki/${character.profession}`;
    characterProf.innerText = `${character.profession}`;

    characterProfPic = document.createElement('img');
    characterProfPic.className = "characterProfPic";
    //characterProfPic.src = `url('${get_profession_icon(character.profession)}')`;
    //characterProfPic.innerText = "url('https://render.guildwars2.com/file/A94D00911BD47CDE39A104F90C7D07DE623554ED/156631.png')";
    
    //characterProfPic.src = `${get_profession_icon(character.profession)}`;
    //characterProfPic.src = "https://render.guildwars2.com/file/A94D00911BD47CDE39A104F90C7D07DE623554ED/156631.png";

    switch(character.profession) {
      case "Elementalist":
        characterBox.id = "Elementalist";
        profImage = "BBED46EB20C80D0DDE0F99402493C7E6FFAE1530/156629";
        break;
      case "Engineer":
        characterBox.id = "Engineer";
        profImage = "A94D00911BD47CDE39A104F90C7D07DE623554ED/156631";
        break;
      case "Guardian":
        characterBox.id = "Guardian";
        profImage = "6E0D0AC6E0CE5C0C29B3D736ABEA070F4A58540E/156633";
        break;
      case "Necromancer":
        characterBox.id = "Necromancer";
        profImage = "CA5A4E96080FCF057C9DA0ED35C693477580421C/156637";
        break;
      case "Mesmer":
        characterBox.id = "Mesmer";
        profImage = "AF61567E16A83F145D6FB35D63BF01074A3A5AB9/156635";
        break;
      case "Ranger":
        characterBox.id = "Ranger";
        profImage = "FEF2479DC197D40758A8D6E95201F4A7996EB357/156639";
        break;
      case "Revenant":
        characterBox.id = "Revenant";
        profImage = "696A48DD61EE01FD1F4FBBBDB82D74611E04EA39/965717";
        break;
      case "Thief":
        characterBox.id = "Thief";
        profImage = "13A2C0EF23F23FF2084875629465279DDA807E3D/103581";
        break;
      case "Warrior":
        characterBox.id = "Warrior";
        profImage = "0A76324239946B79C061762095FAB2BDF7A1D8D7/156642";
        break;
      default:
        break;
      }


      characterProfPic.src = `https://render.guildwars2.com/file/${profImage}.png`
    //console.log(characterProfPic.src);
    characterBox.append(characterName)
    characterBox.append(characterProf)
    characterBox.append(characterRace)
    characterBox.append(characterProfPic)
    document.querySelector('#character_info').appendChild(characterBox);
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

const get_profession_icon = (profession_to_find) => {
  fetch(`https://api.guildwars2.com/v2/professions/${profession_to_find}`).then((response) => {
    return response.json();
  })
  .then((profession) => {
    //console.log(profession.icon_big);
    //return profession.icon_big;
    //console.log(`url('${profession.icon_big}')`);
    //return `url('${profession.icon_big}')`;
    //console.log(`https://api.guildwars2.com/v2/professions/${profession_to_find}`)
    //console.log(profession.icon_big);
    return profession;
  })
};
