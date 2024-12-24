module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/cafeteria',
    secretOrKey: process.env.SECRET_OR_KEY || 'secret'
  };
