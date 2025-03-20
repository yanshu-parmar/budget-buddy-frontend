// import React from 'react'

import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

export const ViewMyEpence = () => {

    const [expences, setexpences] = useState([])
    const [isLoading, setisLoading] = useState([])
    const getAllMyExpences = async() => {
        setisLoading(true)
        const res = await axios.get("/expence/getExpencesbyuserid/" + localStorage.getItem("id"))
        console.log(res.data)
        setexpences(res.data.data)
        setisLoading(false)
    }

    useEffect(() => {
        getAllMyExpences()
    }, [])

  return (
    <div style={{textAlign:"center"}}>
        {/* {
            isLoading && <CustomLoader />
        } */}
        My Expences
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>expenceDate</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    expences?.map((sc) => {
                        return <tr>
                            <td>{sc.expenceDate}</td>
                            <td>
                                <Link to={"/agency/updateExpence/${sc._id}"} className="btn btn-info">UPDATE</Link>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
