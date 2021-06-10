"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Users = _interopRequireDefault(require("../entities/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormrepository = void 0;
    this.ormrepository = (0, _typeorm.getRepository)(_Users.default);
  }

  async findTodosPrestadores({
    prestador
  }) {
    const find = await this.ormrepository.find({
      where: {
        prestador
      }
    });
    return find;
  }

  async create(data) {
    const user = this.ormrepository.create({
      name: data.name,
      email: data.email,
      telefone: data.telefone,
      password: data.password,
      prestador: data.prestador
    });
    await this.ormrepository.save(user);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormrepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async findById(id) {
    const user = await this.ormrepository.findOne(id);
    return user;
  }

  async save(user) {
    return this.ormrepository.save(user);
  }

}

exports.default = UsersRepository;