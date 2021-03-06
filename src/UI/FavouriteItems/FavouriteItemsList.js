import React, { useState, useEffect } from 'react';
import './FavouriteItemList.scss';
import { fetchFavouriteFilteredItems } from '../../services/ItemServices';
import {
  IconButton,
  Box,
  Grid,
  useMediaQuery,
  Paper,
  Typography,
  Fab,
  InputBase,
  Alert
} from '@mui/material';
import {
  DeleteOutline,
  Search
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const FavouriteItemList = (props) => {

  const [favouriteFilterEntered, setFavouriteFiterEntered] = useState();
  const [favouriteFiterItems, setFavouriteFiterItems] = useState(props.items);
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const xsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const searchFilterHandler = (event) => setFavouriteFiterEntered(event.target.value);

  useEffect(() => {
    fetchFavouriteFilteredItems(favouriteFilterEntered, props.items, setFavouriteFiterItems);
  }, [favouriteFilterEntered, props.items]);

  return (
    <Box>
      <Box className="favourite_search_container search_container">
        <Box className="search_icon_wrapper">
          <IconButton>
            <Search />
          </IconButton>
        </Box>
        <InputBase placeholder="Search…"
          inputrops={{ 'aria-label': 'search' }}
          onChange={searchFilterHandler}
        />
      </Box>
      <Grid className="favourite_list_component" container spacing={2}>
        {favouriteFiterItems && favouriteFiterItems.length > 0 ? favouriteFiterItems.map((item) => (
          <Grid key={item.id} className="favourite_container" item xs={mdScreen ? xsScreen ? 12 : 6 : 3}>
            <Paper elevation={3} >
              <Fab className="fovourite_delete" size="small" aria-label="delete" onClick={() => props.onRemoveItem(item.id)}>
                <DeleteOutline />
              </Fab>
              <img className="favorite_image" alt="complex" src={item.image} />
              <Typography className="favourite_title" variant="body1" align="center" component="div">
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        )) :
          <Grid item xs={12}>
            <Alert severity="info">Aún no tienes anuncios favoritos. Comienza a añadir tus favoritos para verlos en esta sección.</Alert>
          </Grid>
       }
      </Grid>
    </Box>
  );
};

export default FavouriteItemList;
