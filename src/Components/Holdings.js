import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader/Loader";

const Holdings = () => {
  const [holdingData, setholdingData] = useState();
  const [loading, setLoading] = useState(false);
  const getHoldings = async () => {
    setLoading(true)
    axios
      .get(`/portfolio/holdings`)
      .then((res) => {
        console.log(res.data);
        setholdingData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getHoldings();
    }
  }, []);

  console.log(holdingData);

  return (
    <>
      {loading && <Loader />}
      {!localStorage.getItem("token") ? (
        <h3 className="flex justify-content-center mt-5">
          Please login to view holdings
        </h3>
      ) : (
        <div className="row my-3">
          <h2 className="text-center">Your Holdings</h2>
          {!holdingData || holdingData.status === "fail" ? (
            <p className="text-center">No holdings to display</p>
          ) : (
            <>
              <div className="my-3 md-4">
                <table class="table">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Trading Symbol</th>
                      <th scope="col">Exchange</th>
                      <th scope="col">Isin</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Authorised Date</th>
                      <th scope="col">Average Price</th>
                      <th scope="col">Last Price</th>
                      <th scope="col">Close Price</th>
                      <th scope="col">Pnl</th>
                      <th scope="col">Day Change</th>
                      <th scope="col">Day Change Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdingData?.data.map((list, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{list.tradingsymbol}</td>
                          <td>{list.exchange}</td>
                          <td>{list.isin}</td>
                          <td>{list.quantity}</td>
                          <td>{list.authorised_date}</td>
                          <td>{list.average_price}</td>
                          <td>{list.last_price}</td>
                          <td>{list.close_price}</td>
                          <td>{list.pnl}</td>
                          <td>{list.day_change}</td>
                          <td>{list.day_change_percentage}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <div className="card-body">
                      <h5 className="card-title">
                        Trading Symbol - {list.tradingsymbol}
                      </h5>
                      <p className="card-text">Exchange : {list.exchange}</p>
                      <p className="card-text">Isin : {list.isin}</p>
                      <p className="card-text">Quantity : {list.quantity}</p>
                      <p className="card-text">
                        Authorised Date : {list.authorised_date}
                      </p>
                      <p className="card-text">
                        Average Price : {list.average_price}
                      </p>
                      <p className="card-text">
                        Last Price : {list.last_price}
                      </p>
                      <p className="card-text">
                        Close Price : {list.close_price}
                      </p>
                      <p className="card-text">Pnl : {list.pnl}</p>
                      <p className="card-text">
                        Day Change : {list.day_change}
                      </p>
                      <p className="card-text">
                        Day Change Percentage : {list.day_change_percentage}
                      </p>
                    </div> */}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Holdings;
