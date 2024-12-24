module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://test1:test1@localhost:27017/cafeteria?authSource=admin',
    secretOrKey: process.env.SECRET_OR_KEY || 'secret'
  };