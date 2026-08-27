// Dados dos 12 Flashcards Completos
const allCards = [
    // Disco de Newton
    { category: "newton", label: "🌈 Disco de Newton", q: "O que acontece quando o Disco de Newton gira rapidamente?", a: "As cores do espectro visível misturam-se e o disco parece ficar branco (ou cinzento-claro)." },
    { category: "newton", label: "🌈 Disco de Newton", q: "Qual é o principal objetivo do Disco de Newton?", a: "Demonstrar a síntese das cores, provando que a luz branca é a combinação de todas as cores do arco-íris." },
    { category: "newton", label: "🌈 Disco de Newton", q: " Qual instrumento Newton usou para separar a luz branca?", a: "Um prisma, que separava a luz branca em diferentes cores." },
    { category: "newton", label: "🌈 Disco de Newton", q: "Quais são as sete cores principais presentes no disco?", a: "Vermelho, laranja, amarelo, verde, azul, anil (índigo) e violeta." },
    { category: "newton", label: "🌈 Disco de Newton", q: "Que fenómeno ótico explica por que o nosso cérebro funde as cores em movimento?", a: "A persistência retiniana (ou persistência da visão), onde a imagem permanece na retina por uma fração de segundo." },
    
    // Anomalias da Visão
    { category: "vision", label: "👁️ Anomalias da Visão", q: "O que é a Miopia e como afeta a visão?", a: "É a dificuldade em ver objetos distantes com clareza, porque a imagem foca antes da retina. Corrige-se com lentes divergentes." },
    { category: "vision", label: "👁️ Anomalias da Visão", q: "Qual é a diferença principal da Hipermetropia em relação à Miopia?", a: "Na hipermetropia, a dificuldade é focar objetos próximos, pois a imagem forma-se atrás da retina. Corrige-se com lentes convergentes." },
    { category: "vision", label: "👁️ Anomalias da Visão", q: "O que caracteriza o Astigmatismo?", a: "Uma curvatura irregular da córnea ou do cristalino, causando uma visão desfocada tanto de perto como de longe. Corrige-se com lentes cilíndricas." },
    { category: "vision", label: "👁️ Anomalias da Visão", q: "O que é a Presbiopia e quando costuma surgir?", a: "Conhecida como 'vista cansada', é a perda de elasticidade do cristalino que dificulta focar de perto. Surge geralmente após os 40 anos." },
    { category: "vision", label: "👁️ Anomalias da Visão", q: "Como o Daltonismo afeta a perceção visual?", a: "É uma perturbação genética que causa a incapacidade de distinguir certas cores, sendo a confusão entre o verde e o vermelho a mais comum." },

    // Curiosidades do Mundo
    { category: "world", label: "🌍 Curiosidades do Mundo", q: "Qual é o lugar mais seco da Terra onde quase nunca chove?", a: "O Deserto do Atacama, no Chile. Algumas zonas não registam chuva significativa há séculos." },
    { category: "world", label: "🌍 Curiosidades do Mundo", q: "Qual é a única estrutura viva na Terra que pode ser vista do espaço?", a: "A Grande Barreira de Corais na Austrália." },
    { category: "world", label: "🌍 Curiosidades do Mundo", q: "Qual é o time com maior torcida no Brasil?", a: "A maior torcida de futebol no Brasil é o flamengo. " },
    { category: "world", label: "🌍 Curiosidades do Mundo", q: "Quando o cartão amarelo e o vermelho foram implementados no futebol?", a:"O cartão vermelho e o amarelo só começaram a ser usados na Copa do Mundo de 1970, no México. A ideia foi criada para deixar as decisões dos árbitros mais fáceis de entender, especialmente para jogadores que falavam idiomas diferentes."},
    { category: "world", label: "🌍 Curiosidades do Mundo", q: "Quanto uma pessoa pesaria na Lua em comparação com a Terra?", a:"Aproximadamente 1/6 do seu peso na Terra, porque a gravidade da Lua é cerca de 6 vezes menor que a da Terra."}
];

let filteredCards = [...allCards];
let currentIndex = 0;
let currentFontSize = 16; 

function updateCard() {
    const card = filteredCards[currentIndex];
    const cardEl = document.getElementById('card');
    
    cardEl.classList.remove('flipped');
    
    setTimeout(() => {
        document.getElementById('cardTag').innerText = card.label;
        document.getElementById('cardQuestion').innerText = card.q;
        document.getElementById('cardAnswer').innerText = card.a;
        document.getElementById('counter').innerText = `${currentIndex + 1} / ${filteredCards.length}`;
        
        document.getElementById('prevBtn').disabled = currentIndex === 0;
        document.getElementById('nextBtn').disabled = currentIndex === filteredCards.length - 1;
    }, 150);
}

function flipCard() {
    document.getElementById('card').classList.toggle('flipped');
}

function nextCard() {
    if (currentIndex < filteredCards.length - 1) {
        currentIndex++;
        updateCard();
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

function changeCategory() {
    const filterValue = document.getElementById('categoryFilter').value;
    if (filterValue === 'all') {
        filteredCards = [...allCards];
    } else {
        filteredCards = allCards.filter(card => card.category === filterValue);
    }
    currentIndex = 0;
    updateCard();
}

/* ==========================================================
   FUNÇÕES DE ACESSIBILIDADE (FONTE E DALTONISMO)
   ========================================================== */

function changeFontSize(action) {
    if ((action === 1 && currentFontSize < 28) || (action === -1 && currentFontSize > 12)) {
        currentFontSize += action * 2;
        document.body.style.setProperty('--base-font-size', currentFontSize + 'px');
    }
}

function resetFontSize() {
    currentFontSize = 16;
    document.body.style.setProperty('--base-font-size', '16px');
}

function setDaltonism(type) {
    // Remove todas as classes antigas do body
    document.body.classList.remove('daltonism-protan-deuteran', 'daltonism-tritan', 'daltonism-mono');
    
    // Atualiza os botões visuais
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    
    // Aplica a nova classe de cores claras correspondente
    if (type === 'protan-deuteran') {
        document.body.classList.add('daltonism-protan-deuteran');
        document.getElementById('btn-protan').classList.add('active');
    } else if (type === 'tritan') {
        document.body.classList.add('daltonism-tritan');
        document.getElementById('btn-tritan').classList.add('active');
    } else if (type === 'mono') {
        document.body.classList.add('daltonism-mono');
        document.getElementById('btn-mono').classList.add('active');
    } else {
        document.getElementById('btn-normal').classList.add('active');
    }
}

window.onload = updateCard;
