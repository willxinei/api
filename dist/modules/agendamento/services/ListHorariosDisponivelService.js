"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IAgendamentoRespository = require("../repositories/IAgendamentoRespository");

var _IBloqueioRepository = _interopRequireDefault(require("../repositories/IBloqueioRepository"));

var _IServiceRepository = _interopRequireDefault(require("../repositories/IServiceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListHorarioDiponilvelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AgendamentoRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("BloqueioRepostory")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAgendamentoRespository.IAgendamentoRepository === "undefined" ? Object : _IAgendamentoRespository.IAgendamentoRepository, typeof _IServiceRepository.default === "undefined" ? Object : _IServiceRepository.default, typeof _IBloqueioRepository.default === "undefined" ? Object : _IBloqueioRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListHorarioDiponilvelService {
  constructor(agendamentoRepository, serviceRepository, bloquioRepository) {
    this.agendamentoRepository = agendamentoRepository;
    this.serviceRepository = serviceRepository;
    this.bloquioRepository = bloquioRepository;
  }

  async exec({
    provider_id,
    service,
    dia,
    mes,
    ano
  }) {
    function convertHours(time) {
      const [hour, minutes] = time.split(":").map(Number);
      const timeInMinutes = hour * 60 + minutes;
      return timeInMinutes;
    }

    const horarios = [];
    const findSercies = await this.serviceRepository.findUniqService(provider_id, service);

    if (findSercies === undefined) {
      throw new _AppError.default("Esse serviço nao existe");
    }

    const tempo = convertHours(findSercies.time);
    const time = (0, _dateFns.getMinutes)(new Date(2000, 2, 2, 10, tempo - 1, 0, 0));
    const appointments = await this.agendamentoRepository.findAgenndamentosDoDia(dia, mes, provider_id);
    const horaInicio = appointments.map(h => {
      // const horaReduzida = convertHours(h.from);
      return h.from;
    });
    horaInicio.sort((a, b) => {
      return a - b;
    });
    const horafim = appointments.map(h => {
      // const horaReduzida = convertHours(h.at);
      return h.at;
    });
    horafim.sort((a, b) => {
      return a - b;
    });
    const inicioLeng = horaInicio.length - 1;

    if (findSercies.service === service) {
      const hora = [];
      const indice = -1;

      while (indice < inicioLeng) {
        indice += 1;
        const inicio = horaInicio[indice + 1] + 1;
        let fim = horafim[indice];

        while (fim < inicio) {
          fim += 1;

          if (fim + tempo < inicio) {
            hora.push(fim);
          }
        }
      }

      let indCont = -tempo;

      while (indCont < hora[hora.length - 1]) {
        indCont += tempo;

        if (hora[indCont] !== undefined) {
          horarios.push(hora[indCont]);
        }
      }

      if (horaInicio[0] === undefined) {
        let conte = 780 - tempo;

        while (conte < 1140) {
          conte += tempo;
          horarios.push(conte);
        }
      }

      if (horaInicio[0] > 780) {
        let con = 780 - tempo;
        const or = [];
        const horaMI = horaInicio[0] - tempo;

        while (con < horaMI) {
          con += tempo;
          or.push(con);
        }

        or.filter(h => {
          if (h + time < horaInicio[0]) {
            horarios.push(h);
          }
        });
      }

      let hormin = horafim[horafim.length - 1] + 1 - tempo;

      for (hormin; hormin < 1140;) {
        hormin += tempo;

        if (hormin <= 1140) {
          horarios.push(hormin);
        }
      } // const eachDay = Array.from(
      //    { length: 1140 - 780 },
      //    (_, index) => index + 780,
      // );
      // eachDay.splice(eachDay.indexOf(horaInicio[0]), time + 1);
      // const cont = 0;
      // for (let i = -1; i < eachDay.length - 1; ) {
      //    i += 1;
      //    console.log(horaInicio[i]);
      // }

    }

    horarios.sort((a, b) => {
      return a - b;
    });
    const findBloqueio = await this.bloquioRepository.findBloqueio(provider_id, dia, mes);
    const bloqueio = [];

    if (findBloqueio) {
      let from = convertHours(findBloqueio.from) - 1;
      const at = convertHours(findBloqueio.at) - 1;

      while (from < at) {
        from += 1;
        bloqueio.push(from);
      }
    }

    const horariosBloqueados = horarios.filter(h => {
      const bk = bloqueio.find(d => {
        return h === d;
      });
      return h !== bk;
    });
    console.log(horariosBloqueados);
    const hor = horariosBloqueados.map(h => {
      const hourCorrent = new Date(Date.now());
      const event = new Date(ano, mes - 1, dia, 0, h, 0);
      const formated = (0, _dateFns.format)(event, "HH:mm");
      let week = (0, _dateFns.format)(event, "i");

      if (week === "7") {
        week = false;
      } else {
        week = true;
      }

      return {
        hour: formated,
        avaliable: (0, _dateFns.isAfter)(event, hourCorrent) && week
      };
    });
    return hor;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListHorarioDiponilvelService;