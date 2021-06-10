"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateSerivçoSerice = _interopRequireDefault(require("../../../services/CreateSeriv\xE7oSerice"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateServiçoController {
  async create(req, res) {
    try {
      const createService = _tsyringe.container.resolve(_CreateSerivçoSerice.default);

      const {
        service,
        description,
        time,
        value
      } = req.body;
      const provider_id = req.user.id;
      const services = await createService.execute({
        provider_id,
        service,
        description,
        time,
        value
      });
      return res.json(services);
    } catch (err) {
      return res.json(err.message);
    }
  }

}

exports.default = CreateServiçoController;