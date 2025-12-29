import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

type TopicProps = {
    id: number
    title: string;
    description: string;
};

export default function TopicCard({ id, title, description }: TopicProps) {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Stack>

        <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" component={Link} to={`/topic/${id}`}>View Discussion</Button>
      </CardActions>

    </Card>
  );
}