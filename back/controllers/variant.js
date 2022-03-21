const Variant = require('../models/variant');

const Op = require('sequelize');

exports.getVariants = (req, res) => {
    Variant.findAll()
        .then((variants) => {
            res.status(200).send(variants);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
};

exports.addVariant = (req, res) => {
    const addingName = req.body.name;
    const addingText = req.body.text;
    const addingOnsetDate = req.body.onset_date;

    Variant.create({
        name: addingName,
        text: addingText,
        onset_date: addingOnsetDate
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
};

exports.updateVariant = (req, res) => {
    const id = req.params.id;
    const updatingName = req.body.name;
    const updatingText = req.body.text;
    const updatingOnsetDate = req.body.onset_date;

    Variant.findByPk(id)
        .then((variant) => {
            variant.name = updatingName;
            variant.text = updatingText;
            variant.onset_date = updatingOnsetDate;
            return variant.save();
        })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
};

exports.deleteVariant = (req, res) => {
    const id = req.params.id;

    Variant.findByPk(id)
        .then((variant) => {
            return variant.destroy();
        })
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
