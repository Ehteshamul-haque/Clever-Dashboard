const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'
const app = express();

app.use(express.json());
app.use(cors());

//REGISTER && JWT @POST
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result}, jwtKey, {expiresIn: '2h'}, (err, token) => {
    if(err){
      res.send({result: "Something went wrong, Please try again!"})
    }
    res.send({result, auth: token})
  })
});
//LOGIN &&  JWT @POST
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user}, jwtKey, {expiresIn: '2h'}, (err, token) => {
        if(err){
          res.send({result: "Something went wrong, Please try again!"})
        }
        res.send({user, auth: token})
      })
    } else {
      res.send({ result: "No User Found!" });
    }
  } else {
    res.send({ result: "No User Found!" });
  }
});
//CREATE PRODUCT @POST
app.post("/product/add", verifyToken, async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});
//GET ALL PRODUCTS @GET
app.get("/product/all", verifyToken, async (req, res) => {
  const result = await Product.find();
  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    res.status(500).json({ result: "No Product Found!" });
  }
});
//DELETE PRODUCT @DELETE
app.delete("/product/delete/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  if (result.deletedCount > 0) {
    res
      .status(200)
      .json({ result: `Product Id : ${req.params.id} Successfully Deleted!` });
  } else {
    res.status(500).json({ result: "Product Not Found!" });
  }
});
//GET SINGLE PRODUCT @GET
app.get("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  res.status(200).json(result);
});
//Update Product @PUT
app.put("/product/update/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});
//Search Product @GET
app.get("/product/search/:key", verifyToken , async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req,res,next) {
  let token = req.headers['authorization']
  if(token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err,valid) => {
      if(err){
        res.status(401).send({result: 'Please provide valid token.'})
      }else {
        next()
      }
    })
  }else{
    res.status(403).send({result: 'Please add token with header'})
  }
}
app.listen(5000, () => console.log("Server is running on port 5000"));
