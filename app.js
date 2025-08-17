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
    document.getElementById("downloadImage").style.display = "none";
    return;
  }

  const count = { A: 0, B: 0, C: 0 };
  values.forEach(v => count[v]++);

  let nivel = 0;
  let tipo = "";
  let descripcion = "";

  if (count.C >= 5) {
    tipo = "Creativo Visionario";
    nivel = 9 + Math.floor(Math.random() * 2);
    descripcion = "Tienes una mente original, con fuerte pensamiento divergente. Eres capaz de ver soluciones donde otros solo ven problemas.";
  } else if (count.A >= 5) {
    tipo = "Lógico Estratégico";
    nivel = 8 + Math.floor(Math.random() * 2);
    descripcion = "Tu pensamiento estructurado y orientado al conocimiento revela signos de superdotación cognitiva racional.";
  } else if (count.B >= 5) {
    tipo = "Emocional Intuitivo";
    nivel = 7 + Math.floor(Math.random() * 3);
    descripcion = "Alta inteligencia emocional y profundidad psicológica. Tienes gran capacidad de conexión personal y reflexión.";
  } else {
    tipo = "Híbrido Flexible";
    nivel = 6 + Math.floor(Math.random() * 4);
    descripcion = "Tienes un perfil versátil, capaz de combinar lógica, intuición y creatividad según la situación. Eres muy adaptable.";
  }

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <div id="resultCard" class="result-card">
      <h2>🧠 Resultado del Test</h2>
      <p><strong>Perfil:</strong> ${tipo}</p>
      <p><strong>Nivel de Inteligencia:</strong> ${nivel}/10</p>
      <p><strong>Análisis:</strong> ${descripcion}</p>
    </div>
  `;

  document.getElementById("downloadImage").style.display = "block";
});

document.getElementById("downloadImage").addEventListener("click", () => {
  const card = document.getElementById("resultCard");
  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.download = "resultado_test_inteligencia.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});