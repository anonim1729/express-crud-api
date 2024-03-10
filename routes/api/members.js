const express = require('express');
const members = require('../../Members')
const router = express.Router();
const uuid = require('uuid');

// gets all the members
router.get('/', (req, res) => {
    res.json(members);
})

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter((p) => p.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ message: `member not found with id ${req.params.id}` })
    }
})

// create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'please include name and email' });
    }

    members.push(newMember);
    res.json(members);
})

//update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    let updMember;
    if (found) {
        members.forEach(member => {

            if (member.id === parseInt(req.params.id)) {
                member.name = member.name = req.body.name ? req.body.name : member.name;
                member.email = req.body.email ? req.body.email : member.email;
                member.status = req.body.status ? req.body.status : member.status;
                updMember = member;
            }
        });
        res.json({ message: "member updated", updMember });
    }
    else {
        res.status(400).json({ message: `member not found with id ${req.params.id}` })
    }
})
module.exports = router;