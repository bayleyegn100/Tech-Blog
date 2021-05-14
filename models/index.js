const User = require('./User');
const BlogPost = require('./BlogPost');
const BlogComment = require('./BlogComment');
// Foreign keys and respective alias defined
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogComment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogComment.belongsTo(BlogPost, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

BlogPost.hasMany(BlogComment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

module.exports = { User, BlogPost, BlogComment };