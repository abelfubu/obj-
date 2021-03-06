import React from 'react';
import { makeStyles, Card, Grid, Box } from '@material-ui/core';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import EditEvent from './EditEvent';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { orange } from '@material-ui/core/colors';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteDialog from './DeleteDialog';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: orange[500],
  },
}));

export default function RecipeReviewCard(props) {
  const { date, title, link, desc, click } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.root}>
        <CardHeader
          style={{ textTransform: 'capitalize' }}
          avatar={
            <Avatar aria-label='Obetivo' className={classes.avatar}>
              {new Date(date).toLocaleDateString('es-ES', options).slice(0, 1)}
            </Avatar>
          }
          title={title}
          subheader={new Date(date).toLocaleDateString('es-ES', options)}
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label='Calendar'
            target='_blank'
            rel='noreferrer'
            href={link}>
            <CalendarTodayIcon />
          </IconButton>
          <DeleteDialog click={click} />

          <EditEvent {...props} />
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Box m={1}>
              <Typography variant='body2' color='initial'>
                {desc}
              </Typography>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
