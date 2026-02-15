import { Scene } from "./state.js";

export function getRoute(){
  const h = (location.hash || "#/").replace("#", "");
  const path = h.startsWith("/") ? h : "/";
  return path;
}

export function routeToScene(path){
  switch(path){
    case "/skills": return Scene.SKILLS;
    case "/formations": return Scene.FORMATIONS;
    case "/projects": return Scene.PROJECTS;
    case "/":
    default: return Scene.HOME;
  }
}

export function goHash(path){
  location.hash = `#${path}`;
}
