const save_api_key = () => {
  const input_field = document.getElementById('api_key_input_field');
  if (input_field.value.length != 0) {
    document.cookie = `api_key=${input_field.value};`;
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return(parts.pop().split(';').shift());
}

const check_cookie = () => {
  var input_field = document.getElementById('api_key_input_field');
  var save_button = document.getElementById('api_key_input_button');
  var character_select = document.getElementById('character_select');
  if (getCookie('api_key').length == 72) {
    input_field.style.visibility = "hidden";
    save_button.style.visibility = "hidden";
    character_select.style.visibility = "visible";
    get_character_names();
  }
  else {
    input_field.style.visibility = "visible";
    save_button.style.visibility = "visible";
    character_select.style.visibility = "hidden";
  }
}