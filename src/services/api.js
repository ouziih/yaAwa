
// Adresse du backend.
const base = import.meta.env.VITE_API_URL || "/api";

// Fonction commune pour envoyer une requête.
export async function request(path, { method = "GET", body } = {}) {
  const options = {
    method,
  };

  // Pour POST et PATCH, on prépare les données à envoyer.
  if (body !== undefined) {
    options.headers = {
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(body);
  }

  // Envoyer la requête au serveur.
  const response = await fetch(`${base}${path}`, options);

  // Vérifier si le serveur signale une erreur.
  if (!response.ok) {
    const message =
      response.status === 404
        ? "Ressource introuvable."
        : `Erreur API (${response.status}).`;

    const error = new Error(message);
    error.status = response.status;

    throw error;
  }

  // Certaines réponses ne contiennent aucune donnée.
  if (response.status === 204) {
    return null;
  }

  // Convertir la réponse JSON en données JavaScript.
  return response.json();
}

// Raccourcis utilisés dans les composants et les stores.
export const api = {
  get: (path) => request(path),

  post: (path, body) => request(path, { method: "POST", body }),

  patch: (path, body) => request(path, { method: "PATCH", body }),
};