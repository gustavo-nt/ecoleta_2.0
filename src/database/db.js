// Imports
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

db.serialize(() => {
    // 1 - Create table
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            whats TEXT,
            email TEXT,
            lat TEXT,
            lng TEXT,
            uf TEXT,
            state TEXT,
            city TEXT,
            about TEXT,
            items TEXT
        );
    `);

    // 2 - Insert table data
    const query = `
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
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?);
    `;
    
    const values = [
        "b786974d21adda9d57d5188184ad09bc-computer.jpg",
        "Colectoria",
        "(51)99999-9999",
        "teste@gmail.com",
        "-29.745599748147384",
        "-50.85010170936585",
        "13",
        "Amazonas",
        "Anamã",
        "Em muitos casos, amigos e clientes perguntam por que fundamos a Colectoria, empresa destinada para coleta de items reciclavéis, e a resposta é bem sucinta: 'Buscamos a sobrevivência do planeta Terra!'.",
        "Lâmpadas, Resíduos Eletrônicos"
    ];

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Cadastrado com Sucesso");
    }

    // db.run(query, values, afterInsertData);

    // 3 - Query table data
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Aqui estão seus registros:");
    //     console.log(rows);
    // });

    // 4 - Delete table data
    // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Registro deletado com sucesso.")
    // });
});