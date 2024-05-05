const { affineEncrypt } = require("./affine");
const { caesarEncrypt } = require("./caesar");

/**
 * Handles the encryption of the data
 *
 * @param {Object} data - the data to be processed
 */
const transformData = (data) => {
    let full_name, email_address, city, country, cipher;

    switch (data.cipher) {
        case "a":
            full_name = affineEncrypt(data.full_name);
            email_address = affineEncrypt(data.email_address);
            city = affineEncrypt(data.city);
            country = affineEncrypt(data.country);
            cipher = "a";
            break;
        case "c":
            full_name = caesarEncrypt(data.full_name);
            email_address = caesarEncrypt(data.email_address);
            city = caesarEncrypt(data.city);
            country = caesarEncrypt(data.country);
            cipher = "c";
            break;
        case "ca":
            full_name = affineEncrypt(caesarEncrypt(data.full_name));
            email_address = affineEncrypt(caesarEncrypt(data.email_address));
            city = affineEncrypt(caesarEncrypt(data.city));
            country = affineEncrypt(caesarEncrypt(data.country));
            cipher = "ca";
            break;
        case "ac":
            full_name = caesarEncrypt(affineEncrypt(data.full_name));
            email_address = caesarEncrypt(affineEncrypt(data.email_address));
            city = caesarEncrypt(affineEncrypt(data.city));
            country = caesarEncrypt(affineEncrypt(data.country));
            cipher = "ac";
            break;
        default:
            // no encryption
            full_name = data.full_name;
            email_address = data.email_address;
            city = data.city;
            country = data.country;
            cipher = "none";
            break;
    }

    return {
        full_name: full_name,
        email_address: email_address,
        city: city,
        country: country,
        cipher: cipher,
    };
};

module.exports = transformData;
