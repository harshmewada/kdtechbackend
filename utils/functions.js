const httpStatus = require("http-status");
const fs = require("fs");
// const Jimp = require('jimp');

const statusCheck = (status) => {
  return status ? { status: true } : {};
};

// const compressImages = async (file) => {
//     console.log('file', file);

//     const ref = __dirname.replace('utils', '') + file.path
//     const output = __dirname.replace('utils', '') + file.destination + '/' + 'preview' + '.jpg'
//     console.log(ref);
//     console.log('preview', __dirname.replace('utils', '')
//         + file.destination + '/' + 'preview' + Date.now() + '.jpg');
//     await Jimp.read(ref, (err, lenna) => {
//         if (err) throw err;
//         lenna
//             .resize(256, 256) // resize
//             .quality(60)
//             .write(output); // save
//     });

//     console.log('file.destination + ref', ref);
//     return ref
// }

const getFilesData = async (files) => {
  if (files) {
    if (Array.isArray(files)) {
      if (files.length > 0) {
        let images = [];
        await files.map(async (file) => {
          // const fileName = compressImages(file)
          const fileName = file.id || file._id;
          images.push(fileName);
        });
        return images;
      } else if (files.id || files._id) {
        // return compressImages(filess)
        return files.id || files._id
      }
    } else {
      // return compressImages(filess)
      return files.id || files._id
    }
  }
};

const removeFile = (file) => {
  if (typeof file === "object") {
    if (file.length > 0) {
      file.map((f) => {
        if (fs.existsSync(f)) {
          fs.unlink(f, (err) => {
            if (err) {
              return { status: httpStatus.INTERNAL_SERVER_ERROR, message: err };
            }
          });
        }
      });
    }
  } else {
    if (fs.existsSync(file)) {
      fs.unlink(file, (err) => {
        if (err) {
          return { status: httpStatus.INTERNAL_SERVER_ERROR, message: err };
        }
      });
    }
  }
};



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

module.exports = {
  getFilesData,
  removeFile,
  statusCheck,
  stableSort,
  getComparator,
  descendingComparator
};
