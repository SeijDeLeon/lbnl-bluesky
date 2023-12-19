import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable( {metadata, title} ) {
  function createData(name, description) {
    return { name, description };
  }
  var rows = [];
  for (const key in metadata) {
    if (typeof metadata[key] === "object") {
      rows.push(createData(key, JSON.stringify(metadata[key])));
      continue;
    }
    if (key === "time") {
      const myDate = new Date(metadata[key] * 1000);
      rows.push(createData(key, myDate.toISOString()));
    } else {
      rows.push(createData(key, String(metadata[key])));
    }
  }


  return (
    <div className="py-8">
      <h2 className="text-left">{title}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Description</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}