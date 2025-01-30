import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  {
    id: 1,
    title: 'Post a job',
  },
  {
    id: 2,
    title: 'Find a job',
  }
];

function ChooseRoleCards() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  console.log(selectedCard);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card sx={{ boxShadow: 'none', border: "1px" }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default ChooseRoleCards;
