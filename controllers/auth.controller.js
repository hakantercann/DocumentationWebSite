

exports.allAccess = (req, res) =>{
    res.status(200).send("Public content");
}
exports.adminAccess = (req, res) =>{
    res.status(200).send("admin content");
}
exports.userAccess = (req, res) =>{
    res.status(200).send("user content");
}
