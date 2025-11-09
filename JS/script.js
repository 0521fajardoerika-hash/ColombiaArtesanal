// ====================================
// COLOMBIA ARTESANAL - JavaScript
// ====================================

// Funciones de navegación para los botones del header
function crearUsuario() {
    alert('Redirigiendo a crear usuario...');
    // Descomenta la siguiente línea cuando tengas la página de registro
    // window.location.href = 'registro.html';
}

function iniciarSesion() {
    alert('Redirigiendo a iniciar sesión...');
    // Descomenta la siguiente línea cuando tengas la página de login
    // window.location.href = 'login.html';
}

function irInicio() {
    alert('Ya estás en la página de inicio');
    // Descomenta la siguiente línea si necesitas recargar la página
    // window.location.href = 'index.html';
}

// ====================================
// Animaciones al cargar la página
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    // Animación de entrada para las tarjetas de características
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        // Establecer estado inicial (invisible y desplazada)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Animar cada tarjeta con un pequeño retraso
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1)); // Retraso progresivo: 100ms, 200ms, 300ms
    });
    
    // Animación suave para el título de bienvenida
    const title = document.querySelector('.welcome-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.8s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animación para el texto de bienvenida
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
        welcomeText.style.opacity = '0';
        
        setTimeout(() => {
            welcomeText.style.transition = 'opacity 1s ease';
            welcomeText.style.opacity = '1';
        }, 400);
    }
});

// ====================================
// Efecto de scroll suave para enlaces
// ====================================

// Agregar comportamiento de scroll suave a todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// Efecto parallax suave en el scroll
// ====================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    // Agregar sombra al header cuando se hace scroll
    if (scrolled > 50) {
        header.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// ====================================
// Validación básica de formularios (para futuras páginas)
// ====================================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarFormulario(formData) {
    const errores = [];
    
    // Validar email
    if (!formData.email || !validarEmail(formData.email)) {
        errores.push('Por favor ingresa un email válido');
    }
    
    // Validar contraseña
    if (!formData.password || formData.password.length < 6) {
        errores.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    // Validar nombre
    if (!formData.nombre || formData.nombre.trim().length < 2) {
        errores.push('Por favor ingresa un nombre válido');
    }
    
    return {
        valido: errores.length === 0,
        errores: errores
    };
}

// ====================================
// Función para mostrar mensajes al usuario
// ====================================

function mostrarMensaje(mensaje, tipo = 'info') {
    // Crear elemento de mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje-${tipo}`;
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background-color: ${tipo === 'error' ? '#f44336' : '#4CAF50'};
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(mensajeDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        mensajeDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(mensajeDiv);
        }, 300);
    }, 3000);
}

// ====================================
// Manejo de clicks en las tarjetas
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Efecto de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Aquí puedes agregar más funcionalidad
            const title = this.querySelector('.feature-title').textContent;
            console.log(`Click en tarjeta: ${title}`);
        });
    });
});

// ====================================
// Detección de dispositivo móvil
// ====================================

function esMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar comportamiento según el dispositivo
if (esMobile()) {
    console.log('Dispositivo móvil detectado');
    // Aquí puedes agregar comportamiento específico para móviles
} else {
    console.log('Dispositivo de escritorio detectado');
}

// ====================================
// Función para cargar productos (preparada para el futuro)
// ====================================

async function cargarProductos() {
    try {
        // Esta función estará lista cuando tenga una API o base de datos
        // const response = await fetch('api/productos');
        // const productos = await response.json();
        // mostrarProductos(productos);
        
        console.log('Función cargarProductos lista para implementar');
    } catch (error) {
        console.error('Error al cargar productos:', error);
        mostrarMensaje('Error al cargar los productos', 'error');
    }
}

// ====================================
// Prevenir comportamiento por defecto en desarrollo
// ====================================

// Evitar que los enlaces sin href funcional rompan la página
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Enlace clickeado:', this.textContent);
        });
    });
});

// ====================================
// Console log de bienvenida
// ====================================

console.log('%c¡Bienvenido a Colombia Artesanal!', 'color: #d84315; font-size: 20px; font-weight: bold;');
console.log('%cSitio desarrollado con ❤️ para preservar nuestra cultura', 'color: #ff6f3c; font-size: 14px;');