import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { results } from '../../services/results';
import CustomTable from './Table';
import './ResultPage.scss';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
}));

const Album = () => {
  const [expanded, setExpanded] = React.useState({
    0: false,
    1: false,
    2: false,
  });
  const [data, setData] = React.useState(null);

  const handleExpandClick = (event, idx) => {
    // console.log(idx);
    // console.log({ ...expanded, [idx]: !expanded.idx });
    setExpanded({ ...expanded, [idx]: !expanded.idx });
  };

  useEffect(async () => {
    if (!data) {
      const response = await results();
      setData(response.data);
      console.log(response.data);
      // console.log(response.data);
    }
  }, []);

  const markerStyles = {
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    border: '1px solid orange',
    background: '#FFF',
    borderRadius: '50%',
  };

  const mapState = {
    controls: ['default'],
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <NotListedLocationIcon className={classes.icon} />
          <div style={{ marginRight: '8px' }}>
            <Link to="/" className="reset-link">
              <Button size="small" color="secondary" variant="contained">
                Новый поиск
              </Button>
            </Link>
          </div>
          <Typography variant="h6" color="inherit" noWrap>
            Результаты поиска
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Лучшие поставщики по рейтингу SmartSupply
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {!data && (
              <Grid container justify="center">
                <Loader />
              </Grid>
            )}
            <Grid container justify="flex-end">
              {data && data !== [] && 'Данные актуальны на 13.12.2020'}
            </Grid>
            {data === [] && 'По данным запросам поиска результатов нет'}
            {data &&
              data !== [] &&
              data.slice(0, 3).map((card, idx) => (
                <Grid
                  item
                  key={`${card.name_product}_${idx}`}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={
                        card.product_image === 'nan'
                          ? require('./assets/fertilizer-2.svg').default
                          : card.product_image
                      }
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name_product}
                      </Typography>
                      <div>
                        <Typography>{card.price}</Typography>
                        <Typography>
                          {card.company_distance || 'mocks distance'}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" disabled>
                        Подробнее
                      </Button>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded.idx,
                        })}
                        onClick={() => handleExpandClick(idx)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded.idx} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                          Heat 1/2 cup of the broth in a pot until simmering,
                          add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                          Heat oil in a (14- to 16-inch) paella pan or a large,
                          deep skillet over medium-high heat. Add chicken,
                          shrimp and chorizo, and cook, stirring occasionally
                          until lightly browned, 6 to 8 minutes. Transfer shrimp
                          to a large plate and set aside, leaving chicken and
                          chorizo in the pan. Add pimentón, bay leaves, garlic,
                          tomatoes, onion, salt and pepper, and cook, stirring
                          often until thickened and fragrant, about 10 minutes.
                          Add saffron broth and remaining 4 1/2 cups chicken
                          broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                          Add rice and stir very gently to distribute. Top with
                          artichokes and peppers, and cook without stirring,
                          until most of the liquid is absorbed, 15 to 18
                          minutes. Reduce heat to medium-low, add reserved
                          shrimp and mussels, tucking them down into the rice,
                          and cook again without stirring, until mussels have
                          opened and rice is just tender, 5 to 7 minutes more.
                          (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                          Set aside off of the heat to let rest for 10 minutes,
                          and then serve.
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Все предложения
        </Typography>
        <div style={{ marginBottom: '50px', padding: '5px' }}>
          <CustomTable data={data} />
        </div>
        <Typography variant="h5" align="center" color="textPrimary" paragraph>
          Карта поставщиков
        </Typography>
        {!data && (
          <Grid container justify="center">
            <Loader />
          </Grid>
        )}
        {data && (
          <Map
            width={'100%'}
            state={mapState}
            center={[55.754734, 37.583314]}
            zoom={10}
          >
            {data.map((row, i) => {
              return (
                row.coordinates &&
                row.coordinates.split(', ')[0] &&
                row.coordinates.split(', ')[1] && (
                  <Marker
                    key={'marker_' + i}
                    lat={row.coordinates.split(', ')[0].slice(2)}
                    lon={row.coordinates.split(', ')[1].slice(0, -2)}
                  >
                    <MarkerLayout>
                      <div style={markerStyles}>
                        <img
                          src={require('./assets/fertilizer-3.svg').default}
                          alt="faltilizer"
                          style={{
                            width: '30px',
                            height: '30px',
                            paddingLeft: '5px',
                            paddingTop: '5px',
                          }}
                        />
                      </div>
                    </MarkerLayout>
                  </Marker>
                )
              );
            })}
          </Map>
        )}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Album;
