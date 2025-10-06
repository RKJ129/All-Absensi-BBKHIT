import axios from "axios";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap"


export default function ChangePassword () {
    const [newPassword, setNewPassword] = useState();

    const handleChangePassword = async () => {
        try {
            const { data } = await axios.patch('http://localhost:3000/api/admin/profile/change-password', {
                newPassword: newPassword
            }, { withCredentials: true });

            const payload = data.message;
            setNewPassword('');
            // console.log('Payload Change Password : ', payload);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <>
            <Col sm={10}>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleChangePassword();
                }}>
                    <Form.Group className="mb-3" controlId="inputOldPassword">
                        <Form.Label>Password Lama :</Form.Label>
                        <Form.Control type="password" placeholder="Masukkan password lama" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="inputNewPassword">
                        <Form.Label>Password Baru :</Form.Label>
                        <Form.Control type="password" placeholder="Masukkan password baru" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="inputConfirmNewPassword">
                        <Form.Label>Konfirmasi Password Baru :</Form.Label>
                        <Form.Control type="password" placeholder="Konfirmasi password baru" />
                    </Form.Group>
                    <Button type="submit" variant="primary" size="lg">Submit</Button>
                </Form>
            </Col>
        </>
    )
}