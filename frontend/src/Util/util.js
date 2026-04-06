import moment from "moment";

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const numStr = num.toString();
  const parts = numStr.split(".");
  let integerPart = parts[0];
  let fractionalPart = parts[1];
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== "") {
    integerPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    integerPart = lastThree;
  }
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export const prepareIncomeLineChartData = (data = []) => {
  const groupedByDate = data.reduce((acc, item) => {
    const dateKey = item.date;
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, totalAmount: 0, items: [], userNames: new Set() };
    }
    acc[dateKey].totalAmount += Number(item.amount);
    acc[dateKey].items.push(item);
    if (item.profileName) acc[dateKey].userNames.add(item.profileName);
    return acc;
  }, {});

  let chartData = Object.values(groupedByDate);
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
  chartData = chartData.map((dataPoint) => ({
    ...dataPoint,
    month: moment(dataPoint.date).format("Do MMM"),
    userName: [...dataPoint.userNames].join(", "),
    userNames: undefined,
  }));
  return chartData;
};