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

 


export default CreateFeedback;
