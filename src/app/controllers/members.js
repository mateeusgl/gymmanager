const { age, date } = require("../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("members/index");
  },
  create (req, res) { 
    return res.render("members/create"); 
  },
  show (req, res) {
    
    return res.render("members/show")
  },
  post (req, res) {
    const keys = Object.keys(req.body); // We are catching all the values of form;
  
    for (key of keys) {   // Using the expression FOR to verify if inputs is filled;
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }
    
    return
  },
  edit (req, res) {
    
    return res.render("members/edit")
  },
  put (req, res) {
    const keys = Object.keys(req.body); // We are catching all the values of form;
  
    for (key of keys) {   // Using the expression FOR to verify if inputs is filled;
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    return
  },
  delete (req, res) {
    return
  }
}

