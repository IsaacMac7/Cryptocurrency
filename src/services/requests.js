import axios from "axios";
import moment from "moment";

//formatting of data into x and y
const formatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item,
        }
    })

    return formattedSparkline;
}

//formatting of data
const formatMarketData = (data) => {
    let formattedData = [];

    data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }

        formattedData.push(formattedItem);
    });

    return formattedData;
}


//retrieve data
export const getMarketData = async () => {

    //coin gecko api call
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d")
        const data = response.data;
        const formattedResponse = formatMarketData(data)
        return formattedResponse;

    //fail to retrieve data    
    } catch (error) {
        console.log(error.message);
    }
}

// export  const getCoinData = async (coinId) => {
//     try {
//         const response =  await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`)
//         return response.data;
//     } catch (error) {
//         console.log(error.message)
//     }
// }