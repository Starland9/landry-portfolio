// One JSON file per project. To add a project: create `<slug>.json` (see secret.json)
// and import it below. The order here is the ranking: the first 6 are the featured projects
// (in this order on the home page), the rest break ties between projects of the same year on /work.
import { checkProjects, parseProject } from "../validate";

// Featured, best first.
import twoLnRh from "./2ln-rh.json"; // Talent Intelligence + SimpliRH
import twoLnLearningInstitute from "./2ln-learning-institute.json";
import secret from "./secret.json";
import faisMonCv from "./fais-mon-cv.json";
import eurekaMotion from "./eureka-motion.json";
import gBuyWeb from "./g-buy-web.json";
// Not featured, ranked.
import kweekk from "./kweekk.json";
import isyjob from "./isyjob.json";
import twoLnAi from "./2ln-ai.json";
import gestionStockEntrepot from "./gestion-stock-entrepot.json";
import flyersMaker from "./flyers-maker.json";
import kamte from "./kamte.json";
import openWhatsappBot from "./open-whatsapp-bot.json";
import njangiflow from "./njangiflow.json";
import socialDl from "./social-dl.json";
import landflix from "./landflix.json";
import tchokos from "./tchokos.json";
import omoh from "./omoh.json";
import mboloGabon from "./mbolo-gabon.json";

// Key = file name (without .json); validated against the slug inside the file.
const sources: Record<string, unknown> = {
  "2ln-rh": twoLnRh,
  "2ln-learning-institute": twoLnLearningInstitute,
  secret,
  "fais-mon-cv": faisMonCv,
  "eureka-motion": eurekaMotion,
  "g-buy-web": gBuyWeb,
  kweekk,
  isyjob,
  "2ln-ai": twoLnAi,
  "gestion-stock-entrepot": gestionStockEntrepot,
  "flyers-maker": flyersMaker,
  kamte,
  "open-whatsapp-bot": openWhatsappBot,
  njangiflow,
  "social-dl": socialDl,
  landflix,
  tchokos,
  omoh,
  "mbolo-gabon": mboloGabon,
};

/** All projects in index order, validated at load time (an error fails the build). */
export const projects = checkProjects(
  Object.entries(sources).map(([file, raw]) => parseProject(raw, file)),
);
