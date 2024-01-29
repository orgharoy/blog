import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';
import Blog from './blogs.js';

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Favorite.belongsTo(Blog, { foreignKey: 'blogId' });

Blog.hasMany(Favorite, { foreignKey: 'blogId' });

export default Favorite;