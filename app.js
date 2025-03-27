let usuarios = [];
let mostrarContraseñas = false;

function generarContraseña() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
    let contraseña = "";
    let mayuscula = false, minuscula = false, numero = false, especial = false;

    while (contraseña.length < 16) {
        let caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        contraseña += caracterAleatorio;

        if (/[A-Z]/.test(caracterAleatorio)) mayuscula = true;
        if (/[a-z]/.test(caracterAleatorio)) minuscula = true;
        if (/\d/.test(caracterAleatorio)) numero = true;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(caracterAleatorio)) especial = true;
    }

    if (mayuscula && minuscula && numero && especial) {
        return contraseña;
    } else {
        return generarContraseña();
    }
}

function registrarUsuario() {
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const curp = document.getElementById("curp").value.trim();

    if (!nombre || !edad || !curp) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const contraseña = generarContraseña();

    const usuario = { nombre, edad, curp, contraseña };
    usuarios.push(usuario);

    document.getElementById("registroForm").reset();

    let continuar = confirm("Usuario agregado correctamente. ¿Desea agregar otro?");
    if (!continuar) {
        document.getElementById("tablaUsuarios").style.display = "block";
        mostrarUsuarios();
    }
}

function mostrarUsuarios() {
    const tableBody = document.querySelector("#usuariosTable tbody");
    tableBody.innerHTML = "";

    usuarios.forEach((usuario, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = usuario.nombre;
        row.insertCell(1).textContent = usuario.edad;
        row.insertCell(2).textContent = usuario.curp;

        let cellPass = row.insertCell(3);
        let passSpan = document.createElement("span");
        passSpan.textContent = mostrarContraseñas ? usuario.contraseña : "●●●●●●●●●●●●●●●●";
        passSpan.className = mostrarContraseñas ? "" : "hidden-password";
        passSpan.id = `pass-${index}`;
        cellPass.appendChild(passSpan);
    });

    console.clear();
    console.table(usuarios);
}

function togglePasswords() {
    mostrarContraseñas = !mostrarContraseñas;
    document.querySelectorAll("td:nth-child(4) span").forEach((span, index) => {
        span.textContent = mostrarContraseñas ? usuarios[index].contraseña : "●●●●●●●●●●●●●●●●";
        span.className = mostrarContraseñas ? "" : "hidden-password";
    });
}