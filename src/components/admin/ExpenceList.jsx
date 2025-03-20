// import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export const HordingList = () => {
    const columns =[
        {field:"_id",headerName:"ID",width:90},
        {field:"expenceDate",headerName:"Expence Date",width:150},
        {field:"expenceCategory",headerName:"Expence Category",width:150},
        {field:"expenceDescription",headerName:"Expence Description",width:150},
        {field:"expenceAmount",headerName:"Expence Amount",width:150},
        {field:"expencePaymentMethod",headerName:"Expence Payment Method",width:150},
        {field:"expenceStatus",headerName:"Expence Status",width:150},
    ]
    const [expences, setexpences] = useState([])

    const getAllExpences = async()=>{

        const res = await axios.get("/expence/all")
        setexpences(res.data.data)


    }
    useEffect(() => {
      
    
      getAllExpences()
    }, [])

  return (
    <div style={{ textAlign: "center" }}>
      <DataGrid
        rows={expences}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      ></DataGrid>
    </div>
  );
};