export const defaultVisitData = {
  history: {
    presentingComplaints: [],
    ocularHistory: [],
    systemHistory: [],
    newDisease: [],
  },

  visionAndRefraction: {
    va: {
      right: { value: "", condition1: "", condition2: "", condition3: "", condition4: "" },
      left: { value: "", condition1: "", condition2: "", condition3: "", condition4: "" },
    },

    iop: {
      right: { value: "", pachymetry: "", correctionFactor: "", iopFinal: "" },
      left: { value: "", pachymetry: "", correctionFactor: "", iopFinal: "" },
      narration: "",
      selectedMethod: "",
    },

    oldGlasses: {
      right: { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
      left: { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
      ipdD: "",
      ipdN: "",
      remarks: "",
    },

    autoRefraction: {
      right: { sph: "", cyl: "", axis: "", textField: "" },
      left: { sph: "", cyl: "", axis: "", textField: "" },
      ipdD: "",
      ipdN: "",
      remarks: "",
    },

    cycloAutoRefraction: {
      right: { sph: "", cyl: "", axis: "", textField: "" },
      left: { sph: "", cyl: "", axis: "", textField: "" },
      ipdD: "",
      ipdN: "",
      remarks: "",
    },

    refraction: {
      right: { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
      left: { sph: "", cyl: "", axis: "", bcva: "", add: "", vaN: "", textField: "" },
      ipdD: "",
      ipdN: "",
      type: "",
      remarks: "",
    },

    keratometry: {
      right: { k1: "", k1angle: "", k2: "", k2angle: "", al: "", p: "", aConstant: "", iol: "", aimIol: "" },
      left: { k1: "", k1angle: "", k2: "", k2angle: "", al: "", p: "", aConstant: "", iol: "", aimIol: "" },
      methodUsed: "",
      narration: "",
    },

    retinoscopy: {
      right: { sph: "", cyl: "", angle: "", reflexes: "" },
      left: { sph: "", cyl: "", angle: "", reflexes: "" },
      distance: "",
      method: "",
      dilatedWith: "",
      narration: "",
    },

    opticDisc: {
      right: { vertical: "", horizontal: "", narration: "" },
      left: { vertical: "", horizontal: "", narration: "" },
      narration: "",
    },

    siteOfIncision: {
      right: { angle: "" },
      left: { angle: "" },
      narration: "",
    },

    orthopticAssessment: { eom: "", hb: "", narration: "" },

    anteriorChamber: [
      { eye: "B/L", flare: "", cells: "", acDetails: "" }
    ],

    eom: { right: [], left: [] },

    hyphema: { right: "", left: "", both: "", narration: "" },

    lens: {
      right: { nuclear: "", cortical: "", posterior: "" },
      left: { nuclear: "", cortical: "", posterior: "" },
      narration: "",
    },

    gonioscopy: {
      right: { superior: "", medial: "", lateral: "", inferior: "" },
      left: { superior: "", medial: "", lateral: "", inferior: "" },
    },

    hypopyon: { right: "", left: "", narration: "" },
  },

  examination: {
    lens: { right: "", left: "" },
    ac: { right: "", left: "" },
    iris: { right: "", left: "" },
    pupil: { right: "", left: "" },
    conjunctiva: { right: "", left: "" },
    lids: { right: "", left: "" },
    cd_ratio: { right: "", left: "" },
    findings: {
      right: { value: "", duration: "" },
      left: { value: "", duration: "" },
      notesEnabled: false,
    },
  },

  diagnosis: {
    diagnoses: [],
    managementPlans: [],
    treatmentPlan: [],
  },

  prescription: {
    medicines: [],
    remarks: "",
    nextVisit: {
      date: null,
      after: "",
    },
  },
};
