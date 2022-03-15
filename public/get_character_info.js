const get_character_info = (character_name) => {
  var character_info, character_spec;
  fetch(`https://api.guildwars2.com/v2/characters/${character_name}?access_token=${access_token}`)
  .then((characters) => {
    return characters.json();
  })
  .then((character) => {
    character_info = character;
    return fetch(`https://api.guildwars2.com/v2/specializations/${character.specializations.pve[2].id}`);
  })
  .then((spec_info) => {
    return spec_info.json();
  })
  .then((elite_spec) => {
    elite_spec_pic = elite_spec.profession_icon_big;
    elite_spec_name = elite_spec.name;

    characterBox = document.createElement('div');
    characterBox.className = "characterBox";

    header = document.createElement('header');
    header.className = "characterName";
    characterName = `${character_info.name}`;

    article = document.createElement('article');
    article.className = "main";

    aside_1 = document.createElement('aside');
    aside_1.className = "aside aside_1";

    aside_2 = document.createElement('aside');
    aside_2.className = "aside aside_2";
    
    footer = document.createElement('footer');
    footer.className = "footer";

    characterBirthdate = document.createElement('span');
    characterBirthdate.className = "characterBirthdate";
    var char_creation = new Date(character_info.created);
    var creation_dd = String(char_creation.getDate()).padStart(2, '0');
    var creation_mm = String(char_creation.getMonth() + 1).padStart(2, '0'); //January is 0!
    var creation_yyyy = char_creation.getFullYear();
    var creation_string = new String(creation_yyyy + '-' + creation_mm + '-' + creation_dd);
    var creation_final = creation_string.split('-');

    var today = new Date();
    var today_dd = String(today.getDate()).padStart(2, '0');
    var today_mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var today_yyyy = today.getFullYear();
    var today_string = new String(today_yyyy + '-' + today_mm + '-' + today_dd);
    var today_final = today_string.split('-');

    var today_format = new Date(today_final[0],today_final[1],today_final[2]);
    var creation_format = new Date(creation_final[0],creation_final[1],creation_final[2]);

    var diff = Math.abs(((today_format.getTime() - creation_format.getTime()) / (24 * 3600 * 1000)/365));

    characterBirthdate.innerText = 'Created: ' + creation_final[2]+'/'+creation_final[1]+'/'+creation_final[0];

    characterAge = document.createElement('span');
    characterAge.className = "characterAge";
    characterAge.innerText = 'Age: ' + Math.round(diff).toString().substring(0) + ' years, ' + diff.toString().split(".")[1].split("")[0] + ' months';

    characterPlaytime = document.createElement('span');
    characterPlaytime.className = "characterPlaytime";
    let playtime = Math.floor(character_info.age/60/60);
    characterPlaytime.innerText = `${playtime} hours played`;

    characterRace = document.createElement('a');
    characterRace.className = "characterRace";
    characterRace.href = `https://wiki.guildwars2.com/wiki/${character_info.race}`;
    characterRace.innerText = `${character_info.race}`;

    characterProf = document.createElement('a');
    characterProf.className = "characterProf";
    characterProf.href = `https://wiki.guildwars2.com/wiki/${elite_spec_name}`;
    characterProfPic = document.createElement('img');
    characterProfPic.className = "characterProfPic";

    characterEliteSpec = document.createElement('a');
    characterEliteSpec.className = "characterEliteProf";
    characterEliteSpec.href = `https://wiki.guildwars2.com/wiki/${elite_spec_name}`;
    characterEliteSpecPic = document.createElement('img');
    characterEliteSpecPic.className = "characterEliteProf";

    characterEliteSpec = document.createElement('span');
    characterEliteSpec.className = "characterEliteProf";
    characterEliteSpec.innerText = elite_spec_name;
    

    //characterProfPic.src = `url('${get_profession_icon(character.profession)}')`;
    //characterProfPic.innerText = "url('https://render.guildwars2.com/file/A94D00911BD47CDE39A104F90C7D07DE623554ED/156631.png')";
    
    //characterProfPic.src = `${get_profession_icon(character.profession)}`;
    //characterProfPic.src = "https://render.guildwars2.com/file/A94D00911BD47CDE39A104F90C7D07DE623554ED/156631.png";

    switch(character_info.profession) {
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

    characterBox.id = elite_spec_name;

    console.log(characterEliteSpec)

    characterProfPic.src = `https://render.guildwars2.com/file/${profImage}.png`
    characterEliteSpecPic.src = elite_spec_pic

    header.append(characterName);

    if (characterEliteSpecPic.src === "undefined") {
      characterProf.append(characterProfPic);
    }
    else {
      characterProf.append(characterEliteSpecPic);
    }

    aside_1.append(characterRace);
    aside_1.append(characterEliteSpec);
    aside_1.append(characterProf);
    aside_2.append(characterBirthdate);
    aside_2.append(document.createElement("br"));
    aside_2.append(characterAge);
    aside_2.append(document.createElement("br"));
    aside_2.append(characterPlaytime);
    footer.append('');
    characterBox.append(header);
    characterBox.append(aside_1);
    characterBox.append(article);
    characterBox.append(aside_2);
    characterBox.append(footer);
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
