import React, { useState } from 'react';
import Modal from 'react-modal';

const FeedbackPop = ({ isOpen, onClose, onSubmit }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [comments, setComments] = useState('');

  const handleThumbsUp = () => {
    setFeedbackType('Thumbs Up');
  };

  const handleThumbsDown = () => {
    setFeedbackType('Thumbs Down');
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = () => {
    const feedback = {
      type: feedbackType,
      comments: comments,
    };

    onSubmit(feedback);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Feedback"
      ariaHideApp={false} // This is required to prevent warnings in React 17+
    >
      <h2>How was your experience?</h2>
      <div>
        <button onClick={handleThumbsUp}>👍 Thumbs Up</button>
        <button onClick={handleThumbsDown}>👎 Thumbs Down</button>
      </div>
      {feedbackType === 'Thumbs Up' && (
        <div>
          <label>
            Additional Comments:
            <textarea value={comments} onChange={handleCommentsChange} />
          </label>
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default FeedbackPop;
