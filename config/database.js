if(process.env.NODE_ENV === 'production'){module.exports = {mongodb: 'mongodb://asad1:asad1@ds147228.mlab.com:47228/vidjot-prod'}
} else {
  module.exports = {mongodb: 'mongodb://localhost/vidjot-dev'}
}