const production={
    name: process.env.COMMERCE_ENVIRONMENT,
    session_cookie_key: process.env.COMMERCE_SESSION_COOKIE_KEY,
    db: process.env.COMMERCE_DB,
    mongo_username: process.env.MONGOATLAS_USERNAME,
    password: process.env.MONGOATLAS_PASSWORD
}

// module.exports= development;
module.exports= production;