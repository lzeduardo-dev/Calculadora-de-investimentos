import { generateReturnsArray } from "./investmentGoals";

const calculateButton = document.getElementById("calculate-results");

function renderProgression() {

  try {
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

    Swal.fire({
      icon: "success",
      title: "Cálculo realizado com sucesso!",
      text: `Simulação para ${returnsArray.length - 1} meses concluída.`,
      timer: 1500,
      showConfirmButton: false
    });

  }catch (error){
    Swal.fire({
      icon: "error",
      title: "Erro no cálculo",
      text: error.message
    });
  }


  console.log(returnsArray);
}


calculateButton.addEventListener('click', renderProgression);
