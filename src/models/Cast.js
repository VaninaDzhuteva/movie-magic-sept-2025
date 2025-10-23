import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cast name is required!'],
        minLength: [5, 'Name is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Name has some invalid characters!']
    },
    age: {
        type: Number,
        required: [true, 'Cast age is required!'],
        max: [120, 'Age cannot be more than 120'],
        min: [1, 'Age can not be less than 1']
    },
    born: {
        type: String,
        required: [true, 'Born age is required!'],
        min: [0, 'Born can not be less than 10'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Born has some invalid characters!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image url is required!'],
        match: [/^https?:\/\//, 'Image url is invalid!']
    },
});

const Cast = model('Cast', castSchema);

export default Cast;