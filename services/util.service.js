const httpStatus = require('http-status');


const { ObjectId } = require('mongodb');

const getImage = async (req, res) => {
    try {
        const { id } = req.params
        let downloadStream = bucket.openDownloadStream(ObjectId(id));
        bucket.find({ _id: ObjectId(id) }).toArray(function (err, files) {
            const file = files[0]
            // console.log(file);

            res.contentType(file.contentType)
            // var downloadStream = bucket.createReadStream({ _id: ObjectId(file._id) })
            downloadStream.on('data', (chunk) => {
                res.write(chunk)
            })
            downloadStream.on('end', (chunk) => {
                res.end()
            })
        })

    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Failed to get file" });

    }

}






module.exports = {
    getImage
}
