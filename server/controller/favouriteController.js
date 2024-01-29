import Favorite from "../models/favourite.js";

export const createFavourite = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({
      where: { userId, blogId },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Favorite already exists' });
    }

    const favourite = await Favorite.create({ userId, blogId });

    res.status(201).json({
      message: 'Successfully Added to Favourites',
      favourite: favourite,
    });
  } catch (error) {
    console.error('Error creating favourite:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteFavorite = async (req, res) => {
    try {
      const { userId, blogId } = req.params;

      const deletedFavorite = await Favorite.destroy({
        where: { userId, blogId },
      });
  
      if (deletedFavorite) {
        res.status(200).json({
          message: 'Successfully deleted favorite',
          userId,
          blogId,
        });
      } else {
        res.status(404).json({
          error: 'Favorite not found',
        });
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };