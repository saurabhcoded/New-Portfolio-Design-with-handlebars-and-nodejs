const e = require("express");
const {
  SERVICEMODEL,
  WORKMODEL,
  EXPERIENCEMODEL,
  CERTMODEL,
} = require("../model/models");

async function postServiceController(req, res) {
  if (req.file) {
    // Check For Authentication Code
    if (req.body.password === process.env.PASSWORD_ACCESS) {
      // Grab Image Link
      const image = `${req.protocol}://${req.hostname}:${
        req.socket.localPort
      }/${req.file.path.replace("public\\", "")}`;
      console.log(image);
      if (!req.body.title && !req.body.paragraph1) {
        res.status(404).json({ message: "Empty Content" });
      } else {
        const saveBody = {
          title: req.body.title,
          slug: req.body.title.replaceAll(" ", "-"),
          image: image,
          icon: req.body.icon,
          paragraph1: req.body.paragraph1,
          paragraph2: req.body.paragraph2,
          paragraph3: req.body.paragraph3,
        };
        const newService = await new SERVICEMODEL(saveBody).save();
        console.log(newService);
      }
    } else {
      res.status(404).json({ message: "Wrong Password" });
    }
  } else {
    res.status(400).json({ message: "No Image Selected" });
  }
}
async function postPortfolioController(req, res) {
  //Grab Images Links Array
  if (req.files) {
    const images = req.files.map((image) => {
      return `${req.protocol}://${req.hostname}:${
        req.socket.localPort
      }/${image.path.replace("public\\", "")}`;
    });
    console.log(images);
    if (!req.body.title && !req.body.paragraph1) {
      res.status(404).json({ message: "Empty Content" });
    } else {
      const saveBody = {
        title: req.body.title,
        slug: req.body.title.replaceAll(" ", "-"),
        images: images,
        image: images[0],
        datestart: req.body.datestart,
        dateend: req.body.dateend,
        tags: req.body.tags,
        paragraph1: req.body.paragraph1,
        paragraph2: req.body.paragraph2,
        paragraph3: req.body.paragraph3,
      };
      const newWork = await new WORKMODEL(saveBody).save();
      console.log(newWork);
    }
  } else {
    res.status(400).json({ message: "No Image Selected" });
  }
}
async function postExperienceController(req, res) {
  if (req.file) {
    // Grab Image Link
    const image = `${req.protocol}://${req.hostname}:${
      req.socket.localPort
    }/${req.file.path.replace("public\\", "")}`;
    console.log(image);
    if (!req.body) {
      res.status(404).json({ message: "Empty Content" });
    } else {
      const saveBody = {
        companyname: req.body.companyname,
        place: req.body.place,
        position: req.body.position,
        image: image,
        duration: req.body.duration,
        type: req.body.type,
        website: req.body.website,
      };
      const newExperience = await new EXPERIENCEMODEL(saveBody).save();
      console.log(newExperience);
    }
  } else {
    res.status(400).json({ message: "No Image Selected" });
  }
}
async function postCertificateController(req, res) {
  if (req.file) {
    // Grab Image Link
    const image = `${req.protocol}://${req.hostname}:${
      req.socket.localPort
    }/${req.file.path.replace("public\\", "")}`;
    console.log(image);
    if (!req.body) {
      res.status(404).json({ message: "Empty Content" });
    } else {
      const saveBody = {
        title: req.body.title,
        authority: req.body.authority,
        image: image,
        code: req.body.code,
        date: req.body.date.slice(0, 11),
      };
      const newCertificate = await new CERTMODEL(saveBody).save();
      console.log(newCertificate);
    }
  } else {
    res.status(400).json({ message: "No Image Selected" });
  }
}

module.exports = {
  postCertificateController,
  postExperienceController,
  postPortfolioController,
  postServiceController,
};
