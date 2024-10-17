import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditFeedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/feedbacks/${id}`)
    .then((response) => {
      setName(response.data.name);
      setEmail(response.data.email)
      setMessage(response.data.message)
      setLoading(false)
    }).catch((error) => {
      setLoading(false);
      alert('An error happend. please check console');
      console.log(error);
    });
  }, [])

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required.';
    } else if (!/\s/.test(name)) {
      newErrors.name = 'Name must be more than one word.';
    } else if (/\d/.test(name)) {
      newErrors.name = 'Name must not contain numbers.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com.';
    } else if (!/^[a-zA-Z]+@gmail\.com$/.test(email)) {
      newErrors.email = 'Email must contain only letters before @gmail.com.';
    }

    if (!message) {
      newErrors.message = 'Message is required.';
    } else if (message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditFeedback = () => {

    if (!validateForm()) {
      return;
    }

    const data = {
      name,
      email,
      message,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/feedbacks/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Feedback Edited Successfully', { variant: 'success' });
        navigate('/feedbacks/full');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened, please check the console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <BackButton />
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h1 style={styles.heading}>Edit your Feedback</h1>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="message">Feedback:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
            rows="7" // Adjust rows as needed for height
          />
           {errors.message && <div style={styles.error}>{errors.message}</div>}
        </div>

        <button style={styles.button} onClick={handleEditFeedback}>
          Submit
        </button>
      </div>
    </div>
  );
};



export default EditFeedback;
