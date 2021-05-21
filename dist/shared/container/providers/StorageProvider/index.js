"use strict";

var _tsyringe = require("tsyringe");

var _DiskStorageProvider = _interopRequireDefault(require("./implementations/DiskStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("StorageProvider", _DiskStorageProvider.default);