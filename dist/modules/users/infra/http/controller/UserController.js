"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _ShowProfleleService = _interopRequireDefault(require("../../../services/ShowProfleleService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(req, res) {
    try {
      const {
        nome,
        email,
        telefone,
        senha,
        prestador
      } = req.body;

      const create = _tsyringe.container.resolve(_CreateUserService.default);

      const user = await create.execute({
        nome,
        email,
        telefone,
        senha,
        prestador
      });
      return res.json(user);
    } catch (err) {
      return res.json(err);
    }
  }

  async listUser(req, res) {
    const {
      user_id
    } = req.params;

    const list = _tsyringe.container.resolve(_ShowProfleleService.default);

    const listUser = list.execute({
      user_id
    });
    return res.json(listUser);
  }

}

exports.default = UserController;