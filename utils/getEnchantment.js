export default (effect) => {
  switch (effect) {
    case "protection":
      return { slot: 10 };
    case "fire_protection":
      return { slot: 11 };
    case "feather_falling":
      return { slot: 12 };
    case "blast_protection":
      return { slot: 13 };
    case "projectile_protection":
      return { slot: 14 };
    case "respiration":
      return { slot: 15 };
    case "aqua_affinity":
      return { slot: 16 };

    case "thorns":
      return { slot: 19 };
    case "depth_strider":
      return { slot: 20 };
    case "sharpness":
      return { slot: 21 };
    case "smite":
      return { slot: 22 };
    case "bane_of_arthropods":
      return { slot: 23 };
    case "knockback":
      return { slot: 24 };
    case "fire_aspect":
      return { slot: 25 };

    case "looting":
      return { slot: 28 };
    case "efficiency":
      return { slot: 29 };
    case "silk_touch":
      return { slot: 30 };
    case "unbreaking":
      return { slot: 31 };
    case "fortune":
      return { slot: 32 };
    case "power":
      return { slot: 33 };
    case "punch":
      return { slot: 34 };

    case "flame":
      return { slot: 10, onSecondPage: true };
    case "infinity":
      return { slot: 11, onSecondPage: true };
  }
};
