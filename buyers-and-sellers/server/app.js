const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const md5 = require('md5');

const app = express();

app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()

// Create connections
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "home_listings"
});

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connection done!");
});

// Create DB
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE home_listings";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Database Created!!!");
    });
});

// Create table
app.get("/createusertable", (req, res) => {
    let sql =
        "CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), role VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("User table Created!!!");
    });
});

app.get("/createhometable", (req, res) => {
    let sql =
        "CREATE TABLE homes(id int AUTO_INCREMENT, location VARCHAR(255), age DECIMAL, floor_plan FLOAT, bedroom_no DECIMAL, additional_facilities VARCHAR(255), have_garden BOOLEAN, have_parking BOOLEAN, proximity_facilities VARCHAR(255), proximity_mainroad BOOLEAN, value FLOAT, tax FLOAT, PRIMARY KEY(id))"
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Home table Created!!!");
    });
});

app.get("/createhomeandsellertable", (req, res) => {
    let sql =
        "CREATE TABLE home_seller(id int AUTO_INCREMENT, user_id int, home_id int, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (home_id) REFERENCES homes(id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Home & Seller table Created!!!");
    });
});

app.get("/createhomeandbuyertable", (req, res) => {
    let sql =
        "CREATE TABLE home_buyer(id int AUTO_INCREMENT, user_id int, home_id int, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (home_id) REFERENCES homes(id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Home & Buyer table Created!!!");
    });
});

// Sign-up user
app.post("/signup", jsonParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const role = req.body.role;

    // Check if username has already exists
    let checkExistSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(checkExistSql, (err, result) => {
        if (result.length) {
            res.send({ isSuccess: false, message: "This username has already been taken!" });
        } else {
            const encryptedPassword = md5(password);
            let createUserSql = `INSERT INTO users (username, password, email, firstname, lastname, role) VALUES ("${username}", "${encryptedPassword}", "${email}", "${firstname}", "${lastname}", "${role}")`
            db.query(createUserSql, req.body, (err, result) => {
                if (err) throw err;
                res.send({ isSuccess: true, message: "User signed-up successfully!!!" });
            });
        }
    });
});

// Login user
app.post("/login", jsonParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const encryptedPassword = md5(password);

    let checkExistSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(checkExistSql, (err, result) => {
        if (result.length) {
            const foundAccount = result[0];
            if (foundAccount.password === encryptedPassword) {
                const responseResult = {
                    username: foundAccount.username,
                    email: foundAccount.email,
                    firstname: foundAccount.firstname,
                    lastname: foundAccount.lastname,
                    role: foundAccount.role
                }
                res.send({ isSuccess: true, message: "", user: responseResult });
            } else {
                res.send({ isSuccess: false, message: "Username or Password is not right. Please try again!" });
            }
        } else {
            res.send({ isSuccess: false, message: "Username or Password is not right. Please try again!" });
        }
    });
});

// Register home
app.post("/home/register", jsonParser, (req, res) => {
    const username = req.body.username;
    const location = req.body.location;
    const age = req.body.age;
    const floorPlan = req.body.floorPlan;
    const bedroomNo = req.body.bedroomNo;
    const additionalFacilities = req.body.additionalFacilities;
    const haveGarden = req.body.haveGarden;
    const haveParking = req.body.haveParking;
    const proximityFacilities = req.body.proximityFacilities;
    const proximityMainroad = req.body.proximityMainroad;
    const value = req.body.value;
    const tax = value * 0.07;

    let userId = null;
    let newHomeId = null;
    let getUserSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(getUserSql, (err, result) => {
        if (err) throw err;
        userId = result[0].id;

        let createHomeSql = `INSERT INTO homes (location, age, floor_plan, bedroom_no, additional_facilities, have_garden, have_parking, proximity_facilities, proximity_mainroad, value, tax) VALUES ("${location}", ${age}, ${floorPlan}, ${bedroomNo}, "${additionalFacilities}", ${haveGarden}, ${haveParking}, "${proximityFacilities}", ${proximityMainroad}, ${value}, ${tax})`
        db.query(createHomeSql, (err, result) => {
            if (err) throw err;
            newHomeId = result.insertId;

            let createHomeSellerSql = `INSERT INTO home_seller (user_id, home_id) VALUES (${userId}, ${newHomeId})`;
            db.query(createHomeSellerSql, (err, result) => {
                if (err) throw err;
                res.send({ isSuccess: true, message: 'Register home successfully!' })
            });
        });
    });
});

// Get home by username
app.get("/home/getAllByUser", (req, res) => {
    const username = req.query.username;
    let userId = null;
    let userRole = '';
    let responseResult = [];

    let getUserSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(getUserSql, (err, result) => {
        if (err) throw err;
        userId = result[0].id;
        userRole = result[0].role;

        if (userRole === 'seller') {
            let getAllHomeBySellerUserSql = `SELECT * FROM homes LEFT JOIN home_seller ON homes.id = home_seller.home_id LEFT JOIN users ON users.id = home_seller.user_id WHERE users.id=${userId}`;
            db.query(getAllHomeBySellerUserSql, (err, result) => {
                if (err) throw err;
                responseResult = result.map((data) => {
                    return {
                        id: data.home_id,
                        seller: `${data.firstname} ${data.lastname}`,
                        sellerUserId: data.user_id,
                        location: data.location,
                        age: data.age,
                        floorPlan: data.floor_plan,
                        bedroomNo: data.bedroom_no,
                        additionalFacilities: data.additional_facilities,
                        haveGarden: data.have_garden,
                        haveParking: data.have_parking,
                        proximityFacilities: data.proximity_facilities,
                        proximityMainroad: data.proximity_mainroad,
                        value: data.value,
                        tax: data.tax
                    }
                });

                res.send({ isSuccess: true, message: 'Get home successfully!', home: responseResult });
            });
        } else if (userRole === 'buyer') {
            let getAllHomeByBuyerUserSql = `SELECT * FROM homes LEFT JOIN home_seller ON homes.id = home_seller.home_id LEFT JOIN users ON users.id = home_seller.user_id;`
            db.query(getAllHomeByBuyerUserSql, (err, result) => {
                if (err) throw err;
                responseResult = result.map((data) => {
                    return {
                        id: data.home_id,
                        seller: `${data.firstname} ${data.lastname}`,
                        sellerUserId: data.user_id,
                        location: data.location,
                        age: data.age,
                        floorPlan: data.floor_plan,
                        bedroomNo: data.bedroom_no,
                        additionalFacilities: data.additional_facilities,
                        haveGarden: data.have_garden,
                        haveParking: data.have_parking,
                        proximityFacilities: data.proximity_facilities,
                        proximityMainroad: data.proximity_mainroad,
                        value: data.value,
                        tax: data.tax
                    }
                });

                res.send({ isSuccess: true, message: 'Get home successfully!', home: responseResult });
            });
        }
    });
});

// Get home detail by id
app.get('/home/detail/:homeId', (req, res) => {
    const homeId = req.params.homeId;
    let getHomeByIdSql = `SELECT * FROM homes LEFT JOIN home_seller ON homes.id = home_seller.home_id LEFT JOIN users ON users.id = home_seller.user_id WHERE homes.id=${homeId}`;
    db.query(getHomeByIdSql, (err, result) => {
        if (err) throw err;
        const data = result[0];
        const responseResult = {
            id: data.home_id,
            seller: `${data.firstname} ${data.lastname}`,
            sellerUserId: data.user_id,
            location: data.location,
            age: data.age,
            floorPlan: data.floor_plan,
            bedroomNo: data.bedroom_no,
            additionalFacilities: data.additional_facilities,
            haveGarden: data.have_garden,
            haveParking: data.have_parking,
            proximityFacilities: data.proximity_facilities,
            proximityMainroad: data.proximity_mainroad,
            value: data.value,
            tax: data.tax
        }
        res.send({ isSuccess: true, message: 'Get home successfully!', home: responseResult });
    });
});

// Update home detail info
app.patch('/home/update', jsonParser, (req, res) => {
    const homeId = req.body.homeId;
    const location = req.body.location;
    const age = req.body.age;
    const floorPlan = req.body.floorPlan;
    const bedroomNo = req.body.bedroomNo;
    const additionalFacilities = req.body.additionalFacilities;
    const haveGarden = req.body.haveGarden;
    const haveParking = req.body.haveParking;
    const proximityFacilities = req.body.proximityFacilities;
    const proximityMainroad = req.body.proximityMainroad;
    const value = req.body.value;
    const tax = req.body.tax;

    let updateHomeSql = `UPDATE homes SET location="${location}", age=${age}, floor_plan=${floorPlan}, bedroom_no=${bedroomNo}, additional_facilities="${additionalFacilities}", have_garden=${haveGarden}, have_parking=${haveParking}, proximity_facilities="${proximityFacilities}", proximity_mainroad=${proximityMainroad}, value=${value}, tax=${tax} WHERE id=${homeId}`;
    db.query(updateHomeSql, (err, result) => {
        if (err) throw err;
        res.send({ isSuccess: true, message: 'Update home successfully!' })
    });
});

// Delete home
app.delete('/home/delete/:homeId', (req, res) => {
    const homeId = req.params.homeId;
    let deleteHomeBuyerSql = `DELETE FROM home_buyer WHERE home_id=${homeId}`;
    db.query(deleteHomeBuyerSql, (err, result) => {
        if (err) throw err;
        let deleteHomeSellerSql = `DELETE FROM home_seller WHERE home_id=${homeId}`;
        db.query(deleteHomeSellerSql, (err, result) => {
            if (err) throw err;
            let deleteHomeByIdSql = `DELETE FROM homes WHERE id="${homeId}"`;
            db.query(deleteHomeByIdSql, (err, result) => {
                if (err) throw err;
                res.send({ isSuccess: true, message: 'Delete home successfully!' });
            });
        });
    });
});

// Add home to wishlist
app.post('/home/wishlist/', jsonParser, (req, res) => {
    const username = req.body.username;
    const homeId = req.body.homeId;
    let userId = null;
    let getUserSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(getUserSql, (err, result) => {
        if (err) throw err;
        userId = result[0].id;
        // Check if this home already in wishlist
        let checkHomeWishlistSql = `SELECT * FROM home_buyer WHERE home_id=${homeId} AND user_id=${userId}`;
        db.query(checkHomeWishlistSql, (err, result) => {
            if (err) throw err;
            if (result.length) {
                res.send({ isSuccess: false, message: 'This home is already in your wishlist!' })
            } else {
                let createHomeBuyerSql = `INSERT INTO home_buyer (user_id, home_id) VALUES (${userId}, ${homeId})`;
                db.query(createHomeBuyerSql, (err, result) => {
                    if (err) throw err;
                    res.send({ isSuccess: true, message: 'Add to wishlist successfully!' })
                });
            }
        });
    });
});

// Get buyer wishlist
app.get('/home/wishlist/:username', (req, res) => {
    const username = req.params.username;
    let userId = null;
    let responseResult = [];

    let getUserSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(getUserSql, (err, result) => {
        if (err) throw err;
        userId = result[0].id;
        let getAllHomeBySellerUserSql = `SELECT * FROM homes LEFT JOIN home_buyer ON homes.id = home_buyer.home_id LEFT JOIN users ON users.id = home_buyer.user_id WHERE users.id=${userId}`;
        db.query(getAllHomeBySellerUserSql, (err, result) => {
            if (err) throw err;
            responseResult = result.map((data) => {
                return {
                    id: data.home_id,
                    seller: `${data.firstname} ${data.lastname}`,
                    sellerUserId: data.user_id,
                    location: data.location,
                    age: data.age,
                    floorPlan: data.floor_plan,
                    bedroomNo: data.bedroom_no,
                    additionalFacilities: data.additional_facilities,
                    haveGarden: data.have_garden,
                    haveParking: data.have_parking,
                    proximityFacilities: data.proximity_facilities,
                    proximityMainroad: data.proximity_mainroad,
                    value: data.value,
                    tax: data.tax
                }
            });

            res.send({ isSuccess: true, message: 'Get home successfully!', home: responseResult });
        });
    });
});

// Remove home from wishlist
app.delete('/home/remove-wishlist/:username/:homeId', jsonParser, (req, res) => {
    const username = req.params.username;
    const homeId = req.params.homeId;
    let userId = null;
    let getUserSql = `SELECT * FROM users WHERE username="${username}"`;
    db.query(getUserSql, (err, result) => {
        if (err) throw err;
        userId = result[0].id;
        let removeHomeWishlistByIdSql = `DELETE FROM home_buyer WHERE home_id="${homeId}" AND user_id="${userId}"`;
        db.query(removeHomeWishlistByIdSql, (err, result) => {
            if (err) throw err;
            res.send({ isSuccess: true, message: 'Remove home from wishlist successfully!' });
        });
    });
});

// Get all users
app.get('/admin/allUser', (req, res) => {
    let getUserSql = `SELECT * FROM users`;
    db.query(getUserSql, (err, result) => {
        if (err) throw err;
        const responseResult = result.map(user => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            }
        })
        res.send({ isSuccess: true, message: 'User fetch successfully!', user: responseResult });
    });
});

// Get user by id
app.get('/admin/user/:userId', (req, res) => {
    const userId = req.params.userId;
    let getUserByIdSql = `SELECT * FROM users WHERE id="${userId}"`;
    db.query(getUserByIdSql, (err, result) => {
        if (err) throw err;
        const user = result[0];
        const responseResult = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role
        }

        res.send({ isSuccess: true, message: 'User fetch successfully!', user: responseResult });
    });
})

// Update user info
app.patch('/admin/user/edit', jsonParser, (req, res) => {
    const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    let updateUserSql = `UPDATE users SET username="${username}", firstname="${firstname}", lastname="${lastname}", email="${email}"`;
    if (password) {
        const encryptedPassword = md5(password);
        updateUserSql += `, password="${encryptedPassword}"`;
    }

    updateUserSql += ` WHERE id=${userId}`;
    db.query(updateUserSql, (err, result) => {
        if (err) throw err;
        res.send({ isSuccess: true, message: 'Update user successfully!' })
    });
})

// Delete user by id
app.delete('/admin/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    let userRole = '';

    let getUserByIdSql = `SELECT * FROM users WHERE id="${userId}"`;
    db.query(getUserByIdSql, (err, result) => {
        if (err) throw err;
        userRole = result[0].role;

        if (userRole === 'buyer') {
            let deleteWishlistSql = `DELETE FROM home_buyer WHERE user_id="${userId}"`;
            db.query(deleteWishlistSql, (err, result) => {
                if (err) throw err;
                let deleteUserSql = `DELETE FROM users WHERE id=${userId}`;
                db.query(deleteUserSql, (err, result) => {
                    if (err) throw err;
                    res.send({ isSuccess: true, message: 'User delete successfully!' });
                });
            });
        } else if (userRole === 'seller') {
            let getRelatedHomeSql = `SELECT * FROM homes LEFT JOIN home_seller ON homes.id = home_seller.home_id LEFT JOIN users ON users.id = home_seller.user_id WHERE users.id=${userId}`
            db.query(getRelatedHomeSql, (err, result) => {
                if (err) throw err;
                if (result.length) {
                    let deleteHomeSql = `DELETE FROM homes WHERE id IN ( `;
                    let deleteHomeBuyerSql = `DELETE FROM home_buyer WHERE home_id IN ( `;
                    result.map(home => {
                        deleteHomeSql += `${home.home_id}, `;
                        deleteHomeBuyerSql += `${home.home_id}, `;
                    });
                    deleteHomeSql = deleteHomeSql.slice(0, -2);
                    deleteHomeBuyerSql = deleteHomeBuyerSql.slice(0, -2);
                    deleteHomeSql += `)`;
                    deleteHomeBuyerSql += `)`;

                    let deleteHomeSellerSql = `DELETE FROM home_seller WHERE user_id=${userId}`;
                    db.query(deleteHomeSellerSql, (err, result) => {
                        if (err) throw err;
                        db.query(deleteHomeBuyerSql, (err, result) => {
                            if (err) throw err;
                            db.query(deleteHomeSql, (err, result) => {
                                if (err) throw err;
                                let deleteUserSql = `DELETE FROM users WHERE id=${userId}`;
                                db.query(deleteUserSql, (err, result) => {
                                    if (err) throw err;
                                    res.send({ isSuccess: true, message: 'User delete successfully!' });
                                });
                            });
                        });
                    });
                }
            });
        } else if (userRole === 'admin') {
            res.send({ isSuccess: false, message: 'You cannot delete yourself!' })
        }
    });
});

app.listen("3001", () => {
    console.log("Successfully connect to server on port 3001");
});