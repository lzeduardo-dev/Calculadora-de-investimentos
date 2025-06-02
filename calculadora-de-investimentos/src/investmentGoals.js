
function convertToMonthlyReturnRate(annualFactor) {
  // garante que é número e positivo
  if (typeof annualFactor !== "number" || annualFactor <= 0) {
    throw new Error("annualFactor deve ser um número positivo");
  }
  return annualFactor ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  // checagem básica
  if (typeof startingAmount !== "number" || startingAmount <= 0) {
    throw new Error("startingAmount deve ser um número positivo");
  }
  if (typeof timeHorizon !== "number" || timeHorizon <= 0) {
    throw new Error("timeHorizon deve ser um número positivo");
  }
  if (typeof returnRate !== "number") {
    throw new Error("returnRate deve ser um número");
  }
  if (typeof monthlyContribution !== 'number') {
    throw new Error("Additiona lContribution deve ser um número");
  }


  // Ajusta finalReturnRate conforme o retorno ser mensal ou anual
  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMonthlyReturnRate(1 + returnRate / 100);

  // Ajusta o horizonte de tempo para meses
  const finalTimeHorizon = timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  if (!Number.isInteger(finalTimeHorizon) || finalTimeHorizon <= 0) {
    throw new Error("finalTimeHorizon deve ser um inteiro positivo");
  }

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestmentObject];

  for (let month = 1; month <= finalTimeHorizon; month++) {
    const prev = returnsArray[month - 1];

    // Calculo do juros do mês corrente
    const interestEarned = prev.totalAmount * (finalReturnRate - 1);

    // Total acumulado incluindo aporte do mês
    const newTotalAmount = prev.totalAmount * finalReturnRate + monthlyContribution;

    // Total investido até agora
    const newInvestedAmount = startingAmount + monthlyContribution * month;

    const totalInterestReturns = newTotalAmount - newInvestedAmount;

    if ([newTotalAmount, interestEarned, newInvestedAmount, totalInterestReturns].some(v => isNaN(v))) {
      throw new Error(`NaN detectado no mês ${month}`);
    }

    returnsArray.push({
      investedAmount: Number(newInvestedAmount.toFixed(2)),
      interestReturns: Number(interestEarned.toFixed(2)),
      totalInterestReturns: Number(totalInterestReturns.toFixed(2)),
      month: month,
      totalAmount: Number(newTotalAmount.toFixed(2)),
    });
  }

  return returnsArray;
}
