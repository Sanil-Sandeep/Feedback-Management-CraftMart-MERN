import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteFeedback = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFeedback = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/feedbacks/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Feedback Deleted Successfully', {variant: 'success'});
        navigate('/feedbacks/full');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check the console.');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <BackButton />
      {loading ? <Spinner /> : null}
      <div style={styles.form}>
        <h3 style={styles.heading}>Do You Want To Delete Your Feedback?</h3>

        <button
          style={styles.buttonDelete}
          onClick={handleDeleteFeedback}
        >
          Yes, Delete it
        </button>
        <button
          style={styles.buttonCancel}
          onClick={() => {  
            window.location.href = '/feedbacks/full';  // Redirect to the link
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#F1EEDA',
    minHeight: '100vh',
    fontFamily: 'Poppins, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px', // Tailwind's rounded-xl
    width: '600px',
    padding: '32px',
    margin: 'auto',
    marginTop: '86px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 9.2)', // Adjust shadow here
    fontFamily: 'Poppins, sans-serif',
  },
  heading: {
    fontSize: '24px',
    margin: '16px 0',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    color: '#330D0F', // Header font color
  },
  buttonDelete: {
    padding: '16px',
    backgroundColor: '#330D0F', // Updated color
    color: '#ffffff', // Tailwind's text-white
    margin: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '48px', // Added border radius
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
  buttonCancel: {
    padding: '16px',
    backgroundColor: '#F1EEDA', // Updated color
    color: '#330D0F', // Text color
    margin: '16px',
    width: '100%',
    border: '2px solid #330D0F', // Border color
    borderRadius: '48px', // Added border radius
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
  },
};

export default DeleteFeedback;
