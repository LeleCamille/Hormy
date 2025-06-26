let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

// PAGE- MINHA HORTA
let myPlants = [
    { name: "Tomate Cereja", type: "tomate" },
    { name: "Alface Crespa", type: "alface" }
];

const PlantaDatabase = {
    "tomate": {
        name: "Tomate",
    },
    "beringela": {
        name: "Beringela",
    },
    "alface": {
        name: "Alface",
    },
    "batata": {
        name: "Batata",
    }
};

function ListaPlanta() {
    const HortaBloco = document.getElementById('plant-list');
    if (!HortaBloco) return;

    HortaBloco.innerHTML = '';

    myPlants.forEach(Planta => {
        const PlantaInfo = PlantaDatabase[Planta.type] || {};
        const PlantaCard = document.createElement('div');
        PlantaCard.className = 'Planta-card';
        PlantaCard.innerHTML = `
            <h3>${Planta.name}</h3>
            <p>Tipo: ${PlantaInfo.name || Planta.type}</p>
            <p>Última rega: XXXX</p>
            <p>Próxima rega: XXXX</p>
        `;
        HortaBloco.appendChild(PlantaCard);
    });
}

function BotaoAdicionar() {
    const BotaoAdd = document.getElementById('Botao-Add');
    BotaoAdd.addEventListener('click', function () {
        const NomePlanta = document.getElementById('Nome-Planta').value;
        const TipoPlanta = document.getElementById('Planta-Lista').value;

        const novaPlanta = {
            name: NomePlanta,
            type: TipoPlanta,
        };

        myPlants.push(novaPlanta);
        ListaPlanta();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    ListaPlanta();
    BotaoAdicionar();
});

const regas = {
    '2023-05-15': ['Tomate', 'Alface'],
    '2023-05-20': ['Beringela']
}

//PAGE- DIARIO
document.addEventListener('DOMContentLoaded', function () {
    criarCalendario(mesAtual, anoAtual);

    document.getElementById('mes-anterior').addEventListener('click', function () {
        mesAtual--;
        if (mesAtual < 0) {
            mesAtual = 11;
            anoAtual--;
        }
        criarCalendario(mesAtual, anoAtual);
    });

    document.getElementById('proximo-mes').addEventListener('click', function () {
        mesAtual++;
        if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
        }
        criarCalendario(mesAtual, anoAtual);
    });
});


function atualizarNomeMes(mes, ano) {
    document.getElementById('mes-atual').textContent =
        ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][mes] + " " + ano;
}

function criarCalendario(mes, ano) {
    atualizarNomeMes(mes, ano);
    const grade = document.getElementById('grade-calendario');
    grade.innerHTML = '';
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const data = new Date(ano, mes, dia);
        const dataString = data.toISOString().split('T')[0];
        const diaElemento = document.createElement('div');
        diaElemento.className = 'dia-calendario';

        diaElemento.innerHTML = `
            <div class="numero-dia">${dia}</div>
            ${regas[dataString] ? `<div class="indicador-rega">${regas[dataString].length}</div>` : ''}
        `;

        grade.appendChild(diaElemento);
    }
}