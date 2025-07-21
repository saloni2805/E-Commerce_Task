import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material"

// Example category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://source.unsplash.com/featured/?electronics",
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://source.unsplash.com/featured/?clothes",
  },
  {
    id: 3,
    name: "Home Decor",
    image: "https://source.unsplash.com/featured/?furniture",
  },
  {
    id: 4,
    name: "Books",
    image: "https://source.unsplash.com/featured/?books",
  },
]

const Categories = ({ onCategoryClick }) => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ p: 3 }}>
      {categories.map((cat) => (
        // <Grid item xs={12} sm={6} md={3} key={cat.id}>
        //   <Card>
        //     <CardActionArea onClick={() => onCategoryClick?.(cat)}>
        //       <CardMedia
        //         component="img"
        //         height="160"
        //         image={cat.image}
        //         alt={cat.name}
        //       />
        //       <CardContent sx={{ textAlign: "center" }}>
        //         <Typography variant="h6">{cat.name}</Typography>
        //       </CardContent>
        //     </CardActionArea>
        //   </Card>
        // </Grid>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() => onCategoryClick?.(cat)}>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {cat.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  )
}

export default Categories
