import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ReplyFeedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ reply: '' });
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
      setReply(response.data.reply)
      setLoading(false)
    }).catch((error) => {
      setLoading(false);
      alert('An error happend. please check console');
      console.log(error);
    });
  }, [])

  const handleReplyFeedback = () => {

    const newErrors = { reply: '' };
    if (!reply) {
      newErrors.reply = 'Reply is required.';
    } else if (reply.length < 5) { // Example rule: minimum length
      newErrors.reply = 'Reply must be at least 5 characters long.';
    }
    
    if (Object.values(newErrors).some(x => x)) {
      setErrors(newErrors);
      return; // Stop execution if there are validation errors
    }

    const data = {
      name,
      email,
      message,
      reply,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/feedbacks/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Reply Added Successfully', { variant: 'success' });
        navigate('/');
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
        <h1 style={styles.heading}>Add Reply For Feedback</h1>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            readOnly
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="message">Feedback:</label>
          <textarea
            id="message"
            value={message}
            readOnly
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
            rows="7" // Adjust rows as needed for height
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={styles.label} htmlFor="reply">Reply:</label>
          <textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            style={styles.textarea}
            rows="7" // Adjust rows as needed for height
          />
           {errors.reply && <p style={styles.error}>{errors.reply}</p>}
        </div>

        <button style={styles.button} onClick={handleReplyFeedback}>
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
  error: {
    color: 'red',
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    marginLeft: '3.225rem',
  },
};


export default ReplyFeedback;
