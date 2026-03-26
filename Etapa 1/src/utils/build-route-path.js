export function buildroutepath(path) {
    const routeparametersregex = /:([a-zA-z]+)/g
    const pathwithparams = path.replaceAll(routeparametersregex, '(?<$1>[a-z0-9\-_]+)')
  
    const pathregex = new RegExp(`^${pathwithparams}(?<query>\\?(.*))?$`)
  
    return pathregex
    
}