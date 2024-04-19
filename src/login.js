const credencialesValidas = {
    usuario: 'usuario_demo',
    correo: 'demo@example.com',
    password: 'password123'
};

const users = [
    {
        usuario: 'admin',
        correo: 'admin@example.com',
        password: 'admin'
    }
];

function login() {
    let usuario = document.getElementById("usuario").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;

    if (verificarCredenciales(usuario, correo, password)) {
        window.location.href = "principal.html";
    } else {
        alert("Credenciales inválidas. Inténtalo de nuevo.");
    }
}

function verificarCredenciales(usuario, correo, password) {
    return (
        usuario === credencialesValidas.usuario &&
        correo === credencialesValidas.correo &&
        password === credencialesValidas.password
    );
}

function verificarUser(usuario, correo, password) {
    const user = users.find((user) => user.usuario ==usuario && user.usuario == correo && user.password == password);
    return (
        usuario === credencialesValidas.usuario &&
        correo === credencialesValidas.correo &&
        password === credencialesValidas.password
    );
}