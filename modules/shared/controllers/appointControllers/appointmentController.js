const AppointmentService = require("../../services/appointment");

class AppointmentController {
  setSummery = async (req, res, next) => {
    try {
      const summery = await AppointmentService.setSummerySession(
        req.session,
        req.body
      );
      if (summery) {
        res
          .status(200)
          .json({ message: "Summery set successfully", sucess: true });
      } else {
        res.status(401).json({ message: "Summery not set", sucess: false });
      }
    } catch (error) {
      next(error);
    }
  };

  getSummery = async (req, res, next) => {
    try {
      const summery = await AppointmentService.getSummerySession(req.session);
      if (summery) {
        res
          .status(200)
          .json({ message: "Summery fetched successfully", summery });
      } else {
        res
          .status(401)
          .json({ message: "Summery not found", summery: null, sucess: false });
      }
    } catch (error) {
      {
        next(error);
      }
    }
  };

  destroySummery = async (req, res, next) => {
    try {
      const isDestroyed = await AppointmentService.destroySummerySession(
        req.session
      );
      if (isDestroyed) {
        res.clearCookie("connect.sid"); // 'connect.sid' is the default name of the session ID cookie
        res
          .status(200)
          .json({ message: "Summery destroyed successfully", sucess: true });
      } else {
        res
          .status(401)
          .json({ message: "Summery not destroyed", sucess: false });
      }
    } catch (error) {
      next(error);
    }
  };

  createAppointment = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  getAppointment = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  changeAppointmentStatus = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AppointmentController();
