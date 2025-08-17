document.getElementById("intelligenceTest").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const resultDiv = document.getElementById("result");
  const values = [];

  for (let i = 1; i <= 10; i++) {
    const checked = form.querySelector(`input[name="q${i}"]:checked`);
    if (checked) values.push(checked.value);
  }

  if (values.length === 0) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "⚠️ Por favor, responde al menos una pregunta para analizar tu perfil.";
    return;
  }

  // Conteo por letra
  const count = { A: 0, B: 0, C: 0 };
  values.forEach(v => count[v]++);

  // Cálculo de perfil
  let nivel = 0;
  let tipo = "";
  let descripcion = "";

  if (count.C >= 5) {
    tipo = "Creativo Visionario (Perfil C)";
    nivel = 9 + Math.floor(Math.random() * 2);
    descripcion = "Tienes una mente original, con fuerte pensamiento divergente, capaz de ver soluciones donde otros solo ven problemas. Rasgos típicos de alta inteligencia creativa.";
  } else if (count.A >= 5) {
    tipo = "Lógico Estratégico (Perfil A)";
    nivel = 8 + Math.floor(Math.random() * 2);
    descripcion = "Tu pensamiento estructurado, analítico y orientado al conocimiento revela signos de superdotación cognitiva racional.";
  } else if (count.B >= 5) {
    tipo = "Emocional Intuitivo (Perfil B)";
    nivel = 7 + Math.floor(Math.random() * 3);
    descripcion = "Alta inteligencia emocional e introspectiva, rasgo poco común que indica profundidad psicológica y madurez reflexiva.";
  } else {
    tipo = "Híbrido Flexible";
    nivel = 6 + Math.floor(Math.random() * 4);
    descripcion = "Tienes un perfil variado, capaz de combinar creatividad, lógica e intuición según el contexto. Alta adaptabilidad y versatilidad mental.";
  }

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h2>🧠 Resultado del Test</h2>
    <p><strong>Perfil:</strong> ${tipo}</p>
    <p><strong>Nivel de Inteligencia:</strong> ${nivel}/10</p>
    <p>${descripcion}</p>
  `;
});