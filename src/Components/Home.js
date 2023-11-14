import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "./Loader/Loader";
import moment from 'moment';
import {
  Typography,
} from "@mui/material";

const Home = () => {
  const [data, setData] = useState([]);
  const [fromDate, setfromDate] = useState("2017-01-02");
  const [toDate, settoDate] = useState("2021-12-31");
  const [n50Data, setN50Data] = useState();
  const [nbData, setNbData] = useState();
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const updateSize = () => setSize(window.innerWidth);
  useEffect(() => (window.onresize = updateSize), []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setN50Data(data.filter((e) => e.instrument_name === "NIFTY 50"));
    setNbData(data.filter((e) => e.instrument_name === "NIFTY BANK"));
  }, [data]);

  const getData = async () => {
    setLoading(true)
    axios
      .get(`/data/historical_price_data/?from_date=${fromDate}&to_date=${toDate}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  const onChangeFromDate = ({ target }) => {
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setfromDate(newDate);
    // console.log(newDate, "from");
  };

  const onChangeToDate = ({ target }) => {
    const newDate = moment(target.value).format('YYYY-MM-DD');
    settoDate(newDate);
    // console.log(newDate, "to"); 
  };

  const handleData = async () => {
    getData();
  };
  return (
    <>
      {loading && <Loader />}
      {data == [] && <Loader />}
      {n50Data && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "6vh",
            margin: "15px 0px",
          }}
        >
          <Typography variant="h4">Historical Price Data</Typography>
          <Chart
            options={{
              chart: {
                id: "apexchart-example",
              },
              xaxis: {
                categories: n50Data.map((object) => object.date),
                labels: {
                  show: true,
                  rotate: -45,
                  rotateAlways: false,
                  hideOverlappingLabels: true,
                  showDuplicates: false,
                  trim: true,
                  minHeight: undefined,
                  maxHeight: 80,
                  style: {
                    colors: [],
                    fontSize: "12px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    cssClass: "apexcharts-xaxis-label",
                  },
                },
                title: {
                  text: "Time",
                },
              },
              yaxis: {
                title: {
                  text: "Price",
                },
              },
              legend: {
                position: "bottom",
                horizontalAlign: "left",
                floating: true,
                offsetY: -4,
                offsetX: -5,
              },
              stroke: {
                show: true,
                curve: "smooth",
                lineCap: "butt",
                colors: undefined,
                width: 1.5,
                dashArray: 0,
              },
            }}
            series={[
              {
                name: "NIFTY 50",
                data: n50Data.map((object) => object.price),
              },
              {
                name: "NIFTY BANK",
                data: nbData.map((object) => object.price),
              },
            ]}
            type="line"
            width={size - (size * 28) / 100}
            height={400}
          />

          <div class="container  min-vh-30 py-2 column align-items-center justify-content-center">
            <h5 class="row justify-content-center mb-2">
              Select Time Interval (between 2017-01-02 - 2021-12-31)
            </h5>
            <div class="row justify-content-center align-items-end gap-2">
              <div class="col-lg-3 col-sm-6">
                <label for="startDate">Start</label>
                <input
                  id="startDate"
                  class="form-control"
                  type="date"
                  value={fromDate}
                  onChange={onChangeFromDate}
                />
                <span id="startDateSelected"></span>
              </div>
              <div class="col-lg-3 col-sm-6">
                <label for="endDate">End</label>
                <input
                  id="endDate"
                  class="form-control"
                  type="date"
                  value={toDate}
                  onChange={onChangeToDate}
                />
                <span id="endDateSelected"></span>
              </div>
              <button
                onClick={handleData}
                className="btn btn-dark col-lg-3 col-sm-6"
              >
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
