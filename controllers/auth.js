const User = require('../models/users'); // Ensure the path is correct
const bcrypt = require('bcryptjs'); //เข้ารหัส
const jwt = require('jsonwebtoken'); //สร้าง token
exports.regis = async (req, res) => {
    try {
        const { name, password } = req.body;
        var user = await User.findOne({ name });
        if (user) {
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            name,
            password
        });
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.send("register success");
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.login = async (req, res) => {
    try {
        //1check correct username and password
        const { name, password } = req.body;
        var user = await User.findOneAndUpdate({ name }, { new: true });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Password invalid !');
            }
            //2 payload ข้อมูลที่เตรียมเข้้ารหัส
            var payload = {
                user: {
                    name: user.name,
                }
            }
            // res.send(payload);
            //3 create token
            jwt.sign(payload, 'jwtsecret', { expiresIn: 20 }, (err, token) => {
                if (err) throw err;
                res.status(200).send({ token, payload });  
            });

        } else {
            return res.status(400).send('User not found');
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}