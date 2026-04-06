// Smooth scroll para links internos
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

// Validação e envio do formulário
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validar campos
    let isValid = true;
    
    const nome = document.getElementById('nome').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const faturamento = document.getElementById('faturamento').value.trim();
    const dificuldade = document.getElementById('dificuldade').value;
    const email = document.getElementById('email').value.trim();
    
    if (!nome) {
        document.getElementById('nome-error').textContent = 'Nome é obrigatório';
        isValid = false;
    }
    
    if (!empresa) {
        document.getElementById('empresa-error').textContent = 'Nome da empresa é obrigatório';
        isValid = false;
    }
    
    if (!faturamento) {
        document.getElementById('faturamento-error').textContent = 'Faturamento é obrigatório';
        isValid = false;
    } else if (!/^\d+(,\d{1,2})?$/.test(faturamento.replace(/\./g, '').replace(',', '.'))) {
        document.getElementById('faturamento-error').textContent = 'Digite um valor válido (ex: 50000 ou 50.000)';
        isValid = false;
    }
    
    if (!dificuldade) {
        document.getElementById('dificuldade-error').textContent = 'Selecione uma dificuldade';
        isValid = false;
    }
    
    if (!email) {
        document.getElementById('email-error').textContent = 'Email é obrigatório';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Email inválido';
        isValid = false;
    }
    
    if (isValid) {
        // Simular envio (em produção, aqui você enviaria para um backend)
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll suave para mensagem de sucesso
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form após 5 segundos
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// Animação de entrada ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.problem-card, .service-card, .benefit-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito de hover nos botões
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Navbar shrink on scroll (futuro uso)
window.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    if (window.scrollY > 100) {
        document.body.style.background = '#f8fafc';
    } else {
        document.body.style.background = 'transparent';
    }
});