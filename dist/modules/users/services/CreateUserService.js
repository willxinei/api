"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../../dist/shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _bcryptjs = require("bcryptjs");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CrateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CrateUserService {
  constructor(userrepository) {
    this.userrepository = userrepository;
  }

  async execute({
    name,
    email,
    telefone,
    password,
    prestador
  }) {
    const findUser = await this.userrepository.findByEmail(email);

    if (findUser) {
      throw new _AppError.default("Email ja existe");
    }

    const hashd = await (0, _bcryptjs.hash)(password, 8);
    const user = await this.userrepository.create({
      name,
      email,
      telefone,
      password: hashd,
      prestador
    });
    return user;
  }

}) || _class) || _class) || _class) || _class);
var _default = CrateUserService;
exports.default = _default;