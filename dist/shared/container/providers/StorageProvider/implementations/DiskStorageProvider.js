"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  async saveFile(file) {
    await _fs.default.promises.rename(_path.default.resolve(_upload.default.tmpFolder, file), _path.default.resolve(_upload.default.UploadFolder, file));
    return file;
  }

  async deleteFile(file) {
    const filePath = _path.default.resolve(_upload.default.UploadFolder, file);

    try {
      await _fs.default.promises.stat(filePath);
    } catch {
      return;
    }

    await _fs.default.promises.unlink(filePath);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;