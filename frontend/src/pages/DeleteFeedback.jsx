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
  
};

export default DeleteFeedback;
