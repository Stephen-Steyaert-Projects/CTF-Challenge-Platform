export default function admin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
}
