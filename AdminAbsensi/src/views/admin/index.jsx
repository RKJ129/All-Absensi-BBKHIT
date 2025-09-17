// react-bootstrap
import MainCard from 'components/Card/MainCard';
import { Row, Col, Stack } from 'react-bootstrap';
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
import { useCallback, useEffect, useState } from 'react';
import { TablePaginationActions } from '../rekap';
import PropTypes from 'prop-types';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { CreateAdmin } from './components';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

// -----------------------|| SAMPLE ||-----------------------//

export default function ManageAdmin() {
  const [dataAdmin, setDataAdmin] = useState([]);
    
  const getAdmin = useCallback(async() => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/admin/manage/index', {
        withCredentials: true
      });
  
      const payload = data.result;
      setDataAdmin(payload);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const destroy = async (id) => {
    try {
      await axios.delete('http://localhost:3000/api/admin/manage/destroy/' + id, { withCredentials: true });

      getAdmin();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdmin();
  }, [getAdmin]);



  const colors = {
    superadmin: 'danger',
    admin: 'success',
    user: 'primary'
  };

  console.log('Data Admin : ', dataAdmin);

  return (
    <Row>
      <Col sm={12}>
        <MainCard title="Manajemen Admin">
        <Stack direction='horizontal' gap={3}>
          <div className='p2'>
            <CreateAdmin onCreate={getAdmin} />
          </div>
          <div className='p-2 ms-auto'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="search" placeholder="Cari pengguna" onChange={(e) => setSearch(e.target.value)} />
            </Form.Group>
          </div>
        </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='users table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold' }}>Nama</TableCell>
                  <TableCell style={{fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell style={{fontWeight: 'bold' }}>Role</TableCell>
                  {/* <TableCell style={{fontWeight: 'bold' }}></TableCell> */}
                  <TableCell style={{fontWeight: 'bold' }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dataAdmin.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{ data.username }</TableCell>
                      <TableCell>{ data.email }</TableCell>
                      <TableCell>
                        {
                          data.roles?.map((role, i) => (
                            <Stack key={i} direction='horizontal' gap={2}>
                              <div className={`text-capitalize bg-${colors[role.name]} mb-2 text-white px-1 rounded-2`} style={{ fontSize: '0.8rem' }}>
                                { role.name }
                              </div>
                            </Stack>
                          ))
                        }
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label='delete' size='medium' color='primary' onClick={() => destroy(data.id)}>
                            <DeleteIcon fontSize='inherit' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
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
