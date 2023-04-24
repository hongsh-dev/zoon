var router = require("express").Router();
var conn = require("../lib/db")();

router.get("/send", (req, res) => {
  conn.query("SELECT * FROM projectHC.table1", function (err, rows) {
    if (err) throw err;

    if (rows[0]) console.log(rows[0]);
    res.redirect("/");
  });
});

module.exports = router;
