import axios from "axios";

const stockInstance = axios.create({
  baseURL: "http://api.marketstack.com/v1/",
});

const dbInstance = axios.create({
  baseURL: "https://stock-traders-9ed14.firebaseio.com/",
});

const eodDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let dd = yesterday.getDate();
  let mm = yesterday.getMonth() + 1; //January is 0!
  const yyyy = yesterday.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
};

const today = eodDate();

export function getStocks(stocks, token) {
  return new Promise((resolve, reject) => {
    dbInstance.get("/eodData/today.json?auth=" + token).then(res => {
      console.log("1: ", stocks);
      if (res.data === today) {
        console.log("2: ", stocks);
        dbInstance.get("/eodData/stocks.json?auth=" + token).then(res => {
          console.log("3: ", stocks);
          if (res.data) {
            console.log(res.data);
            const data = res.data;
            // for (const stock in data) {
            //   stocks.push({
            //     id: stock,
            //     name: data[stock].name,
            //     price: data[stock].price,
            //   });
            // }
            stocks = data;
            console.log("4: ", stocks);
            resolve(stocks);
          } else {
            reject("Error");
          }
        });
      } else {
        stockInstance
          .get(
            `eod/latest?access_key=e1abe4c62d08f08ccf2d78af4ec6f86a&symbols=AAPL,AMZN,GOOGL,FB,INTC,ADBE,CSCO,NVDA,NFLX`
          )
          .then(res => {
            if (res.data) {
              const data = res.data.data;
              for (const stock in data) {
                stocks.push({
                  id: stock,
                  name: data[stock].symbol,
                  price: data[stock].close,
                });
              }
              const eodData = { today, stocks };
              dbInstance.put("/eodData.json?auth=" + token, eodData);
              resolve(stocks);
            } else {
              reject("Error");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  });
}
