"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateBloqueio = _interopRequireDefault(require("../../../services/CreateBloqueio"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bloqueiocontroller {
  async create(req, res) {
    try {
      const createService = _tsyringe.container.resolve(_CreateBloqueio.default);

      const {
        provider_id,
        from,
        at,
        dia,
        mes
      } = req.body;
      const services = await createService.execute(provider_id, from, at, dia, mes);
      return res.json(services);
    } catch (err) {
      return res.json(err.message);
    }
  }

}

exports.default = Bloqueiocontroller;