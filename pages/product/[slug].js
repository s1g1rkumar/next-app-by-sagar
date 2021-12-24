import { useRouter } from 'next/router';
import React,{useContext} from 'react';
import data from '../../utils/Data';
import Layout from '../../components/Layout/Layout';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import {Store} from '../../utils/Store'
import Image from 'next/image';
import Link from 'next/link';
import db from '../../utils/Database/db';
import Product from '../../models/Products';
import axios from 'axios';

function productScreen(props) {
  const {dispatch } = useContext(Store);
  const {product} = props;
 if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async() =>{
    const {data}= await axios.get(`/api/products/${product._id}`)
    if(data.countInStock <= 0){
      window.alert('Sorry. product is out of stock')
    }
    dispatch({type:'CART_ADD_ITEM',payload:{...product,quantity:1}});
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div>
        <Link href="/">Back to Product</Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
         <Image
         src = {product.image}
          alt={product.name}
          width={500}
         height={500}
         ></Image>

        </Grid>
        <Grid item md={3} xd={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <Typography>
              <ListItem>category:{product.category}</ListItem>
            </Typography>
            <Typography>
              <ListItem>brand:{product.brand}</ListItem>
            </Typography>
            <Typography>
              <ListItem>
                Rating:{product.rating} stars({product.numReviews})
              </ListItem>
            </Typography>
            <Typography>
              <ListItem>Description:{product.description}</ListItem>
            </Typography>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <Grid>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>&#8377;{product.price.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth variant="contained" color="primary" onClick ={addToCartHandler}>
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}


export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;
  await db.connect();
  const product = await Product.findOne({slug}).lean();
  // const products = await Allproducts.json();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product)
    },
  };
}

export default productScreen;
