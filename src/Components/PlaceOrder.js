import React from "react";
import { useState } from "react";
import Loader from "./Loader/Loader";
import data from "./data";
import axios from "axios";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

const PlaceOrder = () => {
  const [data1, setData1] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      user: localStorage.getItem("user_id"),
      quantity: quantity,
      tradingsymbol: data1.symbol,
      exchange: data1.identifier,
      isin: "",
      authorised_date: data1.lastUpdateTime,
      average_price: data1.open,
      last_price: data1.lastPrice,
      close_price: data1.previousClose,
      pnl: data1.perChange30d,
      day_change: data1.change,
      day_change_percentage: data1.pChange,
    };

    try {
      const response = await axios.post("/order/place_order", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 201) {
        message.success("Your Order Placed Successfully");
        setLoading(false);
      }
      setLoading(false);
      setQuantity();
      setShow(false)
    } catch (err) {
      setLoading(false);
      const data = err?.response;
      console.log("register Error:", data);
      message.error(data?.data.message);
      setLoading(false);
      setQuantity();
      setShow(false)
    }
  };

  const onChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleClick = (list) => {
    if (localStorage.getItem("token")) {
      console.log(list);
      setData1(list);
      setShow(true)
    } else {
      message.info("Please Login to Place Order");
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", margin: "20px 10px" }}>Buy Stocks</h3>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {data?.map((list, index) => {
          return (
            <div className="col" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">{list.identifier}</h5>
                  <ul className="list-group">
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Trading Symbol - {list.symbol}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Authorised Date - {list.lastUpdateTime}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Average Price - {list.open}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Last Price - {list.lastPrice}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Close Price - {list.previousClose}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Pnl - {list.perChange30d}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Day Change- {list.change}
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Day Change Percentage - {list.pChange}
                    </li>
                  </ul>
                  <button
                    onClick={() => handleClick(list)}
                    className="btn btn-primary w-100 mt-2"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}{" "}
      </div>


      <Modal
        show={show} onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{data1.identifier}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            onChange={onChange}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button type="button" onClick={handleSubmit} class="btn btn-primary">
            {loading ? <CircularProgress color="inherit" size={20} /> : "Buy"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PlaceOrder;
