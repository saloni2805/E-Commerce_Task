import React from "react"
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material"

const CategoryCard = ({
  title,
  image,
  onBuyNow,
  onViewDetails,
  onClick,
  clickable = false,
}) => {
  const CardBody = (
    <>
      <CardMedia component="img" height="160" image={image} alt={title} />
      <CardContent sx={{ textAlign: "center", minHeight: 50 }}>
        <Typography variant="h6" noWrap title={title}>
          {title}
        </Typography>
      </CardContent>
    </>
  )

  return (
    <Card
      sx={{
        maxWidth: 360,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {clickable ? (
        <CardActionArea onClick={onClick}>{CardBody}</CardActionArea>
      ) : (
        CardBody
      )}

      {(onBuyNow || onViewDetails) && (
        <CardActions
          sx={{ justifyContent: "center", gap: 2, mt: "auto", mb: 1 }}
        >
          {onBuyNow && (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={onBuyNow}
            >
              Buy Now
            </Button>
          )}
          {onViewDetails && (
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  )
}

export default CategoryCard
