"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokenRepository = _interopRequireDefault(require("../repositories/IUserTokenRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserToken")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IUserTokenRepository.default === "undefined" ? Object : _IUserTokenRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordService {
  constructor(userRepository, userToken, hashProvider) {
    this.userRepository = userRepository;
    this.userToken = userToken;
    this.hashProvider = hashProvider;
  }

  async execute({
    token,
    senha
  }) {
    const usertoken = await this.userToken.findByToken(token);

    if (!usertoken) {
      throw new _AppError.default("token do usuario nao existe");
    }

    const user = await this.userRepository.findById(usertoken.id);

    if (!user) {
      throw new _AppError.default("usuario nao existe");
    }

    const tokenCreateAt = usertoken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreateAt, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default("Token expirado");
    }

    user.senha = await this.hashProvider.generateHah(senha);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = ResetPasswordService;
exports.default = _default;