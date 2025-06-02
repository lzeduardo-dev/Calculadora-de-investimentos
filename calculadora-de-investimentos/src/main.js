import { generateReturnsArray } from "./investmentGoals";
import { Chart } from "chart.js/auto";

const calculateButton = document.getElementById("calculate-results");
const form = document.getElementById("form");
const clearFormButton = document.getElementById("clearFormButton");
const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");

function renderProgression() {
  try {
    const startingAmount = Number(
      document.getElementById("starting-amount").value
    );
    const additionalContribution = Number(
      document.getElementById("additional-contribution").value
    );
    const timeAmount = Number(document.getElementById("time-amount").value); // corrigido o id aqui (antes estava "starting-amount" duplicado)
    const timeAmountPeriod =
      document.getElementById("time-amount-period").value;
    const returnRatePeriod = document.getElementById("evaluation-period").value;
    const returnRate = Number(document.getElementById("return-rate").value);
    const taxRate = Number(document.getElementById("tax-rate").value);

    const returnsArray = generateReturnsArray(
      startingAmount,
      timeAmount,
      timeAmountPeriod,
      additionalContribution,
      returnRate,
      returnRatePeriod
    );

    // retorna os dados do ultimo mês.
    const finalInvestmentObject = returnsArray[returnsArray.length - 1];
    console.log(finalInvestmentObject);

    new Chart(finalMoneyChart, {
      type: "doughnut",
      data: {
        labels: ["Total Investido", "Rendimento", "Impostos"],
        datasets: [
          {
            data: [
              finalInvestmentObject.investedAmount,
              finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100),
              finalInvestmentObject.totalInterestReturns * (taxRate / 100),
            ],
            backgroundColor: [
              "rgb(24, 72, 128)",
              "rgb(228, 116, 46)",
              "rgb(53, 163, 31)",
            ],
          },
        ],
      },
      options: {},
    });

    new Chart(progressionChart, {
      type: "bar",
      data: {
        labels: returnsArray.map((investmentObject) => investmentObject.month),
        datasets: [
          {
            label: "Total investido",
            data:returnsArray.map((investmentObject) => investmentObject.investedAmount),
            backgroundColor:"rgb(228, 116, 46)",
          },
          {
            label: "Rendimento",
            data:returnsArray.map((investmentObject) => investmentObject.interestReturns),
            backgroundColor: "rgb(24, 72, 128)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });

    console.log(returnsArray);
  } catch (error) {
    alert(error.message);
  }
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["evaluation-period"].value = "";
  form["tax-rate"].value = "";
  form["return-rate"].value = "";
}

calculateButton.addEventListener("click", renderProgression);
clearFormButton.addEventListener("click", clearForm);
