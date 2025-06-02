import { generateReturnsArray } from "./investmentGoals";
import { Chart } from "chart.js/auto";

const calculateButton = document.getElementById("calculate-results");
const form = document.getElementById("form");
const clearFormButton = document.getElementById("clearFormButton");
const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");

let doughnutChartReference = {};
let progressionChartReference = {};

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
    doughnutChartReference = {};
    progressionChartReference = {};
  }
}

function renderProgression() {
  resetCharts();
  try {
    const startingAmount = Number(
      document.getElementById("starting-amount").value
    );
    const additionalContribution = Number(
      document.getElementById("additional-contribution").value
    );
    const timeAmount = Number(document.getElementById("time-amount").value);
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

    const finalInvestmentObject = returnsArray[returnsArray.length - 1];
    console.log(finalInvestmentObject);

    doughnutChartReference = new Chart(finalMoneyChart, {
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

    progressionChartReference = new Chart(progressionChart, {
      type: "bar",
      data: {
        labels: returnsArray.map((obj) => obj.month),
        datasets: [
          {
            label: "Total investido",
            data: returnsArray.map((obj) => obj.investedAmount),
            backgroundColor: "rgb(228, 116, 46)",
          },
          {
            label: "Rendimento",
            data: returnsArray.map((obj) => obj.interestReturns),
            backgroundColor: "rgb(24, 72, 128)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true },
          y: { stacked: true },
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
  resetCharts();
}

calculateButton.addEventListener("click", renderProgression);
clearFormButton.addEventListener("click", clearForm);
