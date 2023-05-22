const ORIGIN = '*'
const BASECLIENTURL = "https://app.ridgewoodglobal.com/"
const PORT = process.env.PORT || 8080
const EMAIL_API_KEY = "3efcaee8479fbb7422835151f6f6ac08"
const EMAIL_SECRET_KEY = "a4a869d6501f3dce6d2d13e9e5e54cdb"
const JWT_SECRET = process.env.JWT_SECRET || 'amazonpricing'
const SENDER_EMAIL = 'joe@rglobal.co.uk'
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://esaibrilliant34310:BULnW3bjQFqdZtDx@cluster0.ddglrqy.mongodb.net/AmazonPricing'
const MONGO_OPTIONS = {}
module.exports = {
  ORIGIN,
  BASECLIENTURL,
  PORT,
  JWT_SECRET,
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY,
  MONGO_URI,
  MONGO_OPTIONS,
  SENDER_EMAIL
}
