"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListPrestadoresService = _interopRequireDefault(require("../../../services/ListPrestadoresService"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindTodosPrestadoresController {
  async list(req, res) {
    try {
      const listHorarios = _tsyringe.container.resolve(_ListPrestadoresService.default);

      const user_id = req.user.id;
      const list = await listHorarios.execute({
        user_id
      });
      return res.json((0, _classTransformer.classToClass)(list));
    } catch (err) {
      return res.json(err.message).status(400);
    }
  }

}

exports.default = FindTodosPrestadoresController;