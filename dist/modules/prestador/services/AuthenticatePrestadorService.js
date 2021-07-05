"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPrestadorRepository = _interopRequireDefault(require("../repositories/IPrestadorRepository"));

var _tsyringe = require("tsyringe");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticatePrestadorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class AuthenticatePrestadorService {
  constructor(prestadorRepository) {
    this.prestadorRepository = prestadorRepository;
  }

  async execute({
    email,
    senha
  }) {
    const prestador = await this.prestadorRepository.findByMail(email);

    if (!prestador) {
      throw new _AppError.default("email incorreto");
    }

    const compareHash = await (0, _bcryptjs.compare)(senha, prestador.senha);

    if (!compareHash) {
      throw new _AppError.default("senha incorreta");
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: prestador.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      prestador,
      token
    };
  }

}) || _class) || _class) || _class) || _class);
exports.default = AuthenticatePrestadorService;