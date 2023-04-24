function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  // Svuoto la libreria
  const library = document.querySelector('#sezione');
  library.innerHTML = '';
  //
  
  // Itera ogni risultato
  for(let i=0; i<20; i++)
  {
    // Leggo il documento Json
    const doc = json.data[i]

    // Leggio titolo e box art dell'argomento
    const title = doc.name;
    const immagine = doc.box_art_url;
    
    // Creo div che contiene immagine
    const album = document.createElement('div');
    album.classList.add('album');
    // Creo l'immagine e setto i pixel per "sbloccare" la box art
    const img = document.createElement('img');
    const immagine2=immagine.replace("{width}","200");
    const immagine3=immagine2.replace("{height}","200");
    img.src = immagine3;
    
    const title2 = document.createElement('span');
    
    title2.textContent = (i+1)+": "+title;
    
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(title2);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
  
}

function onJson2(json) {
  console.log('JSON ricevuto');

  // Svuoto la libreria
  const library = document.querySelector('#sezione');

  library.innerHTML = '';
  
  const num_results=2

  // Itero i vari risultati
  for(let i=0; i<num_results; i++)
  {
    // Leggo il json
    const doc = json.abilities[i]
    
    //leggo l'abilità 
    const abilita=doc.ability.name;
    //leggo la rarità
    const rarita= doc.is_hidden;

    
    
    const ris = document.createElement('div');
    ris.classList.add("copertinapkmn");

    

    ris.textContent="Abilità "+(i+1)+ ":"+abilita;
    

      if(rarita===true){
        //Se l'abilità è un'abilità nascosta(segreta), lo specifico

          ris.append(" (nascosta) ");

        }
      
    library.appendChild(ris);
    
    //itero le varie statistiche base
  }
  for(let j=0;j<6;j++){
      const doc2=json.stats[j]
      const base_stat=doc2.base_stat;
      const stat=doc2.stat.name;
      
      const statistiche=stat+": "+base_stat;

      let ris = document.createElement('div');
      ris.classList.add("copertinapkmn");
      
      ris.textContent=statistiche;
      
      library.appendChild(ris);
    
  }

  // itero il tipo/i due tipi del pokemon

  for(let k=0;k<2;k++){
  const types=json.types[k];
  const lunghezza=json.types;
  
    // controllo se possiede 1 o 2 tipi
      if(k<Object.keys(lunghezza).length){
      const tipo=types.type.name;

      const type=document.createElement('div');
      type.classList.add("copertinapkmn");
      type.textContent=tipo;
      library.appendChild(type);
      }
  }
  //prendo la foto del pokemon
  const ph=json.sprites
  const foto=ph.front_default;

  const cornice=document.createElement('div');
  cornice.classList.add('cornice');

  let img=document.createElement('img');
  img.classList.add('foto');
  img.src=foto;
  cornice.appendChild(img);

  library.appendChild(cornice);

}

function onResponse(response) {
  console.log('Tutto a posto');
  return response.json();
}

function search(event)
{
	// Impedisci il submit del form
	event.preventDefault();
  
	// Leggi valore del campo di testo
	const content = document.querySelector('#content').value;
  
	// verifico che il campo non sia vuoto
	if(content) {
	    const text = encodeURIComponent(content);
      text2=text.toLowerCase();
		console.log('Eseguo ricerca elementi riguardanti: ' + text2);
  
		// Leggo la scelta
		const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' +tipo);
  

		//Eseguo due funzioni diverse in base alla scelta
		if(tipo === "PokemonStats") {
	  		
        rest_url = 'https://pokeapi.co/api/v2/pokemon/' + text2;
        console.log('URL: ' + rest_url);
  
        fetch(rest_url).then(onResponse).then(onJson2);
	
		} 
		 else if(tipo === 'Ricerca')
		{
			const status = 'Ricerca'
			fetch(" https://api.twitch.tv/helix/games/top",
      {
      headers:
      {
        'Authorization': 'Bearer ' + token,
        'Client-Id': '146d9nfrc7m9he2nti63wcgxn7dja0'
      }
    }
  ).then(onResponse).then(onJson);
		}
	}
	else {
		alert("Inserisci il testo per cui effettuare la ricerca");
	}
}

function onTokenJson(json)
{
  console.log(json)
  // Salvo il token e lo stampo
  token = json.access_token;
  console.log("TOKEN:"+token);
}

function onTokenResponse(response)
{
  return response.json();
}

// Credenziali OAUTH2.0 TWITCH 
const client_id = '146d9nfrc7m9he2nti63wcgxn7dja0';
const client_secret = 'xxilb4mbl4hhory07b7iccfdm52zd5';
// Dichiaro token
let token;
// All'apertura della pagina, richiediamo il token
console.log("sto per richiedere il token");
fetch("https://id.twitch.tv/oauth2/token",
	{
    // tipo di fetch che richiede questa particolare API di twitch
   method: "post",
   body: "client_id=146d9nfrc7m9he2nti63wcgxn7dja0&client_secret=xxilb4mbl4hhory07b7iccfdm52zd5&grant_type=client_credentials",
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
   }
  }
).then(onTokenResponse).then(onTokenJson);

// Aggiungi event listener al form
const form = document.querySelector('form');
form.addEventListener('submit', search)