import Head from 'next/head';
import Image from 'next/image';
import Styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import data from '../utils/Data';
import Link from 'next/link';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products </h1>
        <Grid container spacing={3}>
          {data.products.map((products, index) => (
            <Grid item md={4} key={index}>
              <Card>
                <Link href={`/product/${products.slug}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={products.image}
                      title={products.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{products.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActionArea>
                  <Typography>&#8377;{products.price.toFixed(2)}/- </Typography>
                  <Button color="primary">Add to cart</Button>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
