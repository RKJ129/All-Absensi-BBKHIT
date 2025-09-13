// react-bootstrap
import MainCard from 'components/Card/MainCard';
import { Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TablePaginationActions } from '../rekap';
import PropTypes from 'prop-types';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

// -----------------------|| SAMPLE ||-----------------------//

export default function ManageAdmin() {
  return (
    <Row>
      <Col sm={12}>
        <MainCard title="Manajemen Admin">
          <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '1rem' }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="search" placeholder="Cari pengguna" onChange={(e) => setSearch(e.target.value)} />
            </Form.Group>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='users table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold' }}>Nama</TableCell>
                  <TableCell style={{fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell style={{fontWeight: 'bold' }}>Satpel</TableCell>
                  <TableCell style={{fontWeight: 'bold' }}>Jam Kerja</TableCell>
                  <TableCell style={{fontWeight: 'bold' }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              </TableBody>
              <TableFooter>
                <TableRow>
                  {/* {
                    users.length >= 10 && (
                      <TablePagination 
                        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          },
                        }}    
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    )
                  } */}
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </MainCard>
      </Col>
    </Row>
  );
}
