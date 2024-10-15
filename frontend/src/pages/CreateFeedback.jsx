import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateFeedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleSaveFeedback = () => {

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
      .post('http://localhost:5555/feedbacks', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Feedback created successfully', { variant: 'success'});
        navigate('/feedbacks/full');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened, please check the console');
        enqueueSnackbar('Error', { variant: 'error'})
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <BackButton />
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h1 style={styles.heading}>Add Your Feedback</h1>

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

        <button style={styles.button} onClick={handleSaveFeedback}>
          Submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '0.75rem',
    backgroundColor: '#F1EEDA',
    minHeight: '100vh',
    fontFamily: 'Poppins, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.75rem',
    width: '450px',
    padding: '0.75rem',
    margin: 'auto',
    marginTop: '5rem',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 3.75px 6px rgba(0, 2, 0, 4.65)',
    fontFamily: 'Poppins, sans-serif',
  },
  heading: {
    fontSize: '1.5rem',
    margin: '0.75rem 0',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    color: '#330D0F', // Header font color
  },
  label: {
    fontSize: '0.9375rem',
    marginBottom: '0.000005rem',
    color: '#330D0F',
    display: 'block',
    marginLeft: '3.225rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  input: {
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    padding: '0.375rem 0.75rem',
    width: '80%',
    margin: '0 auto',
    display: 'block',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  textarea: {
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    padding: '0.375rem 0.75rem',
    width: '80%',
    margin: '0 auto',
    display: 'block',
    fontSize: '0.75rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.9rem',
    marginLeft: '50px',
  },
  button: {
    padding: '0.375rem',
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    margin: '1.5rem 0',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '1.5rem',
    fontWeight: 'bold',
    width: '80%',
    alignSelf: 'center',
    minHeight: '41.25px',
    fontSize: '12.75px',
    fontFamily: 'Poppins, sans-serif',
  },
};


export default CreateFeedback;
