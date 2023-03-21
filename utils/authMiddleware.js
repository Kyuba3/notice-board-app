const authMiddleware = (req, res, next) => {
  const user = req.session;
  if (user.login) {
    next();
  } else {
    res.status(401).send({ message: 'You are not authorized' });
  }
};

module.exports = authMiddleware;