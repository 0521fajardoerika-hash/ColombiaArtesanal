// ====================================
// INICIO DE SESIÓN
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    // Event listener para el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpiar mensajes de error previos
        limpiarErrores();
        
        // Intentar iniciar sesión
        iniciarSesion();
    });
    
    // Validación en tiempo real
    agregarValidacionTiempoReal();
});

// ====================================
// Función principal de login
// ====================================

function iniciarSesion() {
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar campos
    if (!validarEmail(correo)) {
        mostrarError('correo', 'Ingresa un correo electrónico válido');
        return;
    }
    
    if (password.length < 6) {
        mostrarError('password', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Buscar usuario
    const usuario = usuarios.find(u => u.correo === correo && u.password === password);
    
    if (usuario) {
        // Login exitoso
        loginExitoso(usuario);
    } else {
        // Credenciales incorrectas
        mostrarErrorGeneral('Correo o contraseña incorrectos');
    }
}

// ====================================
// Login exitoso
// ====================================

function loginExitoso(usuario) {
    // Guardar sesión actual
    sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
    sessionStorage.setItem('sesionActiva', 'true');
    
    // Mostrar mensaje de éxito
    mostrarMensajeExito(usuario.nombres);
}

// ====================================
// Mensaje de éxito
// ====================================

function mostrarMensajeExito(nombre) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    // Crear mensaje
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        background: white;
        padding: 50px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 0.5s ease;
    `;
    
    mensaje.innerHTML = `
        <div style="font-size: 80px; margin-bottom: 20px;">✅</div>
        <h2 style="color: #4CAF50; margin-bottom: 15px;">¡Bienvenido ${nombre}!</h2>
        <p style="color: #666; margin-bottom: 30px;">Has iniciado sesión correctamente</p>
        <div style="
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #ff6f3c;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        "></div>
    `;
    
    // Agregar estilo de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    overlay.appendChild(mensaje);
    document.body.appendChild(overlay);
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
        window.location.href = 'dashboard.html'; // O 'index.html' si no tienes dashboard
    }, 2000);
}

// ====================================
// Validaciones
// ====================================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ====================================
// Validación en tiempo real
// ====================================

function agregarValidacionTiempoReal() {
    const correoInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');
    
    correoInput.addEventListener('blur', function() {
        if (this.value.trim() && !validarEmail(this.value.trim())) {
            this.classList.add('error');
            mostrarError('correo', 'Correo electrónico inválido');
        } else {
            this.classList.remove('error');
            ocultarError('correo');
        }
    });
    
    correoInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            ocultarError('correo');
        }
        ocultarErrorGeneral();
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            ocultarError('password');
        }
        ocultarErrorGeneral();
    });
}

// ====================================
// Manejo de errores
// ====================================

function mostrarError(campo, mensaje) {
    const errorElement = document.getElementById(`error-${campo}`);
    const inputElement = document.getElementById(campo);
    
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.classList.add('active');
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function ocultarError(campo) {
    const errorElement = document.getElementById(`error-${campo}`);
    if (errorElement) {
        errorElement.classList.remove('active');
    }
}

function limpiarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(error => error.classList.remove('active'));
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error'));
    
    ocultarErrorGeneral();
}

function mostrarErrorGeneral(mensaje) {
    // Verificar si ya existe un alert
    let alertDiv = document.querySelector('.alert-error');
    
    if (!alertDiv) {
        // Crear nuevo alert
        alertDiv = document.createElement('div');
        alertDiv.className = 'alert-error';
        
        // Insertar antes del formulario
        const form = document.getElementById('loginForm');
        form.parentNode.insertBefore(alertDiv, form);
    }
    
    alertDiv.textContent = mensaje;
    alertDiv.classList.add('active');
    
    // Agregar clase de error a los inputs
    document.getElementById('correo').classList.add('error');
    document.getElementById('password').classList.add('error');
}

function ocultarErrorGeneral() {
    const alertDiv = document.querySelector('.alert-error');
    if (alertDiv) {
        alertDiv.classList.remove('active');
    }
}

// ====================================
// Recuperar contraseña
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const forgotLink = document.querySelector('.forgot-password .link');
    
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const correo = prompt('Ingresa tu correo electrónico para recuperar tu contraseña:');
            
            if (correo && validarEmail(correo)) {
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                const usuario = usuarios.find(u => u.correo === correo);
                
                if (usuario) {
                    alert(`Tu contraseña es: ${usuario.password}\n\n(En producción, esto se enviaría por correo)`);
                } else {
                    alert('No existe una cuenta con ese correo electrónico');
                }
            } else if (correo) {
                alert('Por favor ingresa un correo válido');
            }
        });
    }
});

// ====================================
// Console log
// ====================================

console.log('%c🔐 Página de Login Cargada', 'color: #ff6f3c; font-size: 16px; font-weight: bold;');