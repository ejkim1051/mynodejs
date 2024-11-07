module.exports = (sequelize, DataTypes) =>{
    const Post = sequelize.define('Post', {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        title:DataTypes.STRING,
        content:DataTypes.STRING,
        count:DataTypes.INTEGER,
    },{
        tableName:"posts"
    });
    Post.associate = function(models){
        models.Post.belongsTo(models.User);
    }
    return Post;
}