import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Paper, Typography } from '@mui/material';

interface CardContent {
  text: string;
  fontSize: number;
  layout: 'centered' | 'top' | 'bottom';
}

const CardCreatePage: React.FC = () => {
  const [cardContent, setCardContent] = useState<CardContent>({
    text: '',
    fontSize: 16,
    layout: 'centered'
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardContent(prev => ({
      ...prev,
      text: event.target.value
    }));
  };

  const handleLayoutChange = (layout: CardContent['layout']) => {
    setCardContent(prev => ({
      ...prev,
      layout
    }));
  };

  const exportToHtml = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .card-container {
              width: 600px;
              height: 400px;
              display: flex;
              justify-content: center;
              align-items: ${cardContent.layout === 'centered' ? 'center' :
                           cardContent.layout === 'top' ? 'flex-start' :
                           'flex-end'};
              padding: 20px;
              background: white;
            }
            .card-text {
              font-size: ${cardContent.fontSize}px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="card-container">
            <div class="card-text">${cardContent.text}</div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'postcard.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Postcard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Card Text"
              value={cardContent.text}
              onChange={handleTextChange}
              margin="normal"
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Layout
              </Typography>
              <Button
                variant={cardContent.layout === 'top' ? 'contained' : 'outlined'}
                onClick={() => handleLayoutChange('top')}
                sx={{ mr: 1 }}
              >
                Top
              </Button>
              <Button
                variant={cardContent.layout === 'centered' ? 'contained' : 'outlined'}
                onClick={() => handleLayoutChange('centered')}
                sx={{ mr: 1 }}
              >
                Center
              </Button>
              <Button
                variant={cardContent.layout === 'bottom' ? 'contained' : 'outlined'}
                onClick={() => handleLayoutChange('bottom')}
              >
                Bottom
              </Button>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={exportToHtml}
              sx={{ mt: 2 }}
            >
              Export to HTML
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: cardContent.layout === 'centered' ? 'center' :
                         cardContent.layout === 'top' ? 'flex-start' :
                         'flex-end'
            }}
          >
            <Typography style={{ fontSize: `${cardContent.fontSize}px` }}>
              {cardContent.text || 'Preview will appear here'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardCreatePage;
