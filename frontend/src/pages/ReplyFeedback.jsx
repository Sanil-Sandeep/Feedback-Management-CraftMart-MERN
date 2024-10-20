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



export default ReplyFeedback;
