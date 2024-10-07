import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedbacklist.css';

function FeedbackList() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/feedback')
            .then(response => {
                setFeedbackList(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the feedback!', error);
            });
    }, []);

    return (
        
        <div className="feedback-list-container">
            <h2>Feedback</h2>
            <ul>
                {feedbackList.map(feedback => (
                    <li key={feedback.id}>
                        <p><strong>{feedback.username}:</strong> {feedback.feedback}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackList;
