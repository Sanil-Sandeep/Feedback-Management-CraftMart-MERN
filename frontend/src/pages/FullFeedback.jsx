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



export default FullFeedback;
