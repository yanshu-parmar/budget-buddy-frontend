// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddScreen2 = () => {

    const [categories, setCategories] = useState([]);
    const [paymentMethod, setPaymentMenthod] = useState([]);
    const [incomeSources, setIncomeSources] = useState([]);

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        const res = await axios.get("/category/getallcategories");
        setCategories(res.data.data);
    };

    const getPaymentMethodByCategorisId = async (id) => {
        const res =await axios.get("/paymentmethod/getpaymentmethodbycategories" + id);
        setPaymentMenthod(res.data.data);
    };

    const getAllIncomeSources = async () => {
      const res = await axios.get("/incomesources/getallincomesources");
      setIncomeSources(res.data.data);
    };

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const submitHandler = async (data) => {
      data.userId = localStorage.getItem("id");
      console.log(data);
      // console.log(data)

      const formData = new FormData();
      formData.append("expenceDate",data.expenceDate);
      formData.append("expenceCategory",data.expenceCategory);
      formData.append("expenceDescription",data.expenceDescription);
      formData.append("expenceAmount",data.expenceAmount);
      formData.append("expencePaymentMethod",data.expencePaymentMethod);
      formData.append("expenceStatus",data.expenceStatus);

      const res = await axios.post("/expence/addWithFile", formData);
      console.log(res);
      console.log(res.data);

      navigate("/agency/myscreens")
    };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add Screen</h2>
            <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Expence Date</label>
              <input type="date" className="form-control" {...register("expenceDate")} />
            </div>

            <div className="mb-3">
              <label className="form-label">Expence Category</label>
              <select className="form-select" {...register("expenceCategory")}>
                <option value="Household">Household</option>
                <option value="Food&Dining">Food and Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Health&Fitness">Health and Fitness</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Enducation</option>
                <option value="Loan">Loan</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Expence Description</label>
              <input type="text" className="form-control" {...register("expenceDescription")} />
            </div>

            <div className="mb-3">
              <label className="form-label">Expence Amount</label>
              <input type="number" className="form-control" {...register("expenceAmount")} />
            </div>

            <div className="mb-3">
              <label className="form-label">Expence Payment Method</label>
              <input type="text" className="form-control" {...register("expencePaymentMethod")} />
            </div>

            <div className="mb-3">
              <label className="form-label">Expence Status</label>
              <input type="text" className="form-control" {...register("expenceStatus")} />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
