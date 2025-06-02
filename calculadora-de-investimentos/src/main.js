import { generateReturnsArray } from "./investmentGoals";

const calculateButton = document.getElementById("calculate-results");

function renderProgression() {
  const startingAmount = Number(document.getElementById("starting-amount").value);
  const additionalContribution = Number(document.getElementById("additional-contribution").value);
  const timeAmount = Number(document.getElementById("time-amount").value);  // corrigido o id aqui (antes estava "starting-amount" duplicado)
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const returnRate = Number(document.getElementById("return-rate").value);

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}


calculateButton.addEventListener('click', renderProgression);
