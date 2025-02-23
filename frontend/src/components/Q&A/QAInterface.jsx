import React, { useState } from 'react';
import { askQuestion } from '../../services/qaService';

const QAInterface = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await askQuestion(question);
    setAnswer(response.answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question" required />
        <button type="submit">Ask</button>
      </form>
      {answer && <div>{answer}</div>}
    </div>
  );
};

export default QAInterface;