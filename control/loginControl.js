const loginUser = async function (req, res) {
    const name = req;
    console.log(name);
    if (name.req) return res.status(200).json({ name: name })
}
    module.exports = { loginUser }
