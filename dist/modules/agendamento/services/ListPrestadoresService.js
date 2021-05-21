"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IUsersRepository = _interopRequireDefault(require("../../../../dist/modules/users/repositories/IUsersRepository"));

var _ICachProvider = _interopRequireDefault(require("../../../../dist/shared/container/providers/CashProvider/models/ICachProvider"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListPrestadoresService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CacheProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICachProvider.default === "undefined" ? Object : _ICachProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListPrestadoresService {
  constructor(userRepository, cacheProvider) {
    this.userRepository = userRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    user_id
  }) {
    let users = await this.cacheProvider.recover(`providers-list:${user_id}`);

    if (!users) {
      users = await this.userRepository.findTodosPrestadores({
        prestador: true
      });
      await this.cacheProvider.save(`providers-list:${user_id},`, (0, _classTransformer.classToClass)(users));
    }

    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListPrestadoresService;