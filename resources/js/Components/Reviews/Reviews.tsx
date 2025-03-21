import { useState } from 'react';
import { Box, Typography, Rating, TextField, Button, Card, CardContent, Avatar, Divider } from '@mui/material';
import { useForm } from '@inertiajs/react';

interface ReviewProps {
  productId: number;
  reviews: Array<{
    id: number;
    content: string;
    rating: number;
    user: {
      name: string;
    };
    replies: Array<{
      id: number;
      content: string;
      user: {
        name: string;
      };
    }>;
  }>;
}

export default function Reviews({ productId, reviews }: ReviewProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const { data, setData, post, processing, reset } = useForm({
    content: '',
    rating: 0
  });

  const {
    data: replyData,
    setData: setReplyData,
    post: postReply,
    reset: resetReply
  } = useForm({
    content: ''
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('reviews.store', productId), {
      onSuccess: () => reset()
    });
  };

  const handleSubmitReply = (reviewId: number) => {
    postReply(route('reviews.reply', reviewId), {
      onSuccess: () => {
        resetReply();
        setReplyingTo(null);
      }
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h5' gutterBottom>
        Customer Reviews
      </Typography>

      {/* Review Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmitReview}>
            <Rating value={data.rating} onChange={(_, value) => setData('rating', value || 0)} sx={{ mb: 2 }} />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              placeholder='Write your review...'
              sx={{ mb: 2 }}
            />
            <Button type='submit' variant='contained' disabled={processing}>
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>{review.user.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant='subtitle1'>{review.user.name}</Typography>
                <Rating value={review.rating} readOnly size='small' />
              </Box>
            </Box>
            <Typography variant='body1' sx={{ mb: 2 }}>
              {review.content}
            </Typography>

            {/* Replies */}
            {review.replies.length > 0 && (
              <Box sx={{ ml: 4, mt: 2 }}>
                {review.replies.map((reply) => (
                  <Box key={reply.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{reply.user.name.charAt(0)}</Avatar>
                      <Typography variant='subtitle2'>{reply.user.name}</Typography>
                    </Box>
                    <Typography variant='body2'>{reply.content}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Reply Form */}
            <Box sx={{ mt: 2 }}>
              {replyingTo === review.id ? (
                <Box sx={{ ml: 4 }}>
                  <TextField
                    fullWidth
                    size='small'
                    value={replyData.content}
                    onChange={(e) => setReplyData('content', e.target.value)}
                    placeholder='Write your reply...'
                    sx={{ mb: 1 }}
                  />
                  <Button size='small' variant='contained' onClick={() => handleSubmitReply(review.id)} sx={{ mr: 1 }}>
                    Submit
                  </Button>
                  <Button size='small' onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button size='small' onClick={() => setReplyingTo(review.id)}>
                  Reply
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
