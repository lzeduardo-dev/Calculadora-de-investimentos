function convertToMonthlyReturnRate(yearlyReturnRate) {
    return yearlyReturnRate ** (1 / 12);
  }
  
  export function generateReturnsArray(
    startingAmount = 0,
    timeHorizon = 0,
    timePeriod = "monthly",
    monthlyContribution = 0,
    returnRate = 0,
    returnTimeFrame = "monthly"
  ) {
    if (!timeHorizon || !startingAmount) {
      throw new Error(
        "Starting amount and time period must have positive values."
      );
    }
  
    const finalReturnRate =
      returnTimeFrame === "monthly"
        ? 1 + returnRate / 100
        : convertToMonthlyReturnRate(1 + returnRate / 100);
  
    const finalTimeHorizon = timePeriod === "monthly"
      ? timeHorizon
      : timeHorizon * 12;
  
    const referenceInvestmentObject = {
      investedAmount: startingAmount,
      interestReturns: 0,
      totalInterestReturns: 0,
      month: 0,
      totalAmount: startingAmount,
    };
  
    const returnsArray = [referenceInvestmentObject];
  
    for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++) {
      const previous = returnsArray[timeReference - 1];
  
      const totalAmount =
        previous.totalAmount * finalReturnRate + monthlyContribution;
  
      const interestReturns =
        previous.totalAmount * finalReturnRate - previous.totalAmount;
  
      const investedAmount =
        startingAmount + monthlyContribution * timeReference;
  
      const totalInterestReturns = totalAmount - investedAmount;
  
      returnsArray.push({
        investedAmount: Number(investedAmount.toFixed(2)),
        interestReturns: Number(interestReturns.toFixed(2)),
        totalInterestReturns: Number(totalInterestReturns.toFixed(2)),
        month: timeReference,
        totalAmount: Number(totalAmount.toFixed(2)),
      });
    }
  
    return returnsArray;
  }
  