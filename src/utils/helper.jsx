import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export const getInitials = (name)=>{
    if(!name) return ""

    const words = name.split("");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
}


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";


  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};



export const prepareExpenseBarChartData =(data=[])=>{
    const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date))
    const chartData = sortedData.map((item)=>({
        category: item?.category,
        amount:item?.amount
    }))

    return chartData
}

/*export const prepareIncomeBarChartData = (data =[]) =>{
    const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item)=>({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source
    }));

    return chartData
}*/

export const prepareIncomeBarChartData = (data = []) => {
    // Group by date
    const grouped = {};
    data.forEach(item => {
        const dateKey = moment(item?.date).format("Do MMM");
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                rawDate: item?.date, // keep the raw date for sorting
                income: []
            };
        }
        grouped[dateKey].income.push({
            amount: item?.amount,
            source: item?.source
        });
    });

    // Prepare chart data
    const chartData = Object.entries(grouped).map(([month, { rawDate, income }]) => ({
        month,
        rawDate,
        totalAmount: income.reduce((sum, e) => sum + (e.amount || 0), 0),
        income
    }));

    // Sort by rawDate ascending (earliest to latest)
    chartData.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));

    return chartData;
}


export const prepareExpenseLineChartData = (data = []) => {
    // Group by date
    const grouped = {};
    data.forEach(item => {
        const dateKey = moment(item?.date).format("Do MMM");
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                rawDate: item?.date, // keep the raw date for sorting
                expenses: []
            };
        }
        grouped[dateKey].expenses.push({
            amount: item?.amount,
            category: item?.category
        });
    });

    // Prepare chart data
    const chartData = Object.entries(grouped).map(([month, { rawDate, expenses }]) => ({
        month,
        rawDate,
        totalAmount: expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
        expenses
    }));

    // Sort by rawDate ascending (earliest to latest)
    chartData.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));

    return chartData;
}