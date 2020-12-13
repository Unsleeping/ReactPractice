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

const mockCards = [
  {
    company_image: 'nan',
    company_link: 'nan',
    company_name: 'Евгений леонидович (частное лицо)',
    company_region: 'Краснодарский край',
    coordinates: '[(45.7684014, 39.0261044)]',
    delievery: 'nan',
    id: 'b9af5840-b9c4-461a-a9fb-41ed251b6f54',
    min_order: 'nan',
    name_product: 'Микроэлементы в хелатной форме АГРОНОМ',
    price: '300 руб.',
    product_image: 'https://agro-russia.com/imgs/board/100/210800-2s.jpg',
    product_link:
      'https://agro-russia.com/ru/trade/m-210800/mikroehlementy-v-khelatnoj-forme-agronom/',
    proportion: 'nan',
    substance: 'nan',
  },
  {
    company_image: 'nan',
    company_link: 'nan',
    company_name: 'Павел (частное лицо)',
    company_region: 'Московская обл.',
    coordinates: '[(55.5043158, 38.0353929)]',
    delievery: 'nan',
    id: '1afc94ac-f1e3-4ded-b667-945731dfee63',
    min_order: 'nan',
    name_product: 'Опилки (стружка)',
    price: '280 руб.',
    product_image: 'https://agro-russia.com/imgs/board/35/167935-3s.jpg',
    product_link: 'https://agro-russia.com/ru/trade/m-167935/opilki-struzhka/',
    proportion: 'nan',
    substance: 'nan',
  },
];

const Album = () => {
  const [expandedFirst, setExpandedFirst] = React.useState(false);
  const [expandedSecond, setExpandedSecond] = React.useState(false);
  const [expandedThird, setExpandedThird] = React.useState(false);
  const [data, setData] = React.useState(null);

  const handleExpandClick = (setter, value) => () => setter(!value);

  const getValue = (idx) => {
    if (idx === 0) return expandedFirst;
    if (idx === 1) return expandedSecond;
    if (idx === 2) return expandedThird;
  };

  const getSetter = (idx) => {
    if (idx === 0) return setExpandedFirst;
    if (idx === 1) return setExpandedSecond;
    if (idx === 2) return setExpandedThird;
  };

  useEffect(async () => {
    if (!data) {
      const response = await results();
      setData(response.data);
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
              {data && 'Данные актуальны на 13.12.2020'}
            </Grid>
            {data &&
              data.slice(0, 3).map((card, idx) => {
                return (
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
                          card.product_image === 'nan' || !card.product_image
                            ? require('./assets/fertilizer-2.svg').default
                            : card.product_image
                        }
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name_product}
                        </Typography>
                        <div>
                          <Typography>
                            {card.price === 'nan'
                              ? 'цена  по запросу'
                              : card.price}
                          </Typography>
                          <Typography>
                            {card.distance || 'mocks distance'}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" disabled>
                          Подробнее
                        </Button>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: getValue(idx),
                          })}
                          onClick={handleExpandClick(
                            getSetter(idx),
                            getValue(idx)
                          )}
                          aria-expanded={getValue(idx)}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse in={getValue(idx)} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography
                            paragraph
                          >{`Поставщик: ${card.company_name}`}</Typography>
                          <Typography
                            paragraph
                          >{`Субъект: ${card.company_region}`}</Typography>
                          <Typography>{card.product_text}</Typography>
                          <Typography>{card.distance}</Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            href={card.product_link}
                            target="_blank"
                          >
                            Перейти на сайт поставщика
                          </Button>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {data && data.length
            ? `Все предложения (${data.length})`
            : 'Все предложения'}
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
