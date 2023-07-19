import user_model from "../database/model/user.model.js";
export const session_contoller = async (req, res, next) => {
  try {
    if (req.session.userId) {
      const user = await user_model.findOne({
        where: { id: req.session.userId },
      });
    if(user) {
        next();
    }
    else{
        req.session.userId = null
    }
    }
  } catch (error) {}
};
