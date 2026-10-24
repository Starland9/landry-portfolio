// One JSON file per project. To add a project: create `<slug>.json` (see secret.json)
// and import it below. The order here is the order of the featured projects on the home page.
import { checkProjects, parseProject } from "../validate";

import secret from "./secret.json";
import gBuyWeb from "./g-buy-web.json";
import kweekk from "./kweekk.json";
import isyjob from "./isyjob.json";
import gestionStockEntrepot from "./gestion-stock-entrepot.json";
import twoLnLearningInstitute from "./2ln-learning-institute.json";
import twoLnRh from "./2ln-rh.json";
import eurekaMotion from "./eureka-motion.json";
import faisMonCv from "./fais-mon-cv.json";
import openWhatsappBot from "./open-whatsapp-bot.json";
import flyersMaker from "./flyers-maker.json";
import njangiflow from "./njangiflow.json";
import tchokos from "./tchokos.json";
import twoLnAi from "./2ln-ai.json";
import omoh from "./omoh.json";
import mboloGabon from "./mbolo-gabon.json";
import kamte from "./kamte.json";
import landflix from "./landflix.json";
import socialDl from "./social-dl.json";

// Key = file name (without .json); validated against the slug inside the file.
const sources: Record<string, unknown> = {
  secret,
  "g-buy-web": gBuyWeb,
  kweekk,
  isyjob,
  "gestion-stock-entrepot": gestionStockEntrepot,
  "2ln-learning-institute": twoLnLearningInstitute,
  "2ln-rh": twoLnRh,
  "eureka-motion": eurekaMotion,
  "fais-mon-cv": faisMonCv,
  "open-whatsapp-bot": openWhatsappBot,
  "flyers-maker": flyersMaker,
  njangiflow,
  tchokos,
  "2ln-ai": twoLnAi,
  omoh,
  "mbolo-gabon": mboloGabon,
  kamte,
  landflix,
  "social-dl": socialDl,
};

/** All projects in index order, validated at load time (an error fails the build). */
export const projects = checkProjects(
  Object.entries(sources).map(([file, raw]) => parseProject(raw, file)),
);
