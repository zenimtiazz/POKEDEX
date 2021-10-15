
let cardImg= document.querySelector(".card-img");
let name =document.querySelector(".name");
let ability = document.querySelector(".ability");
let idd = document.querySelector(".name-id");
let generateBtn = document.querySelector(".search-btn");

let moves = document.querySelector("#moves-list");
let evolImg= document.getElementById("inline");    
let p = document.querySelector(".pre")
let evolChain = document.getElementById("outline")
   
generateBtn.addEventListener("click" ,async() => {
  document.getElementById("outline").innerHTML = "";
   
    let id = document.querySelector(".search-input").value;
   
    let data = await getPokemon(`${id}`);
    console.log(data);
    let img = data.sprites.front_default;
    let newName = data.name;
    
      let newid= data.id;
    newName = newName.charAt(0).toUpperCase()+ newName.slice(1);
     name.innerText = newName;
    
 
    idd.innerText = newid;
   
    cardImg.innerHTML = `<img src =${img}>`;

    for(i=0; i<4; i++){
        let li = document.querySelectorAll(".li")[i];
        li.textContent = data.moves[i].move.name;
    }
  
console.log(data.id);
getPokemon(id);
//getEvolution(data.id);



let next = await getNextEvolution(data.id)
let nextev = await getNextEvo(next);
console.log(nextev)
let a =nextev.chain.species.name;
let b = data.name;
let dataa =(nextev.chain.evolves_to);
let x =dataa[0].evolves_to[0];
let c = x.species.name;
console.log(nextev);
  let arr= [a , b, c];
  console.log(arr);
   arr.forEach(async(e ) => {
  let z =  await getPokemon(e);
  console.log(z.sprites.front_default);
  document.getElementById("outline").innerHTML+=`<img src="${z.sprites.front_default}" alt="" >`;

 });
});
async function getPokemon(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
   
    console.log(data);
    
   return data;
}
/*async function getEvolution(id){
   
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();
    console.log(data.evolution_chain.url);

    let newevol= data.evolves_from_species;
    console.log(newevol);
   
    const im = await getPokemon(newevol.name);
    console.log(im.sprites.front_default);
    evolImg.innerHTML = `<img src="${im.sprites.front_default}" alt="" >`;
  
}*/
async function getNextEvolution(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();
    console.log(data);

  return data.evolution_chain.url;
}
async function getNextEvo(url){

  const res = await fetch(url);
  const data = await res.json();
  return data;
}