/* 
==================================================
1. VARIÁVEIS DE ESTADO
Controlam o tamanho base do layout, espelhando 
o que foi configurado inicialmente no CSS.
================================================== 
*/
let escalaAtual = 1;     // Escala de 100% para o cartão inteiro
let fonteAtual = 22;     // Tamanho inicial da fonte atualizado para 22px (nova regra de acessibilidade)

/* 
==================================================
2. FUNÇÃO: alterarTamanho
Acionada pelos botões A+ (direcao = 1) e A- (direcao = -1).
Aumenta/diminui a fonte e o cartão de forma proporcional.
================================================== 
*/
function alterarTamanho(direcao) {
  
  // Aumenta ou diminui a escala do cartão em 10% de cada vez
  escalaAtual += direcao * 0.1;
  
  // Aumenta ou diminui o tamanho da fonte em 2 pixels de cada vez
  fonteAtual += direcao * 2;

  // TRAVAS DE SEGURANÇA:
  // Impede que o usuário diminua os elementos até desaparecerem ou quebrarem o layout
  if (escalaAtual < 0.6) {
    escalaAtual = 0.6; // Escala mínima fixada em 60%
  }
  
  if (fonteAtual < 14) {
    fonteAtual = 14; // Fonte mínima fixada em 14px para garantir legibilidade
  }

  // ATUALIZAÇÃO DO CSS EM TEMPO REAL:
  // Injeta os novos valores diretamente nas variáveis do :root do CSS
  document.documentElement.style.setProperty('--escala-cartao', escalaAtual);
  document.documentElement.style.setProperty('--tamanho-fonte', fonteAtual + 'px');
}

/* 
==================================================
3. FUNÇÃO: mudarTema
Acionada pelos botões do painel de cores. Substitui as 
cores padrão pelas paletas acessíveis configuradas no CSS.
================================================== 
*/
function mudarTema(nomeDoTema) {
  
  // Reseta a classe do body para evitar conflitos (ex: não sobrepor dois filtros ao mesmo tempo)
  document.body.className = '';
  
  // Se o usuário clicou em algo diferente de "Padrão", aplica a classe correspondente
  if (nomeDoTema !== 'padrao') {
    document.body.classList.add(nomeDoTema);
  }
}