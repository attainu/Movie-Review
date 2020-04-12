const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Review = require('./review')
const Movie = require('./movie')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
        // validate(value) {
        //     if (value != true) {
        //         throw new Error('Admin rights are required')
        //     }
        // }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

adminSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'owner'
})

adminSchema.virtual('movies', {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'addedBy'
})

// hiding private data from client-side by deleting them from the admin object
adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens

    return adminObject
}

//generating Auth token
adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({ _id: admin._id.toString() }, 'movie-review')

    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return admin
}

// Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})

// Delete admin reviews when admin is removed
adminSchema.pre('remove', async function (next) {
    const admin = this
    await Review.deleteMany({ owner: admin._id })
    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin