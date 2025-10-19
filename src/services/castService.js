import Cast from "../models/Cast.js";

function create(castData) {
    return Cast.create(castData);
}

function getAll() {
    return Cast.find();
}

export default {
    create, getAll
}