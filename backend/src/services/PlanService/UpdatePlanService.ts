import AppError from "../../errors/AppError";
import Plan from "../../models/Plan";

interface PlanData {
  name: string;
  id?: number | string;
  users?: number;
  connections?: number;
  queues?: number;
  value?: number;
  useWhatsapp?: boolean;
  useFacebook?: boolean;
  useInstagram?: boolean;
  useCampaigns?: boolean;
  useSchedules?: boolean;
  useInternalChat?: boolean;
  useExternalApi?: boolean;
  useKanban?: boolean;
  useInternal?: boolean;
  useVisualCommunication?: boolean; // Adicionado aqui
}

const UpdatePlanService = async (planData: PlanData): Promise<Plan> => {
  const {
    id,
    name,
    users,
    connections,
    queues,
    value,
    useWhatsapp,
    useFacebook,
    useInstagram,
    useCampaigns,
    useSchedules,
    useInternalChat,
    useExternalApi,
    useKanban,
    useInternal,
    useVisualCommunication // Adicionado aqui
  } = planData;

  const plan = await Plan.findByPk(id);

  if (!plan) {
    throw new AppError("ERR_NO_PLAN_FOUND", 404);
  }

  await plan.update({
    name,
    users,
    connections,
    queues,
    value,
    useWhatsapp,
    useFacebook,
    useInstagram,
    useCampaigns,
    useSchedules,
    useInternalChat,
    useExternalApi,
    useKanban,
    useInternal,
    useVisualCommunication // Adicionado aqui
  });

  return plan;
};

export default UpdatePlanService;