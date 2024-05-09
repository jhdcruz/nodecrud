const { affineEncrypt, affineDecrypt } = require("./affine");
const { caesarEncrypt, caesarDecrypt } = require("./caesar");

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

function decryptData(data) {
    return (decrypted = data.map((item) => {
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
                full_name = caesarDecrypt(affineDecrypt(item.full_name));
                email_address = caesarDecrypt(
                    affineDecrypt(item.email_address)
                );
                city = caesarDecrypt(affineDecrypt(item.city));
                country = caesarDecrypt(affineDecrypt(item.country));
                break;
            case "ac":
                full_name = affineDecrypt(caesarDecrypt(item.full_name));
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
    }));
}

module.exports = { transformData, decryptData };
