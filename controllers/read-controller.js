const readModel = require("../models/read-model");
const { caesarDecrypt } = require("../utils/caesar");
const { affineDecrypt } = require("../utils/affine");

module.exports = {
    readData: function (req, res) {
        readModel.readData(function (data) {
            const decrypted = data.map((item) => {
                let full_name, email_address, city, country;

                switch (item.cipher) {
                    case "a":
                        full_name = affineDecrypt(item.full_name);
                        email_address = affineDecrypt(item.email_address);
                        city = affineDecrypt(item.city);
                        country = affineDecrypt(item.country);
                        break;
                    case "c":
                        full_name = caesarDecrypt(item.full_name);
                        email_address = caesarDecrypt(item.email_address);
                        city = caesarDecrypt(item.city);
                        country = caesarDecrypt(item.country);
                        break;
                    case "ca":
                        full_name = caesarDecrypt(
                            affineDecrypt(item.full_name)
                        );
                        email_address = caesarDecrypt(
                            affineDecrypt(item.email_address)
                        );
                        city = caesarDecrypt(affineDecrypt(item.city));
                        country = caesarDecrypt(affineDecrypt(item.country));
                        break;
                    case "ac":
                        full_name = affineDecrypt(
                            caesarDecrypt(item.full_name)
                        );
                        email_address = affineDecrypt(
                            caesarDecrypt(item.email_address)
                        );
                        city = affineDecrypt(caesarDecrypt(item.city));
                        country = affineDecrypt(caesarDecrypt(item.country));
                        break;
                    default:
                        // no encryption
                        full_name = item.full_name;
                        email_address = item.email_address;
                        city = item.city;
                        country = item.country;
                        break;
                }

                return new Object({
                    id: item.id,
                    full_name: full_name,
                    email_address: email_address,
                    city: city,
                    country: country,
                });
            });

            res.render("index", { fetchData: decrypted });
        });
    },
};
