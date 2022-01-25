const now = new Date();
var hora = now.getHours();
var minutos = now.getMinutes();
var hs = hora.toString() + minutos.toString();
var hs = hs.slice(0, -1);
hs = parseInt(hs);
const store = document.getElementById("store");
const storenon = document.getElementById("nodisp");
if (hora === 12){
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 13){
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 14){
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 15){
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 16){
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 20)
{
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 21){
store.style.display='block';
storenon.style.display='none';
}
else if (hora === 22){
store.style.display='block';
storenon.style.display='none';
}
else if (hs === 230){ 
store.style.display='block';
storenon.style.display='none';
}
else if (hs === 231){
store.style.display='block';
storenon.style.display='none';
}
else if (hs === 232){
store.style.display='block';
storenon.style.display='none';
}
else if (hs === 193){
store.style.display='block';
storenon.style.display='none';
}
else if (hs === 194){
store.style.display='block';
storenon.style.display='none';
}
else if (hs === 195){
store.style.display='block';
storenon.style.display='none';
}
else{
store.style.display='none';
storenon.style.display='block';
}
