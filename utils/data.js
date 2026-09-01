function obterSemanaAtual(data = new Date()) {
  const ano = data.getFullYear();

  const primeiroDiaDoAno = new Date(ano, 0, 1);
  const diasPassados = Math.floor((data - primeiroDiaDoAno) / (1000 * 60 * 60 * 24));
  const numeroSemana = Math.ceil((diasPassados + primeiroDiaDoAno.getDay() + 1) / 7);

  return `${ano}-${numeroSemana}`;
}

function saoSemanasConsecutivas(semanaAnterior, semanaAtual) {
  const [anoAnt, numAnt] = semanaAnterior.split('-').map(Number);
  const [anoAtu, numAtu] = semanaAtual.split('-').map(Number);

  if (anoAnt === anoAtu && numAtu === numAnt + 1) return true;
  if (anoAtu === anoAnt + 1 && numAtu === 1 && numAnt >= 52) return true;

  return false;
}

module.exports = { obterSemanaAtual, saoSemanasConsecutivas };