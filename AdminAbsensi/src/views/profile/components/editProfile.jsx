import { Row, Col, Form, Button } from 'react-bootstrap';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function EditProfile ({ setProfile, setPreview }) {

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const indexProfile = useCallback(async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/api/admin/profile', { withCredentials: true });
          console.log('Profile data : ', data);
          setProfile(data.result);
          const payload = data.result;
          setUsername(payload.username);
          setFirstname(payload.firstname);
          setLastname(payload.lastname);
          setEmail(payload.email);
          if(payload.photo_url) {
            setPreview(payload.photo_url);
          }
        } catch (error) {
          console.error(error);
        }
      }, []);

    useEffect(() => {
        indexProfile();
    }, [indexProfile]);

    const updateProfile = async () => {
        try {
        await axios.patch('http://localhost:3000/api/admin/profile/update', {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email
        }, { withCredentials: true });
        indexProfile();
        console.log('Berhasil update profile');
        } catch (error) {
        console.error(error);
        }
    }

    return (
        <>
            <Col sm={10}>
                <Form onSubmit={async (e) => {
                    e.preventDefault();
                    updateProfile();
                }}>
                    <Form.Group className='mb-3' controlId='inputUsername'>
                        <Form.Label>Username :</Form.Label>
                        <Form.Control type='text' placeholder='Username' value={username || ''} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className='mb-3' controlId='inputFirstname'>
                            <Form.Label>Firstname :</Form.Label>
                            <Form.Control type='text' placeholder='Firstname' value={firstname || ''} onChange={(e) => setFirstname(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className='mb-3' controlId='inputFirstname'>
                            <Form.Label>Lastname :</Form.Label>
                            <Form.Control type='text' placeholder='Lastname' value={lastname || ''} onChange={(e) => setLastname(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className='mb-3' controlId='inputEmail'>
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type='email' placeholder='name@email.com' value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' variant='primary' size='lg'>Submit</Button>
                </Form>
            </Col>
        </>
    )
}