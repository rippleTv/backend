const {
  createPlan,
  savePlan,
  subscribeUser,
  getPlans
} = require("../services/subscription");

function SubscriptionController() {
  this.getPlans = async (req, res, next) => {
    let plans = await getPlans();
    res.status(200).json({
      data: plans
    });
  };
  this.createPlan = async (req, res, next) => {
    let data = await createPlan(req.body);

    //if request to save plan was unsuccessful
    if (!data) {
      return res.status(400).send({
        error: null,
        message: "Creation of Plan failed"
      });
    }

    //since stripe doesn't return plan name, i add it here to create a copy in database
    data.name = req.body.name;
    data.description = req.body.description;

    const plan = await savePlan(data);
    return res.status(200).send({
      message: "Payment Plan created Successfully",
      data: plan
    });
  };

  this.subscribeUser = async (req, res, next) => {
    try {
      const { token, plan_id } = req.body;
      const body = {
        token, // Token retrieved from Elements, Checkout, or native SDKs.,
        plan_id,
        email: req.user.email
      };
      const response = await subscribeUser(body);

      return res.status(200).send({
        message: "Subscribed user successfully",
        data: response
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new SubscriptionController();
