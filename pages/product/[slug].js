import { useRouter } from 'next/router';
import React from 'react';
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
import Image from 'next/image';
import Link from 'next/link';

function productScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((d) => d.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name} description= {product.description}>
      <div>
        <Link href="/">Back to Product</Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={240}
            height={270}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xd={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant='h1'>{product.name}</Typography>
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
                  <Button fullWidth variant="contained" color="primary">
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

export default productScreen;
