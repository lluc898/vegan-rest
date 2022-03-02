if('serviceWorker' in navigator) {
    navigator.serviceWorker.register(new URL('./sw.js', import.meta.url))
    .then(reg=> console.log('Registro SW exitoso', reg))
    .catch(err=> console.warn("Error en registro SW", err));
}