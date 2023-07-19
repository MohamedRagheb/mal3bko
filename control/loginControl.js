const loginUser = async function (req, res) {
  const name = req.method;
  console.log(name)
  return res.status(200).json({ "name": name });
};
module.exports = { loginUser };
