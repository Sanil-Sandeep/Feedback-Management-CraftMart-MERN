import React from 'react'
import {Routes, Route} from 'react-router-dom'
import FeedbackDashbord from './pages/FeedbackDashbord';
import CreateFeedback from './pages/CreateFeedback';
import DeleteFeedback from './pages/DeleteFeedback';
import EditFeedback from './pages/EditFeedback';
import FullFeedback from './pages/FullFeedback';
import ReplyFeedback from './pages/ReplyFeedback';
import ShowFeedback from './pages/ShowFeedback';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<FeedbackDashbord />} />
      <Route path='/feedbacks/create' element={<CreateFeedback />} />
      <Route path='/feedbacks/delete/:id' element={<DeleteFeedback />} />
      <Route path='/feedbacks/edit/:id' element={<EditFeedback />} />
      <Route path='/feedbacks/full' element={<FullFeedback />} />
      <Route path='/feedbacks/reply/:id' element={<ReplyFeedback />} />
      <Route path='/feedbacks/details/:id' element={<ShowFeedback />} />
    </Routes>
  )
}

export default App