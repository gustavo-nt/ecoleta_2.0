function updatePoint(db, place) {
    return db.run(`
        UPDATE places
        SET image = "${place.image}",
            name = "${place.name}",
            whats = "${place.whats}",
            email = "${place.email}",
            lat = "${place.lat}",
            lng = "${place.lng}",
            uf = "${place.uf}",
            state = "${place.state}",
            city = "${place.city}",
            about = "${place.about}",
            items = "${place.items}"
        WHERE
            id = "${place.id}"
    `)
};

module.exports = updatePoint;