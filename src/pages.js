// Import Modules
const Database = require("./database/db.js");
const savePoint = require('./database/savePoint.js')
const updatePoint = require('./database/updatePoint.js')
const fs = require("fs");
const path = require('path');

module.exports = {
    index(req, res) {
        return res.render('index.html');
    },

    createPoint(req, res) {
        return res.render("create-point.html")
    },

    async savePoint(req, res) {
        const fields = req.body;

        // Function responsible for giving a space after the comma between the collection items
        function spaceItems(items) {
            let temp = new Array();

            items.split(',').forEach((value, index) => {
                if(index == 0) {
                    temp.push(value);
                } else {
                    temp.push(` ${value}`);
                }
            });

            return temp.join(',');
        }

        let items = spaceItems(fields.items);

        try {
            const db = await Database
            await savePoint(db, {
                image: req.file.filename,
                name: fields.name,
                whats: fields.whats,
                email: fields.email,
                lat: fields.lat,
                lng: fields.lng,
                uf: fields.uf,
                state: fields.state,
                city: fields.city,
                about: fields.about,
                items
            })

            console.log("Cadastrado com Sucesso");
            return res.render("create-point.html", {saved: true});
        } catch (err) {
            console.log(err);
            return res.render("create-point.html", {error: true});
        }
    },

    async updatePoint(req, res) {
        const fields = req.body;

        // Function responsible for giving a space after the comma between the collection items
        function spaceItems(items) {
            let temp = new Array();

            items.split(',').forEach((value, index) => {
                if(index == 0) {
                    temp.push(value);
                } else {
                    temp.push(` ${value}`);
                }
            });

            return temp.join(',');
        }

        // Delet image
        function changeImage(multer) {
            let image;

            if(!multer) {
                image = req.body.oldImage;
            } else {
                let route = path.resolve(__dirname, '..', 'public', 'assets', 'uploads');
                image = req.file.filename;

                fs.unlink(`${route}/${req.body.oldImage}`, function (err) {
                    if(err) {
                        throw err;
                    } 
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }

            return image;
        }
        
        let items = spaceItems(fields.items);
        let image = changeImage(req.file);
        let search = req.query.search;

        try {
            const db = await Database
            await updatePoint(db, {
                id: fields.id,
                image: image,
                name: fields.name,
                whats: fields.whats,
                email: fields.email,
                lat: fields.lat,
                lng: fields.lng,
                uf: fields.uf,
                state: fields.state,
                city: fields.city,
                about: fields.about,
                items
            })

            return res.redirect('/search?search=' + search);
        } catch (error) {
            console.log(error);
            return res.redirect('/search?search=' + search);
        }
    },

    async search(req, res) {
        const search = req.query.search;
    
        if(search === "") {
            return res.render("places.html", {total: 0});
        }

        try {
            const db = await Database;

            db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
                if(err) {
                    return console.log(err);
                }
        
                const total = rows.length;
        
                // View Page HTML with data table
                return res.render("places.html", {places: rows, total, search});
            });
        } catch {
            console.log('Erro no banco de dados!');
        }
    },

    async point(req, res) {
        const id = req.query.id;
        const search = req.query.search;

        try {
            const db = await Database;

            db.all(`SELECT * FROM places WHERE id = "${id}"`, function(err, rows) {
                if(err) {
                    return console.log(err);
                }

                // View Page HTML with data table
                return res.render("place.html", { place: rows[0], search});
            });
        } catch {
            console.log('Erro no banco de dados!');
        }
    },

    async editSearch(req, res) {
        const search = req.query.search;
        const id = req.query.id;

        try {
            const db = await Database;

            db.all(`SELECT * FROM places WHERE id = "${id}"`, function(err, rows) {
                if(err) {
                    return console.log(err);
                }
        
                // View Page HTML with data table
                return res.render("edit-point.html", { place: rows[0], search});
            });
        } catch {
            console.log('Erro no banco de dados!');
        }
    }
}
