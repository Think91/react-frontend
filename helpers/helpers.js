// Method to write to JSON

const fs = require("fs");
//JSON.stringify(data)
// Method to write out data to JSON file
writeData = (content, message, res, new_post) => {
    fs.writeFile("data/user.json", JSON.stringify(content), (err) => {
        res.status(201).json({
            status: `${message}`,
            content: {
                item: new_post
            },
        });
    });
    console.log(new_post);
};

//  Parsed JSON files / Synchronous reading
let content = JSON.parse(fs.readFileSync("data/user.json"));

module.exports = {
    writeData,
    content,
};