
// ---------- SLIDESHOW (index.html) ----------
let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let timer;

// Mostrar slide atual
function showSlide(n) {
  if (slides.length === 0) return;

  if (n >= slides.length) slideIndex = 0;
  else if (n < 0) slideIndex = slides.length - 1;
  else slideIndex = n;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");
}

// Avançar ou recuar slides
function plusSlides(n) {
  showSlide(slideIndex + n);
  resetTimer();
}

// Iniciar slideshow automático
function startSlideshow() {
  showSlide(slideIndex);
  timer = setInterval(() => {
    showSlide(slideIndex + 1);
  }, 4000); // muda a cada 4 segundos
}

// Reinicia o temporizador ao clicar nas setas
function resetTimer() {
  clearInterval(timer);
  startSlideshow();
}

// Inicia quando o DOM está pronto
window.addEventListener("DOMContentLoaded", startSlideshow);


// ---------- FORMULÁRIO DE CADASTRO (cadastrar.html) ----------
const form = document.getElementById("myForm");


if (form) {
  const aviso = document.getElementById("aviso");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;
    let messages = [];

    // ---- Validação de Nome ----
    const nome = document.getElementById("nome").value.trim();
    if (nome.length < 3) {
      valid = false;
      messages.push("O nome deve ter pelo menos 3 caracteres.");
    }

    // ---- Validação de Email ----
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      valid = false;
      messages.push("Introduz um email válido (ex: nome@exemplo.pt).");
    }

    // ---- Validação de Palavra-Passe ----
    const password = document.getElementById("password").value.trim();
    if (password.length < 3) {
      valid = false;
      messages.push("A palavra-passe deve ter pelo menos 3 caracteres.");
    }

    // ---- Mostrar aviso visual Bootstrap ----
    if (!valid) {
      aviso.className = "alert alert-danger mt-3";
      aviso.textContent = messages.join("Error0");
      aviso.classList.remove("d-none");
    } else {
      aviso.className = "alert alert-success mt-3";
      aviso.textContent = "Formulário enviado com sucesso!";
      aviso.classList.remove("d-none");
      form.reset();
      criarUser(email,nome,password);
    }

    // Esconde automaticamente após 5 segundos
    setTimeout(() => aviso.classList.add("d-none"), 5000);
  });
}

 async function criarUser(email,nome,password) {
  const resposta = await fetch('https://68e934d3f2707e6128ce0202.mockapi.io/ipca2_0/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({
      email: email,
      name: nome,
      palavrapasse: password
    })
  });
  const novoUsuario = await resposta.json();
  console.log(novoUsuario);
}

// ---------- LOGIN (login.html) ----------

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("palavra-passe").value;

  // Verifica se os campos estão preenchidos
  if (email && password) {
    // Guarda o estado do utilizador
    localStorage.setItem("user", JSON.stringify({ email: email }));

    // Redireciona para a nova página (index_logout.html)
    window.location.href = "index_logout.html";
  } else {
    alert("Preenche todos os campos antes de entrar.");
  }
});

 function mostrarOcultarSenha() {
    const inputSenha = document.getElementById("palavra-passe");
    const icon = document.getElementById("toggleSenha");

    if (inputSenha.type === "password") {
      inputSenha.type = "text";
      icon.src = "icons/invisivel.png"; // mostra o olho aberto
      icon.alt = "Ocultar senha";
    } else {
      inputSenha.type = "password";
      icon.src = "icons/visivel.png"; // mostra o olho fechado
      icon.alt = "Mostrar senha";
    }
  }

// ---------- OLHO (login.html) ----------

  function mostrarOcultarSenha() {
    const inputSenha = document.getElementById("palavra-passe");
    const icon = document.getElementById("toggleSenha");

    if (inputSenha.type === "password") {
      inputSenha.type = "text";
      icon.src = "icons/invisivel.png"; // mostra o olho aberto
      icon.alt = "Ocultar senha";
    } else {
      inputSenha.type = "password";
      icon.src = "icons/visivel.png"; // mostra o olho fechado
      icon.alt = "Mostrar senha";
    }
  }

  

  // ---------- GESTÃO DO LOGIN / LOGOUT ----------
document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const logoutBtn = document.getElementById("logoutBtn");

  // Se não houver utilizador logado, redireciona para o login
  if (!userData) {
    if (window.location.pathname.includes("index_logout.html")) {
      window.location.href = "login.html";
    }
  }

  // Botão de logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
});