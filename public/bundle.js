(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // public/get_dye_json.js
  var require_get_dye_json = __commonJS({
    "public/get_dye_json.js"(exports, module) {
      var get_dye_json2 = () => {
        fetch("https://api.guildwars2.com/v1/colors.json").then((response) => {
          return response.json();
        }).then((jsonData) => {
          colours = jsonData["colors"];
          for (var key in colours) {
            if (colours.hasOwnProperty(key)) {
              dyeElement = document.createElement("p");
              dyeElement.innerText = colours[key]["name"] + "\n" + colours[key]["cloth"]["rgb"];
              dyeElement.style.backgroundColor = "rgb(" + colours[key]["cloth"]["rgb"][0] + "," + colours[key]["cloth"]["rgb"][1] + "," + colours[key]["cloth"]["rgb"][2] + ")";
              document.querySelector("#dyesContainer").appendChild(dyeElement);
            }
          }
        });
      };
      module.exports = get_dye_json2;
    }
  });

  // public/index.js
  var get_dye_json = require_get_dye_json();
  get_dye_json();
})();
