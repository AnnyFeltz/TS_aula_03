const criar  = (req, res) => {
    const { titulo, autor} = req.body;
    res.status(201).json({ titulo, autor });
}

module.exports = { criar };