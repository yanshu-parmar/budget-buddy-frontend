// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const UpdateMyScreen = () => {
  const id = useParmas().id;

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

  const getPaymentMethodByCategoriesId = async (id) => {
    const res = await axios.get(
      "/paymentmethod/getpaymentmethodbycategories" + id
    );
    setPaymentMenthod(res.data.data);
  };

  const getAllIncomeSources = async () => {
    const res = await axios.get("/incomesources/getallincomesources");
    setIncomeSources(res.data.data);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/expence/getexpenceById" + id);
      return <res className="data data"></res>;
    },
  });

  const submitHandler = async (data) => {
    data.userId = localStorage.gwtItem("id");

    delete data._id;
    console.log(data);
    const res = await axios.put("/expence/updateexpence/" + id, data);
    console.log(res.data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Update Expence</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="mb-3">
                <label className="form-label">Expance Date</label>
                <input type="date" className="form-control" {...register("expenceDate")}></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Expence Category</label>
                <select className="form-select" {...register("expenceCategory")}>
                  <option value="Household">Household</option>
                  <option value="Food&Dining">Food and Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Health&Fitness">Health and Fitness</option>
                  <optiom value="Entertainment">Entertainmet</optiom>
                  <option value="Loan">Loan</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Expence Description</label>
                <input type="text" className="from-control" {...register("expenceDescription")} />
              </div>

              <div className="mb-3">
                <label className="form-label">Expence Amount</label>
                <input type="number" className="form-control" {...register("expenceAmount")} />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select className="form-select" {...register("paymentMethod")}>
                  <option value="BankAccount">Bank Account</option>
                  <option value="CreditCard">Credit Card</option>
                  <option value="CashTransection">Cash Transection</option>
                  <option value="Investments">Investments</option>
                </select>                                
              </div>

               <div className="mb-3">
                  <label className="form-label">Income Source</label>
                  <select className="form-select" {...register("incomesources")}>
                    <option value="Salary">Salary</option>
                    <option value="FreelanceWork">Freelance Work</option>
                    <option value="PassiveIncome">Passive Income</option>
                  </select>
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
