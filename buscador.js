const characterList = document.getElementById("charactersList");
var searchBar = document.getElementById("searchBar");
let hpCharacters = [];


searchBar.addEventListener('keyup', (e) =>{
    const searchHtml = e.target.value.toLowerCase();
   const filterCharacters = hpCharacters.filter(character =>{
      return  character.name.toLowerCase().includes(searchHtml);
    });
    displayCharacters(filterCharacters);
});

const loadCharacters = async () =>{
    try{
        const res = await fetch("https://facundorodriguez19.github.io/FacuReceptorio/jsonCategorias.json");
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch(err){
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const html = characters
    .map((character) => {
        return `
        <a href="#" style="text-decoration: none; color: black;">
        <li class="character">
            
            <h3 class="text_name">${character.name}</h3>
        </li>
        </a>
        `;
    })
    .join('');
    characterList.innerHTML = html;
};

loadCharacters();

document.querySelector("#searchBar").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    
    document.querySelector("#boton_buscar").click(); // Things you want to do.
   
    event.preventDefault(); // No need to `return false;`.
});

document.getElementById("boton_buscar").addEventListener("click", function(e) {
    e.preventDefault();
    let charactersList = document.getElementById("charactersList");
    charactersList.classList.remove('displaynone');
    charactersList.classList.add('displayblock');
})
