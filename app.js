document.getElementById("intelligenceTest").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const resultDiv = document.getElementById("result");
  const dlBtn = document.getElementById("downloadImage");

  // Recoger respuestas marcadas
  const values = [];
  for (let i = 1; i <= 10; i++) {
    const checked = form.querySelector(`input[name="q${i}"]:checked`);
    if (checked) values.push(checked.value);
  }

  // Si todo en blanco → aviso
  if (values.length === 0) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "⚠️ Por favor, responde al menos una pregunta para calcular tu nivel.";
    dlBtn.style.display = "none";
    return;
  }

  // Ponderación determinista: A=3, B=1, C=2 (se normaliza a 1-10 según las respondidas)
  const weights = { A: 3, B: 1, C: 2 };
  const answered = values.length;
  const maxPossible = answered * 3;
  const rawScore = values.reduce((acc, v) => acc + (weights[v] || 0), 0);

  let nivel = Math.round((rawScore / maxPossible) * 10);
  if (nivel < 1) nivel = 1;
  if (nivel > 10) nivel = 10;

  // Categorías según el nivel
  let categoria = "";
  if (nivel <= 4) {
    categoria = "Nivel Bajo";
  } else if (nivel <= 7) {
    categoria = "Nivel Medio";
  } else if (nivel <= 9) {
    categoria = "Nivel Alto";
  } else {
    categoria = "Rasgos de Superdotación";
  }

  // Desglose A/B/C por transparencia del cálculo
  const count = { A: 0, B: 0, C: 0 };
  values.forEach(v => count[v]++);
  const pct = (k) => Math.round((count[k] / answered) * 100);

  // Pintar resultado
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <div id="resultCard" class="result-card">
      <h2>🧮 Nivel de Inteligencia</h2>
      <p style="font-size:24px;margin:.5rem 0;"><strong>${nivel}/10</strong></p>
      <p><strong>Categoría:</strong> ${categoria}</p>
      <p class="small" style="opacity:.8;margin-top:8px;">
        Respondidas: ${answered}/10 · Desglose: A ${count.A} (${pct('A')}%) · B ${count.B} (${pct('B')}%) · C ${pct('C')}%
      </p>
    </div>
  `;

  dlBtn.style.display = "block";
});

// Descarga del resultado como imagen PNG de alta calidad
document.getElementById("downloadImage").addEventListener("click", () => {
  const card = document.getElementById("resultCard");
  if (!card) return;

  html2canvas(card, {
    backgroundColor: "#0f1222",                          // Fondo sólido para evitar transparencias
    scale: window.devicePixelRatio > 1 ? 2 : 1.5,        // Mejor nitidez en móviles y pantallas HiDPI
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    const stamp = new Date().toISOString().replace(/[:.]/g,"-");
    link.download = `nivel-inteligencia-${stamp}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});