function savePoint(db, place) {
    return db.run(`
        INSERT INTO places (
            image,
            name,
            whats,
            email,
            lat,
            lng,
            uf,
            state,
            city,
            about,
            items
        ) VALUES (
            "${place.image}",
            "${place.name}",
            "${place.whats}",
            "${place.email}",
            "${place.lat}",
            "${place.lng}",
            "${place.uf}",
            "${place.state}",
            "${place.city}",
            "${place.about}",
            "${place.items}"
        );
    `)
};

module.exports = savePoint;