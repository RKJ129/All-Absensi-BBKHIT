import { useCallback, useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { Modal, Stack } from "react-bootstrap";
import axios from "axios";

const CreateAdmin = ({ onStore }) => {
    const [show, setShow] = useState(false);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/api/admin/manage/store', {
                username: username,
                email: email,
                password: password
            }, { withCredentials: true });

            onStore();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <IconButton aria-label='edit' size='large' color='primary' onClick={handleShow}>
                <AddIcon fontSize='large' />
            </IconButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                        handleClose();
                    }}>
                        <Form.Group className="mb-2" controlId="input_username">
                            <Form.Label>Username : </Form.Label>
                            <Form.Control placeholder="Masukkan username" onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="input_email">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control type="email" placeholder="Masukkan email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="input_password">
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="Masukkan password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Stack direction="horizontal" className="d-flex justify-content-end mt-3" gap={1}>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button type="submit" variant="primary">Submit</Button>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateAdmin;