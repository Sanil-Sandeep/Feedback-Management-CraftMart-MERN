import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const FullFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/feedbacks')
      .then((response) => {
        setFeedbacks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Tell us what you think!</h1>
          <Link to='/feedbacks/create'>
            <button style={styles.button}>Give Feedback</button>
          </Link>
        </div>

        <br></br><br></br>

        {loading ? (
          <Spinner />
        ) : (
          <div style={styles.feedbackSection}>
            {feedbacks.map((feedback) => (
              <div key={feedback._id} style={styles.feedbackWrapper}>
                <div style={styles.feedbackBox}>
                  <div style={styles.feedbackText}>{feedback.name}</div>
                  <div style={styles.feedbackMessage}>{feedback.message}</div>
                </div>
                <div style={styles.actions}>
                  <Link to={`/feedbacks/edit/${feedback._id}`} style={styles.link}>
                    Edit
                  </Link>
                  <Link to={`/feedbacks/delete/${feedback._id}`} style={styles.link}>
                    Delete
                  </Link>
                </div>
                {feedback.reply && (
                  <div style={styles.replyBox}>
                    <div style={styles.replyText}>Reply:</div>
                    <div style={styles.replyMessage}>{feedback.reply}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F1EEDA',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto',
  },
  title: {
    fontSize: '1.9rem',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    fontFamily: 'Poppins, sans-serif',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  feedbackSection: {
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  feedbackWrapper: {
    flex: '0 0 calc(33.333% - 1rem)', // Ensures exactly 3 items per row with spacing
    boxSizing: 'border-box', // Includes padding and border in width
    display: 'flex',
    flexDirection: 'column',
  },
  feedbackBox: {
    border: '3px solid #330D0F',
    borderRadius: '15px',
    padding: '1rem',
    color: '#F1EEDA',
    backgroundColor: '#330D0F',
    marginBottom: '0.5rem',
    width: '300px', // Fixed width
    minHeight: '80px', // Minimum height
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 8.3)', // Shadow effect only below
  },
  replyBox: {
    border: '3px solid #330D0F',
    borderRadius: '15px',
    padding: '1rem',
    backgroundColor: '#F1EEDA',
    marginBottom: '5rem',
    width: '300px', // Fixed width
    minHeight: '80px', // Minimum height
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '4rem',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 4.3)', // Shadow effect only below
  },
  feedbackText: {
    fontWeight: 'bold',
    marginBottom: '0.2rem',
  },
  feedbackMessage: {
    marginBottom: '1rem',
    fontSize: '13px',
    overflowWrap: 'break-word', // Ensures text wraps within the box
  },
  replyText: {
    fontWeight: 'bold',
    marginBottom: '0.2rem',
  },
  replyMessage: {
    marginBottom: '1rem',
    fontSize: '13px',
    overflowWrap: 'break-word', // Ensures text wraps within the box
  },
  actions: {
    fontSize: '15px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '0.6rem',
    marginBottom: '1rem',
    marginLeft: '12rem',
  },
  link: {
    color: '#330D0F',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};


export default FullFeedback;
