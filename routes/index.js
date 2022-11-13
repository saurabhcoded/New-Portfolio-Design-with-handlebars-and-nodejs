const express = require("express");
const multer = require("multer");
const {
  SERVICEMODEL,
  EXPERIENCEMODEL,
  WORKMODEL,
  CERTMODEL,
} = require("../model/models");
const { sendEmailService } = require("../service");
const {
  postServiceController,
  postPortfolioController,
  postExperienceController,
  postCertificateController,
} = require("./route.controller");
const Router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname.replaceAll(" ", "-"));
    },
  }),
});
let service, experience, work, certificate;
async function loadData() {
  service = await SERVICEMODEL.find();
  experience = await EXPERIENCEMODEL.find();
  work = await WORKMODEL.find();
  certificate = await CERTMODEL.find();
  // console.log({ service, experience, work, certificate });
}

Router.get("/", async (req, res) => {
  await loadData();
  res.render("index", {
    active: { home: true },
    count: work.length,
    service,
    experience,
    work,
    certificate,
  });
});
Router.get("/about", async (req, res) => {
  await loadData();
  res.render("about", {
    active: { about: true },
    service,
    experience,
    work,
    certificate,
  });
});
Router.get("/contact", async (req, res) => {
  await loadData();
  res.render("contact", {
    active: { contact: true },
    service,
    experience,
    work,
    certificate,
  });
});
Router.get("/services", async (req, res) => {
  await loadData();
  res.render("services", {
    active: { services: true },
    service,
    experience,
    work,
    certificate,
  });
});
Router.get("/portfolio", async (req, res) => {
  await loadData();
  res.render("portfolio", {
    active: { portfolio: true },
    service,
    experience,
    work,
    certificate,
  });
});

//dynamic Routes
Router.get("/services/:id", async (req, res) => {
  const id = req.params.id;
  const servicedetail = await SERVICEMODEL.findOne({ slug: id });
  await loadData();
  res.render("servicedetail", {
    active: { services: true },
    servicedetail,
    service,
    experience,
    work,
    certificate,
  });
});
Router.get("/portfolio/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const portfoliodetail = await WORKMODEL.findOne({ slug: id });
  await loadData();
  console.log(portfoliodetail);
  res.render("portfoliodetail", {
    active: { portfolio: true },
    portfoliodetail,
    service,
    experience,
    work,
    certificate,
  });
});

Router.post("/contact", async (req, res) => {
  const data = req.body;
  console.log(data);
  await sendEmailService(
    "saurabhcoded@gmail.com",
    `New ${data.service} is requested by ${data.name}`,
    `Message details are as 
    Message: ${data.note},
    Name: ${data.name}, 
    Email : ${data.email}, 
    Contact : ${data.contact} , 
    Service:${data.service}`
  );
  res.redirect("/");
});
//Admin Routes
Router.post("/services", upload.single("image"), postServiceController);
Router.post("/portfolio", upload.array("image", 5), postPortfolioController);
Router.post("/experience", upload.single("image"), postExperienceController);
Router.post("/certificate", upload.single("image"), postCertificateController);

module.exports = Router;
module.exports.loadData = loadData;
