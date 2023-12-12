const dialog = document.getElementById("pokemonDialog");
const closeDialog = document.getElementById("close_dialog");
const dialogContent = document.getElementById("dialog_content");

const pokeDialog = {};

pokeDialog.open = pokemon => {
  console.log(pokemon);
  dialog.classList.add(pokemon.type);
  dialogContent.innerHTML = `
    <div
      class="dialogContent"
      id="dialog_content"
    >
      <header class="dialogHeader">
        <div class="dialogHeaderTexts">
          <span class="dialogNumber">#${pokemon.number}</span>
          <div>
            <h3 class="dialogName">${pokemon.name}</h3>
            <ol class="dialogTypes">
              ${pokemon.types
                .map(type => `<li class="dialogType ${type}">${type}</li>`)
                .join("")}
            </ol>
          </div>
        </div>

        <img
          class="dialogImage"
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </header>
      <div class="dialogInfos">
        <div class="dialogPokemonStatus">
          <div class="statusTitle">Species</div>
          <div class="statusInfo">${pokemon.species}</div>
          <div class="statusTitle">Height</div>
          <div class="statusInfo">${pokemon.height / 10} m</div>
          <div class="statusTitle">Weight</div>
          <div class="statusInfo">${pokemon.weight / 10} Kg</div>
          <div class="statusTitle">Abilities</div>
          <div class="statusInfo">${pokemon.abilities.join(", ")}</div>
        </div>
      </div>
    </div>
  `;
  dialog.showModal();
};

closeDialog.addEventListener("click", () => {
  dialog.classList = ["pokemonDialog"];
  dialog.close();
});
