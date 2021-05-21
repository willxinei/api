"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordService = _interopRequireDefault(require("../../../../../../dist/modules/users/services/ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(req, res) {
    const {
      token,
      password
    } = req.body;

    const sendForgotPasswordEmail = _tsyringe.container.resolve(_ResetPasswordService.default);

    const user = await sendForgotPasswordEmail.execute({
      token,
      password
    });
    return res.json(user);
  }

}

exports.default = ResetPasswordController;