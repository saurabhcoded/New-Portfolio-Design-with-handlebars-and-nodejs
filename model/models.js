const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  image: String,
  icon: String,
  paragraph1: String,
  paragraph2: String,
  paragraph3: String,
  created_on: {
    type: String,
    default: new Date().toDateString(),
  },
  update_on: {
    type: String,
    default: new Date().toDateString(),
  },
});
const experienceSchema = new mongoose.Schema({
  companyname: String,
  place: String,
  position: String,
  image: String,
  duration: String,
  type: String,
  website: String,
  created_on: {
    type: String,
    default: new Date().toDateString(),
  },
  update_on: {
    type: String,
    default: new Date().toDateString(),
  },
});
const certificateSchema = new mongoose.Schema({
  title: String,
  authority: String,
  image: String,
  code: String,
  date: String,
  created_on: {
    type: String,
    default: new Date().toDateString(),
  },
  update_on: {
    type: String,
    default: new Date().toDateString(),
  },
});
const workSchema = new mongoose.Schema({
  title: String,
  slug: String,
  datestart: Date,
  dateend: Date,
  images: Array,
  image: String,
  tags: Array,
  paragraph1: String,
  paragraph2: String,
  paragraph3: String,
  created_on: {
    type: String,
    default: new Date().toDateString(),
  },
  update_on: {
    type: String,
    default: new Date().toDateString(),
  },
});

module.exports = {
  WORKMODEL: mongoose.model("work", workSchema),
  SERVICEMODEL: mongoose.model("service", serviceSchema),
  EXPERIENCEMODEL: mongoose.model("experience", experienceSchema),
  CERTMODEL: mongoose.model("certificate", certificateSchema),
};
