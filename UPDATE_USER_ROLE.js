// Run this in your backend MongoDB shell or create an API endpoint to update the role

// MongoDB Shell Command:
db.users.updateOne(
  { email: "varunbhole@gmail.com" },
  { $set: { role: "admin" } }
)

// OR if you have mongoose in your backend, create a temporary route:
// PUT /api/users/make-admin/:email
// router.put('/make-admin/:email', async (req, res) => {
//   await User.findOneAndUpdate(
//     { email: req.params.email },
//     { role: 'admin' }
//   );
//   res.json({ success: true });
// });

// Then call: PUT http://localhost:5000/api/users/make-admin/varunbhole@gmail.com
