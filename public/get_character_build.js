const get_specialisation_info = (specialisation) => {

  if (document.getElementById('loader')) {
    document.getElementById('loader').remove();
  }

  var selected_traits = specialisation.traits;

  fetch(`https://api.guildwars2.com/v2/specializations/${specialisation.id}`)
  .then((response) => {
    return response.json();
      }).then((jsonData) => {
        var specialisation_info = jsonData;
        var specialisation_id = specialisation_info.id;
        var specialisation_name = specialisation_info.name;
        var specialisation_elite = specialisation_info.elite;
        var specialisation_minor_traits = specialisation_info.minor_traits;
        var specialisation_major_traits = specialisation_info.major_traits;
        var specialisation_icon = specialisation_info.icon;
        var specialisation_background = specialisation_info.background;

        let spec_lines = document.getElementsByClassName('specialisation');
        for (let spec_line of spec_lines) {
          if (spec_line.id == specialisation_id) {
            spec_line.style.backgroundImage = `url(${specialisation_background})`;
            if (specialisation_elite == true) {
              spec_line.classList.add('elite');
            }

            const specialisation_name_element = document.createElement('a');
            specialisation_name_element.className = "specialisation_name";
            specialisation_name_element.innerHTML = specialisation_name;
            specialisation_name_element.href = `https://wiki.guildwars2.com/wiki/${specialisation_name}`

            specialisation_major_traits.forEach(function(major_trait) {
              fetch(`https://api.guildwars2.com/v2/traits/${major_trait}`)
              .then((response) => {
                return response.json();
                  }).then((jsonData) => {
                    var major_trait_info = jsonData;
                    var major_trait_id = major_trait_info.id;
                    var major_trait_tier = major_trait_info.tier;
                    var major_trait_order = major_trait_info.order;
                    var major_trait_name = major_trait_info.name;
                    var major_trait_description = major_trait_info.description;
                    var major_trait_slot = major_trait_info.slot;
                    var major_trait_facts = major_trait_info.facts;
                    var major_trait_speclisation = major_trait_info.specialization;
                    var major_trait_icon = major_trait_info.icon;

                    var major_trait_icon_element = document.createElement('div');
                    var classNameString = `${major_trait_slot} tier-${major_trait_tier}-${major_trait_order}`
                    selected_traits.includes(major_trait_id) ? major_trait_icon_element.className = `selected ${classNameString}` : major_trait_icon_element.className = classNameString;

                    major_trait_icon_element.id = `${major_trait_slot} ${major_trait_tier}`;
                    major_trait_icon_element.style.backgroundImage = `url(${major_trait_icon})`;
                    major_trait_icon_element.innerText = '';

                    trait_tooltip = document.createElement('span');
                    trait_tooltip.className = "tooltip";
                    if (major_trait_description != 'undefined') {
                      trait_tooltip.innerText = `${major_trait_description}`;
                    }
                    major_trait_icon_element.append(trait_tooltip);

                    var major_trait_link = document.createElement('a');
                    major_trait_link.href = `https://wiki.guildwars2.com/wiki/${major_trait_name}`;
                    major_trait_link.target = "_blank"
                    major_trait_link.rel = "noopener noreferrer"
                    major_trait_link.append(major_trait_icon_element)

                    spec_line.append(major_trait_link);
                  })
                });

            specialisation_minor_traits.forEach(function(minor_trait) {
              fetch(`https://api.guildwars2.com/v2/traits/${minor_trait}`)
              .then((response) => {
                return response.json();
                  }).then((jsonData) => {
                    var minor_trait_info = jsonData;
                    var minor_trait_id = minor_trait_info.id;
                    var minor_trait_tier = minor_trait_info.tier;
                    var minor_trait_order = minor_trait_info.order;
                    var minor_trait_name = minor_trait_info.name;
                    var minor_trait_description = minor_trait_info.description;
                    var minor_trait_slot = minor_trait_info.slot;
                    var minor_trait_facts = minor_trait_info.facts;
                    var minor_trait_speclisation = minor_trait_info.specialization;
                    var minor_trait_icon = minor_trait_info.icon;

                    var minor_trait_icon_element = document.createElement('div');

                    var classNameString = `${minor_trait_slot} tier-${minor_trait_tier}`
                    specialisation_minor_traits.includes(minor_trait_id) ? minor_trait_icon_element.className = `selected ${classNameString}` : minor_trait_icon_element.className = classNameString;

                    minor_trait_icon_element.id = `${minor_trait_slot} ${minor_trait_tier}`;
                    minor_trait_icon_element.style.backgroundImage = `url(${minor_trait_icon})`;
                    minor_trait_icon_element.innerText = '';

                    trait_tooltip = document.createElement('span');
                    trait_tooltip.className = "tooltip";

                    minor_trait_description != null ? trait_tooltip.innerText = `${minor_trait_description}` : trait_tooltip.innerText = `${minor_trait_facts}`;
                    minor_trait_icon_element.append(trait_tooltip);

                    var minor_trait_link = document.createElement('a');
                    minor_trait_link.href = `https://wiki.guildwars2.com/wiki/${minor_trait_name}`;
                    minor_trait_link.target = "_blank"
                    minor_trait_link.rel = "noopener noreferrer"
                    minor_trait_link.append(minor_trait_icon_element);
                    spec_line.append(minor_trait_link);
                  })
                  spec_line.append(specialisation_name_element);
                });
            }}
      })
};

const get_trait_info = (trait) => {
  fetch(`https://api.guildwars2.com/v2/traits/${trait}`)
  .then((response) => {
    return response.json();
      }).then((jsonData) => {
        trait_info = jsonData;
        trait_id = trait_info.id;
        trait_tier = trait_info.tier;
        trait_order = trait_info.order;
        trait_name = trait_info.name;
        trait_description = trait_info.description;
        trait_slot = trait_info.slot;
        trait_facts = trait_info.facts;
        trait_speclisation = trait_info.specialization;
        trait_icon = trait_info.icon;
        trait_info = [trait_id, trait_tier, trait_order, trait_name, trait_description, trait_slot, trait_facts, trait_speclisation, trait_icon];
      return trait_info;
      })
};

const get_character_names = () => {
  fetch(`https://api.guildwars2.com/v2/characters?access_token=${access_token}`).then((response) => {
    return response.json();
  })
  .then((character_list) => {
    character_list.sort().forEach(function(character) { 
      var character_dropdown = document.getElementById("character_select");
      var option = document.createElement("option");
      option.text = character;
      character_dropdown.add(option);
      character_select.size = character_list.length+1;
    });
  })
};

const get_specialisations = () => {
  const character_select = document.getElementById('character_select');
  const character = character_select.value;
  const build = document.getElementById('build');
  build.innerHTML = '';
  //build.innerHTML = `Loading ${character}'s build...`;
  const loader = document.createElement('div');
  loader.id = "loader"
  build.append(loader)

  //const name_uppercase = character.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  fetch(`https://api.guildwars2.com/v2/characters/${character}?access_token=${access_token}`)
  .then((response) => {
    return response.json();
    })
    .then((character) => {
      specialisations = character.specializations.pve;
      traits = character.specializations.pve.traits;
      specialisations.forEach(function(specialisation) {
        const spec = document.createElement('div');
        spec.id = specialisation.id
        spec.className = 'specialisation'
        build.append(spec)
        get_specialisation_info(specialisation);
      });
  })
};
