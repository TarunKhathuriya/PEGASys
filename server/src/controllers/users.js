const User = require("../models/users");
const bcrypt = require("bcryptjs");
const utils = require("../utils/dev.json");
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const fs = require('fs');
const formidable = require('formidable');

var filePath;
exports.addUser = async (req, res, next) => {
  var form = new formidable.IncomingForm();
  let flag = false;
  form.parse(req, async (err, fields, files) => {
      filePath = files.file;
      let user = JSON.parse(fields.data);
      await User.find({
          'emails.genesis': user.emails.genesis
        }).then(user => {
          if(user.length > 0) {
            flag = true;
            return res.status(400).send("User already exists")
          }
        });
    if(!flag) {
    if (filePath.size == 0) {
      bcrypt.hash(user.password, 10, async (err, hash) => {
        user.password = hash;
        const newUser = new User(user);
        await newUser
          .save()
          .then((item) => res.send(item))
          .catch((err) => res.status(400).send(err));
      });
    } else {
        let s3Bucket = new AWS.S3({
          accessKeyId: utils.iAmUserKey,
          secretAccessKey: utils.iAmUserSecret,
          Bucket: utils.bucketName
        });
        s3Bucket.createBucket(function() {
          var params = {
            acl:'public-read',
            Bucket: utils.bucketName,
            Key: user.firstName+"_"+new Date().getTime()+".png",
            Body: fs.readFileSync(filePath.path)
          };
          s3Bucket.upload(params, function(err, data){
            if (err) {
              console.log("error in callback");
              console.log(err);
            }
            user.profileImageURL = data.Location;
            bcrypt.hash(user.password, 10, async (err, hash) => {
              console.log(user.profileImageURL+"====")
              user.password = hash;
              // user.userType = user.userType.sort();
              const newUser = new User(user);
              await newUser
                .save()
                .then((item) => res.send(item))
                .catch((err) => res.status(400).send(err));
            });
          })
        })
  }
}
  });
};

exports.fetchAllUsers = async (req, res, next) => {
  await User.find({
      deleted: false
    })
    .sort({
      createdDate: -1
    })
    .populate("departments")
    .populate("projects.projectId")
    .then((items) => res.send(items))
    .catch((err) => res.status(400).send(err));
};

exports.fetchAllDeletedUsers = async (req, res, next) => {
  await User.find({
      deleted: true
    })
    .sort({
      createdDate: -1
    })
    .populate("departments")
    .then((items) => res.send(items))
    .catch((err) => res.status(400).send(err));
};

exports.fetchUserById = async (req, res, next) => {
  await User.find({
      _id: req.params.id
    })
    .populate("departments")
    .populate("projects.projectId", {
      name: 1
    })
    .then((item) => res.send(item))
    .catch((err) => res.status(400).send(err));
};

exports.deleteUserById = async (req, res, next) => {
  console.log(req.body)
  await User.findOneAndUpdate({
      _id: req.body.id
    }, {
      deleted: true
    })
    .then((item) => res.send({
      _id: item._id,
      deleted: true
    }))
    .catch((err) => res.status(400).send(err));
};

exports.updateUserById = async (req, res, next) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    filePath = files.file;
    //console.log(JSON.stringify(files.file))
    let user = fields;
    user = JSON.parse(user.data);
    //console.log(JSON.parse(user.data).dates)
    if (filePath.size == 0) {
      bcrypt.hash(user.password, 10, async (err, hash) => {
          user.password = hash;
          await User.findOneAndUpdate({
            _id: req.params.id
          }, user)
            .then((item) => res.send(item))
            .catch((err) => res.status(400).send(err));
        })
    } else {
        let s3Bucket = new AWS.S3({
          accessKeyId: utils.iAmUserKey,
          secretAccessKey: utils.iAmUserSecret,
          Bucket: utils.bucketName
        });
        s3Bucket.createBucket(function() {
          var params = {
            acl:'public-read',
            Bucket: utils.bucketName,
            Key: user.firstName+"_"+new Date().getTime()+".png",
            Body: fs.readFileSync(filePath.path)
          };
          s3Bucket.upload(params, async function(err, data){
            if (err) {
              console.log("error in callback");
              console.log(err);
            }
            user.profileImageURL = data.Location;
            // bcrypt.hash(user.password, 10, async (err, hash) => {
              // user.password = hash;
              user.dates.dateOfJoin = new Date(new Date(user.dates.dateOfJoin).setHours(18, 30, 00));
              await User.findOneAndUpdate({
                _id: req.params.id
              }, user)
                .then((item) => res.send(item))
                .catch((err) => res.status(400).send(err));
            })
          // })
        })
  }
  });
};

exports.getMentees = async (req, res, next) => {
  await User.find({mentor: req.body.id}).then(users => {
    const response = []
    users.forEach(user => {
      response.push(user._id);
    })
    // console.log(response);
    return res.send(response);
  })
}

exports.loginUser = async (req, res, next) => {
  await User.findOne({
    'emails.genesis': req.body.email,
    'deleted': false
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, same) {
        if (same) {
          const secret = utils.secret;
          const token = jwt.sign({
            userId: user._id,
            role: user.userType
          }, secret, { expiresIn: 30000000000000000000000 }); 
          res.send({
            user: user,
            token: token
          });
        } else {
          res.send("Invalid password");
        }
      });
    } else {
      res.send("Invalid Email or Password");
    }
  });
}