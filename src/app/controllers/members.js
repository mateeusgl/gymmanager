const { age, date } = require("../lib/utils");
const Member = require("../models/Member")

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1 
    limit = limit || 2
    // If page = 3, offSet = 2 * (3 - 1) = 4 
    let offSet = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offSet,
      callback(members){
        const pagination = {
          total: Math.ceil(members[0].total / limit),  
          page
        }
        return res.render("members/index", { members, filter, pagination });
      }
    }

    Member.paginate(params)
  },
  create (req, res) { 
    Member.instructorsSelectOptions((options)=>{
      return res.render("members/create", {instructorOptions: options }); 
    })
  },
  post (req, res) {
    const keys = Object.keys(req.body); // We are catching all the values of form;
  
    for (key of keys) {   // Using the expression FOR to verify if inputs is filled;
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Member.create(req.body, (member)=>{
      return res.redirect(`/members/${member.id}`)
    })
  },
  show (req, res) {
    Member.find(req.params.id, (member)=>{
      if(!member) return res.send("Member not found!")

      member.birth= date(member.birth).birthDay

      return res.render("members/show", { member })
    })
  },
  edit (req, res) {
    Member.find(req.params.id, (member)=>{
      if(!member) return res.send("Member not found!")

      member.birth= date(member.birth).iso
      Member.instructorsSelectOptions((options)=>{
        return res.render("members/edit", {member, instructorOptions: options }); 
      })      
    })
  },
  put (req, res) {
    const keys = Object.keys(req.body); // We are catching all the values of form;
  
    for (let key of keys) {   // Using the expression FOR to verify if inputs is filled;
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Member.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete (req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/members`)
    })
  }
}
