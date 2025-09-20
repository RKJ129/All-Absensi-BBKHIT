import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

import { Form, Modal, Stack, Button } from "react-bootstrap";
import axios from "axios";

function Edit ({ id, onUpdate }) {
    const [show, setShow] = useState(false);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
        
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editAdmin = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/admin/manage/edit/' + id, {
                withCredentials: true
            });

            const payload = data.result;

            setUsername(payload.username);
            setEmail(payload.email);
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        editAdmin();
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.patch('http://localhost:3000/api/admin/manage/update/' + id, {
                username: username,
                email: email,
                password: password
            }, { withCredentials: true });

            onUpdate();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <IconButton aria-label="editAdmin" size="medium" color="primary" onClick={handleShow}>
                <EditIcon fontSize="inherit" />
            </IconButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                        handleClose();
                    }}>
                        <Form.Group className="mb-2" controlId="input_username">
                            <Form.Label>Username : </Form.Label>
                            <Form.Control placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="input_email">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="input_password">
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Form.Text className="text-danger">
                                *Dapat dikosongkan!
                            </Form.Text>
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

export default Edit;