import axios from "axios";
//GECKO API CALLS

//retrieve data market data
export const getMarketData = async () => {
    //retrieve
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d")
        return response.data;
        //fail to retrieve data    
    } catch (error) {
        console.log(error.message);
    }
}

//retrieve detailed coin chart data (7 day, hourly chart)
export const getCoinMarketChart = async (coinId) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=%207&interval=hourly`)
        return response.data;
        //fail to retrieve data  
    } catch (error) {
        console.log(error.message)
    }
}