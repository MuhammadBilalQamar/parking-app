import React, { useEffect, useState } from "react";

// MUI COMPONENTS IMPORTS
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Navbar } from "components";
import axios from "../../../services/axios";
import _ from "lodash";

// MUI CUSTOM TABLE CELL STYLING
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "Black",
    color: "White",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// MUI CUSTOM TABLE ROW STYLING
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewBookings() {
  const [rows, setRows] = useState([]);
  const path = window.location.pathname;
  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = () => {
    axios
      .get("/booking/user")
      .then((response) => {
        console.log("Success:", response.data);
        if (response.data.length > 0) {
          response.data.forEach((booking) => {
            const timeFrom = new Date(
              `${booking.date_from} ${booking.time_from}`
            ).getTime();
            const timeTo = new Date(
              `${booking.date_to} ${booking.time_to}`
            ).getTime();
            const durationInMinutes = _.round(
              _.divide(_.subtract(timeTo, timeFrom), 60000),
              2
            );
            const durationInHours = _.floor(durationInMinutes / 60);
            const remainingMinutes = _.round(durationInMinutes % 60);
            booking.duration = `${durationInHours} hrs ${remainingMinutes} mins`;
          });
          setRows(response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("rows", rows);

  // RENDER COMPONENT
  return (
    <>
      {path === "/view-bookings" && <Navbar />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, marginTop: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Area</StyledTableCell>
              <StyledTableCell align="right">Spot</StyledTableCell>
              <StyledTableCell align="right">Start Date</StyledTableCell>
              <StyledTableCell align="right">End Date</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
              <StyledTableCell align="right">End Time</StyledTableCell>
              <StyledTableCell align="right">Duration</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* DYNAMIC ROW MAPPING */}
            {rows.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.area}
                </TableCell>
                <TableCell align="right">{row.spot}</TableCell>
                <TableCell align="right">{row.date_from}</TableCell>
                <TableCell align="right">{row.date_to}</TableCell>
                <TableCell align="right">{row.time_from}</TableCell>
                <TableCell align="right">{row.time_to}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length === 0 && <span>No records found</span>}
    </>
  );
}
