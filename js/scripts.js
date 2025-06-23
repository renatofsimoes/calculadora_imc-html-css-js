// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

//Seleção de elementos
const imcTable = document.querySelector(".imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const imcNumber = document.querySelector(".result h1 span");
const imcInfo = document.querySelector(".result h3 span");
const returnBtn = document.querySelector("#return-btn");
const formContainer = document.querySelector(".form-container");
const resultContainer = document.querySelector(".result-container");

//Funções
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

function calcIMC(height, weight) {
  return (weight / (height * height)).toFixed(1); //toFixed arredonda o valor para uma casa decimal
}

function showOrHideResults() {
  formContainer.classList.toggle("hide"); //com toggle, se tiver hide nas classes tira, se não tiver coloca
  resultContainer.classList.toggle("hide");
}

//Inicialização
createTable(data);

//Eventos
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

heightInput.addEventListener("keydown", function (e) {
  if (["e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
  }
});
weightInput.addEventListener("keydown", function (e) {
  if (["e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
  }
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  if (!weight || !height) {
    return;
  }
  imc = calcIMC(height, weight);

  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) {
    return;
  }

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("normal");
      imcInfo.classList.add("normal");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("above");
      imcInfo.classList.add("above");
      break;
    case "Obesidade":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("very-high");
      imcInfo.classList.add("very-high");
      break;
  }

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  showOrHideResults();
});

returnBtn.addEventListener("click", () => {
  cleanInputs();
  showOrHideResults();
});
