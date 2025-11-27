const userModal = require("../../models/user");
const env = require('dotenv').config();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require("nodemailer");

exports.register = async(request, response) => {

    try {
        var dataSave = request.body;
        dataSave.role_type = 'users';
        dataSave.password = await bcrypt.hash(request.body.password, saltRounds);

        new userModal(dataSave).save()
        .then((result) => {
            var token = jwt.sign({ userInfo : result }, process.env.secret_key);

            const data = {
                _status : true,
                _message : 'Register succussfully !',
                _token : token,
                _data : result
            }

            response.send(data);
        })
        .catch((error) => {
            console.log(error);
            var errors = {};
            for (var i in error.errors) {
                errors[i] = error.errors[i].message;
            }

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: errors,
                _data: null
            }

            response.send(data);
        })
    } catch (error) {
        console.log(error);
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }

        response.send(data);
    }
}

exports.login = async(request, response) => {

    const checkEmail = await userModal.findOne({ email : request.body.email });

    if(!checkEmail){
        const data = {
            _status : false,
            _message : 'Invalid Email Address !',
            _data : ''
        }

        response.send(data);
    }

    const checkPassword = await bcrypt.compare(request.body.password, checkEmail.password);

    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !',
            _data : ''
        }

        response.send(data);
    }

    if(checkEmail.status == false){
        const data = {
            _status : false,
            _message : 'Acoount is inactive. Please contact admin !',
            _data : ''
        }

        response.send(data);
    }

    // var token = jwt.sign({ userInfo : checkEmail }, process.env.secret_key, { expiresIn: 60 * 1 });

    var token = jwt.sign({ userInfo : checkEmail }, process.env.secret_key);

    const data = {
        _status : true,
        _message : 'Login succussfully !',
        _token : token,
        _data : checkEmail
    }

    response.send(data);
}

exports.viewProfile = async(request, response) => {

    try {
        token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);

        if(!decoded){
            const data = {
                _status : false,
                _message : 'Invalid token value !',
                _data : ''
            }

            response.send(data);
        }

        console.log(decoded.userInfo);

        await userModal.findById(decoded.userInfo._id)
        .then((result) => {
            if(result){
                const data = {
                    _status: true,
                    _message: 'Record found succussfully !!',
                    _image_path : process.env.user_image,
                    _data: result
                }
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record found !!',
                    _data: result
                }
                response.send(data);
            }
            
        })
        .catch((error) => {
            console.log(error)
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: error,
                _data: null
            }
            response.send(data);
        });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.updateProfile = async(request, response) => {
    try {
        token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);

        if(!decoded){
            const data = {
                _status : false,
                _message : 'Invalid token value !',
                _data : ''
            }

            response.send(data);
        }

        var dataSave = request.body;

        if(request.file){
            dataSave.image = request.file.filename;
        }

        await userModal.updateOne({
            _id : decoded.userInfo._id
        }, {
            $set : dataSave
        })
        .then((result) => {
            if(result){
                const data = {
                    _status: true,
                    _message: 'Record update succussfully !!',
                    _image_path : process.env.user_image,
                    _data: result
                }
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record found !!',
                    _data: result
                }
                response.send(data);
            }
            
        })
        .catch((error) => {
            console.log(error)
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: error,
                _data: null
            }
            response.send(data);
        });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.changePassword = async(request, response) => {
    try {
        token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);

        if(!decoded){
            const data = {
                _status : false,
                _message : 'Invalid token value !',
                _data : ''
            }

            response.send(data);
        }

        var userInfo = await userModal.findById(decoded.userInfo._id);

        console.log(userInfo);

        const checkPassword = await bcrypt.compare(request.body.current_password, userInfo.password);

        if(!checkPassword){
            const data = {
                _status : false,
                _message : 'Password is incorrect !',
                _data : ''
            }

            response.send(data);
        }

        if(request.body.new_password != request.body.confirm_password){
            const data = {
                _status : false,
                _message : 'New Password and Confirm Password must be same !',
                _data : ''
            }

            response.send(data);
        }

        if(request.body.current_password == request.body.confirm_password){
            const data = {
                _status : false,
                _message : 'Current Password and New Password cannot be same !',
                _data : ''
            }

            response.send(data);
        }

        password = await bcrypt.hash(request.body.new_password, saltRounds);

        await userModal.updateOne({
            _id : decoded.userInfo._id
        }, {
            $set : {
                password : password
            }
        })
        .then((result) => {
            if(result){
                const data = {
                    _status: true,
                    _message: 'Password change succussfully !!',
                    _data: result
                }
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record found !!',
                    _data: result
                }
                response.send(data);
            }
            
        })
        .catch((error) => {
            console.log(error)
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: error,
                _data: null
            }
            response.send(data);
        });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.forgotPassword = async(request, response) => {

    const userCheck = await userModal.findOne({email : request.body.email});


    if(!userCheck){
        const data = {
            _status : false,
            _message : 'Email id does not exit  !',
            _data : ''
        }

        response.send(data);
    }
    
    // Generate a short-lived reset token (1 hour)
    try {
        const token = jwt.sign({ id: userCheck._id }, process.env.secret_key, { expiresIn: '1h' });

        // Create transporter (configure environment variables for Email and GMAIL_Password)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.GMAIL_Password,
            },
        });

        var resetUrl = `${process.env.resetUrl}${token}`

        const htmlMessage = `
            <div style="font-family: Arial, sans-serif; line-height:1.6; color:#222;">
              <h2 style="color:#333;">Reset your password</h2>
              <p>Hi ${userCheck.name || userCheck.email},</p>
              <p>We received a request to reset the password for your account. Click the button below to choose a new password. This link will expire in 1 hour.</p>
              <p><a href="${resetUrl}" style="background:#1a73e8;color:#ffffff;padding:10px 16px;border-radius:4px;text-decoration:none;display:inline-block;">Reset Password</a></p>
              <p>If you didn't request a password reset, you can safely ignore this email and your password will remain unchanged.</p>
              <p>Thanks,<br/>Support Team</p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Monsta" <${process.env.Email}>`,
            to: userCheck.email,
            subject: 'Reset your password',
            html: htmlMessage,
        });

        const data = {
            _status : true,
            _message : 'Reset email sent successfully !',
            _data : ''
        }

        response.send(data);
    } catch (error) {
        console.log('Forgot password error:', error);
        const data = {
            _status : false,
            _message : 'Mail not Send !',
            _error : error,
            _data : ''
        }

        response.send(data);
    }
}

exports.resetPassword = async(request, response) => {
    try {
        token = request.body.token;
        var decoded = jwt.verify(token, process.env.secret_key);

        if(!decoded){
            const data = {
                _status : false,
                _message : 'Invalid token value !',
                _data : ''
            }

            response.send(data);
        }

        var userInfo = await userModal.findById(decoded.id);

        console.log(userInfo);

        if(request.body.new_password != request.body.confirm_password){
            const data = {
                _status : false,
                _message : 'New Password and Confirm Password must be same !',
                _data : ''
            }

            response.send(data);
        }

        password = await bcrypt.hash(request.body.new_password, saltRounds);

        await userModal.updateOne({
            _id : decoded.id
        }, {
            $set : {
                password : password
            }
        })
        .then((result) => {
            if(result){
                const data = {
                    _status: true,
                    _message: 'Password reset succussfully !!',
                    _data: result
                }
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record found !!',
                    _data: result
                }
                response.send(data);
            }
            
        })
        .catch((error) => {
            console.log(error)
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: error,
                _data: null
            }
            response.send(data);
        });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}