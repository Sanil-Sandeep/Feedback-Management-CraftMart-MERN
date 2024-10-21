import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/feedbacks/${id}`)
      .then((response) => {
        setFeedback(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditClick = () => {
    navigate(`/feedbacks/reply/${feedback._id}`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <BackButton />
      </div>
      <h1 style={styles.title}>{feedback.name}'s Feedback Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.feedbackContainer}>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Id:</span>
            <span style={styles.value}>{feedback._id}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{feedback.name}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{feedback.email}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Feedback:</span>
            <div style={styles.message}>{feedback.message}</div>
          </div>
          {feedback.reply && (
            <div style={styles.feedbackItem}>
              <span style={styles.label}>Reply:</span>
              <div style={styles.message}>{feedback.reply}</div>
            </div>
          )}
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Created Time:</span>
            <span style={styles.value}>{new Date(feedback.createdAt).toLocaleString()}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.label}>Last Updated Time:</span>
            <span style={styles.value}>{new Date(feedback.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
      <button style={styles.editButton} onClick={handleEditClick}>
            Reply
      </button>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F1EEDA',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    position: 'relative', // Required for absolute positioning of BackButton
  },
  header: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#330D0F',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  feedbackContainer: {
    width: '80%',
    maxWidth: '700px',
    border: '3px solid #330D0F',
    borderRadius: '12px',
    backgroundColor: '#F1EEDA', // Changed background color to #F1EEDA
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 2, 0, 6.2)', // Added box shadow
  },
  feedbackItem: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    color: '#330D0F',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  value: {
    fontSize: '16px',
    color: '#330D0F', // Changed text color to #330D0F
  },
  message: {
    fontSize: '16px',
    color: '#330D0F', // Changed text color to #330D0F
    whiteSpace: 'pre-wrap', // Allows text to wrap and preserve whitespace
  },
  editButton: {
    marginTop: '2rem',
    width: '200px',
    padding: '0.5rem 1rem',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#F1EEDA',
    backgroundColor: '#330D0F',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
  },
};


export default ShowFeedback;
