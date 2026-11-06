import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"



// TODO : charger et parser track.json
const texte = readFileSync("track.json", "utf-8")
console.log(texte)

const track=JSON.parse(texte)
console.log(track)
// TODO : construire le chemin vers ~/ada-tech/bloc1/projets
const dossierProjets = join(homedir(), "ada-tech", "bloc1", "projets")
console.log(dossierProjets)
// TODO : vérifier que ce dossier existe et afficher le résultat
const existe = existsSync(dossierProjets)
console.log(existe)
if (existe){
    console.log("✅ dossier "+ dossierProjets)
}else{
    console.log("❌ dossier "+ dossierProjets)
}

// TODO : pour chaque projet de la track,
const projects = track.projects
console.log(projects)
let corrects = 0
 projects.forEach((p) => {
  
 //        vérifier que le dossier existe au bon endroit
 const lesdossiers = existsSync(join(dossierProjets, p.name))
 console.log(lesdossiers,p.name)
   if (lesdossiers){
    console.log("le dossier existe")
   }else{
  console.log("le dossier n'existe pas")
 }
 //       git
 const gitOk = existsSync(join(dossierProjets, p.name, ".git"))
  console.log("gitOk" ,gitOk)
 
//        vérifier que les fichiers requis sont présents
//        afficher ✅ ou ❌ avec les erreurs dans l'ordre

 p.required.forEach((req)=>{
 const chemin = join(dossierProjets,p.name,req)
  console.log(chemin,p.name)
  if (existsSync(chemin)){
    console.log("✅ fichiers present "+ dossierProjets)
}else{
    console.log("❌ fichiers erreur "+ dossierProjets)
}
 })
const tousPresents = p.required.every((req) => existsSync(join(dossierProjets, p.name, req)))
if (lesdossiers && gitOk && tousPresents) {
  corrects++
}
})
 // TODO : calculer et afficher le pourcentage de projets corrects
const pourcentage = Math.round((corrects / projects.length) * 100)
const icone = corrects === projects.length ? "✅" : "❌"
console.log("")
console.log(icone + " " + pourcentage + "% des projets sont initialisés correctement (" + corrects + "/" + projects.length + ")")