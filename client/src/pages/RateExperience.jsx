import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const RateExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [booking, setBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/api/bookings/${id}`)
      .then(res => setBooking(res.data))
      .catch(err => console.error('Error fetching booking:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setSubmitting(true);
    try {
      await api.post(`/api/bookings/${id}/rate`, { rating, comment });
      toast.success('Thank you for your feedback!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error submitting rating:', err);
      toast.error('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-m3-md">
      <div className="max-w-md w-full bg-surface-container-lowest p-m3-2xl rounded-4xl border border-outline-variant/30 shadow-xl text-center">
        <h1 className="text-headline-md font-headline-md text-on-surface mb-m3-sm">Rate Your Experience</h1>
        {booking && (
          <div className="mb-m3-xl p-m3-md bg-surface-container rounded-2xl flex items-center gap-4 text-left border border-outline-variant/30">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">{booking.service?.icon || 'cleaning_services'}</span>
            </div>
            <div>
              <p className="text-body-md font-bold text-on-surface">{booking.service?.title}</p>
              <p className="text-body-sm text-on-surface-variant">with {booking.provider?.name || 'Assigned Professional'}</p>
            </div>
          </div>
        )}
        {!booking && <p className="text-body-md text-on-surface-variant mb-m3-xl">How was your service for booking #{id}?</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-m3-xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`material-symbols-outlined text-display-sm transition-all ${rating >= star ? 'text-primary fill-1' : 'text-outline fill-0'}`}
                style={{ fontVariationSettings: ` 'FILL' ${rating >= star ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 48` }}
              >
                star
              </button>
            ))}
          </div>

          <div className="text-left mb-m3-xl">
            <label className="block text-label-lg font-label-lg text-on-surface mb-m3-xs px-1">Share more details (Optional)</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like? What could be improved?"
              rows="4"
              className="w-full p-m3-md bg-surface-container rounded-2xl border border-outline focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-body-md"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={rating === 0}
            className={`w-full py-m3-md rounded-full font-label-lg transition-all shadow-md ${rating > 0 ? 'bg-primary text-on-primary hover:bg-primary/90 active:scale-95' : 'bg-outline-variant text-on-surface-variant cursor-not-allowed'}`}
          >
            Submit Review
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            className="w-full mt-m3-md py-m3-md text-primary font-label-lg hover:bg-primary/5 rounded-full transition-all"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateExperience;
