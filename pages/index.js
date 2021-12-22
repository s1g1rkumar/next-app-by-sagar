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
import Product from '../models/Products';
import db from '../utils/Database/db';

export default function Home(props) {
  const Products = JSON.parse(JSON.stringify(props.products));

  console.log("this is all products",products[0])
  return (
    <Layout>
      <div>
        <h1>Products </h1>
        <Grid container spacing={3}>
          {Products.map((product, index) => (
            <Grid item md={4} key={index}>
              <Card>
                <Link href={`/product/${product.slug}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActionArea>
                  <Typography>&#8377;{product.price.toFixed(2)}/- </Typography>
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

export async function getServerSideProps(){
await db.connect();
const products = await Product.find({});
// const products = await Allproducts.json();
await db.disconnect();
return {
  props:{
    products
  }
}
}

