import Cast from "../models/Cast.js";

function create(castData) {
    return Cast.create(castData);
}

function getAll(filter = {}) {
    let query = Cast.find();
    
    if (filter.includes) {
        query = query.in('_id', filter.includes);
    }

    return query;
}

export default {
    create, getAll
}