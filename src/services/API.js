async function request(path) {
    try {
        const promise = await fetch(`http://localhost:3000/${path}`)
        return promise.json()
    } 
    catch (error) {
        throw new Error("Erreur de chargement de la base de données");        
    }
}
export const api = {
    get: (path)=>request(path)
}
