import { useCallback, useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import axios from "axios";

export const CreateAdmin = ({ onCreate }) => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userId, setUserId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUsers = useCallback(async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/admin/manage/users', {
                withCredentials: true
            });
    
            const payload = data.result;
    
            setUsers(payload);
            // setRoles(payload.roles);
        } catch (error) {
            console.error('Error GET Users & Roles : ', error);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers, show]);

    const handleSubmit = async () => {
        try {
            const { data } = await axios.patch('http://localhost:3000/api/admin/manage/store', {
                user_id: userId
            }, {
                withCredentials: true
            });

            getUsers();
            onCreate();
        } catch (error) {
            console.error('Error handle submit manage admin : ', error);
        }
    }
    
    return (
        <>
            <IconButton aria-label='edit' size='large' color='primary' onClick={handleShow}>
                <AddIcon fontSize='large' />
            </IconButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pengguna</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            await handleSubmit();
                            handleClose();
                        } catch(error) {
                            console.error('Error patch admin : ', error);
                        }

                    }}>
                        <Form.Group className="mb-3" controlId="inputPengguna">
                            <Form.Label>Pengguna</Form.Label>
                            <Form.Select aria-label="Select User" onChange={(e) => setUserId(e.target.value)}>
                                <option>Pilih Pengguna</option>
                                {
                                    users.map((user, index) => (
                                        <option value={user.id} key={index} className="text-capitalize">{ user.username }</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="inputRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Pilih Role</option>
                                {
                                    roles.map((role, index) => (
                                        <option value={role.id} key={index} className="text-capitalize">{ role.name }</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group> */}
                        <Modal.Footer>
                            <Button variant="secondary" size="sm" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" size="sm" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}