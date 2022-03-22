const { age, date } = require("../lib/utils");
const Instructor = require("../models/instructor")

module.exports = {
  index(req, res) {
    Instructor.all((instructors)=> {
      return res.render("instructors/index", {instructors});
    })
  },
  create (req, res) { 
    return res.render("instructors/create"); 
  },
  post (req, res) {
    const keys = Object.keys(req.body); // We are catching all the values of form;
  
    for (key of keys) {   // Using the expression FOR to verify if inputs is filled;
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Instructor.create(req.body, (instructor)=>{
      return res.redirect(`/instructors/${instructor.id}`)
    })
  },
  show (req, res) {
    Instructor.find(req.params.id, (instructor)=>{
      if(!instructor) return res.send("Instructor not found!")

      instructor.age= age(instructor.birth)
      instructor.services = instructor.services.toString().split(",") // toString() for function the split()
      instructor.created_at = date(instructor.created_at).format
     
      return res.render("instructors/show", { instructor })
    })
  },
  edit (req, res) {
    Instructor.find(req.params.id, (instructor)=>{
      if(!instructor) return res.send("Instructor not found!")

      instructor.birth= date(instructor.birth).iso
      
      return res.render("instructors/edit", { instructor })
    })
  },
  put (req, res) {
    const keys = Object.keys(req.body); // We are catching all the values of form;
  
    for (key of keys) {   // Using the expression FOR to verify if inputs is filled;
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Instructor.update(req.body, () => {
      return res.redirect(`/instructors/${req.body.id}`)
    })

    return
  },
  delete (req, res) {
    Instructor.delete(req.body.id, () => {
      return res.redirect(`/instructors`)
    })
  }
}

