import Plan from "../../models/Plan";

const FindAllPlanServiceRegister = async (): Promise<Plan[]> => {
  const plans = await Plan.findAll({
    attributes: [
      'id',
      'name',
      'users',
      'connections',
      'queues',
      'value',
      'useWhatsapp',
      'useFacebook',
      'useInstagram',
      'useCampaigns',
      'useSchedules',
      'useInternalChat',
      'useExternalApi',
      'useKanban',
      'useInternal',
      'useVisualCommunication' // Adicionado aqui
    ],
    where: {
      useInternal: true
    },
    order: [["name", "ASC"]]
  });
  return plans;
};

export default FindAllPlanServiceRegister;
