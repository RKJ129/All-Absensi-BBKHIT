// react-bootstrap
import { Row, Col, Card, Form, Button, Image, Stack } from 'react-bootstrap';

import EmailIcon from '@mui/icons-material/Email';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';



// -----------------------|| SAMPLE ||-----------------------//

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [preview, setPreview] = useState("https://picsum.photos/200/300");

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

  const handleFileChange = async (e) => {

    const file = e.target.files[0];
    if(!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await axios.patch('http://localhost:3000/api/admin/profile/update-photo', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        withCredentials: true
      })
    } catch (error) {
      console.error(error);
    }

    e.target.value = null;
  }

  return (
    <Row className='pt-4'>
      <Col sm={12} lg={8} xs={{ order: 2 }} md={{ order: 1 }}>
      <Card>
        <Card.Body>
          <div className=' position-relative' style={{ marginBottom: '2.5rem' }}>
            <div className='d-flex align-items-center position-absolute bg-primary rounded-3 px-1' style={{ top: '-3rem', left: '-0.65rem', width: '105%' }}>
                  <p className='text-white align-self-center my-3 mx-2 fs-5'>Edit Profile</p>
            </div>
          </div>
          {/* <Box>
            <TextField id='inputUsername' label='Username' variant='standard' />
          </Box> */}
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

        </Card.Body>
      </Card>
      </Col>
      
      <Col sm={4} xs={{ order: 1 }} md={{ order: 2 }}>
        <Card className='rounded'>
          <div className='w-100 rounded bg-primary' style={{ height: '7rem' }}>
          </div>
          <div className='position-relative' style={{ marginBottom: '4.2rem' }}>
          <div className='position-absolute start-50 translate-middle' style={{ top: '-0.5rem' }}>
            <Image src={preview} roundedCircle style={{ objectFit: 'cover' }} width='155px' height='155px' />
            <div 
              className=''
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                borderRadius: '50%',
                transition: 'opacity 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={e => (e.currentTarget.style.opacity = 0)}
              onClick={() => document.getElementById('photoInput').click()}
            >
              <Stack direction='horizontal' gap={1} className='justify-content-center'>
                <PhotoCameraIcon/>
                <small>Ubah foto</small>
              </Stack>
            </div>
              
              <input 
                id='photoInput'
                type='file'
                name='photo'
                accept='image/*'
                className='d-none'
                onClick={handleFileChange}
              />
              

          </div>
          </div>
          <Card.Body className='text-center text-capitalize'>
            <Card.Text className='fw-bold mb-3 text-primary' style={{ fontSize: '18px' }}>{ profile.firstname} {profile.lastname}</Card.Text>
            <Card.Text className='fw-medium text-secondary' style={{ fontSize: '0.85rem' }}>{ profile.username }</Card.Text>
            <Stack direction='horizontal' gap={2} className=' justify-content-center mb-4'>
              <EmailIcon fontSize='small' />
              <Card.Text className='fw-normal text-lowercase' style={{ fontSize: '0.8rem' }}>{ profile.email }</Card.Text>
            </Stack>
              <Stack direction='horizontal' gap={2} className='justify-content-center'>
                  <Card.Text className='fw-medium mb-1 bg-primary text-white px-2 py-1 rounded-2' style={{ fontSize: '0.8rem' }}>Administrator</Card.Text>
                  <Card.Text className='fw-medium mb-1 bg-danger text-white px-2 py-1 rounded-2' style={{ fontSize: '0.8rem' }}>Superadmin</Card.Text>

              </Stack>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
