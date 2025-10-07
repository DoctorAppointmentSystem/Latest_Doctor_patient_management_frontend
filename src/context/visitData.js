export const defaultVisitData = {
  history: {
    presentingComplaints: [],
    ocularHistory: [],
    systemHistory: [],
    newDisease: [],
  },

  visionAndRefraction: {
      va: { right: {}, left: {} },
      iop: { right: {}, left: {}, narration: "", selectedMethod: "" },
      oldGlasses: { right: {}, left: {}, ipdD: "", ipdN: "", remarks: "" },
      autoRefraction: { right: {}, left: {}, ipdD: "", ipdN: "", remarks: "" },
      cycloAutoRefraction: { right: {}, left: {}, ipdD: "", ipdN: "", remarks: "" },
      refraction: { right: {}, left: {}, ipdD: "", ipdN: "", type: "", remarks: "" },
      keratometry: { right: {}, left: {}, methodUsed: "", narration: "" },
      retinoscopy: { right: {}, left: {}, distance: "", method: "", dilatedWith: "", narration: "" },
      opticDisc: { right: {}, left: {}, narration: "" },
      siteOfIncision: { right: {}, left: {}, narration: "" },
      orthopticAssessment: { eom: "", hb: "", narration: "" },
      anteriorChamber: [],
      eom: { right: [], left: [] },
      hyphema: { right: "", left: "", both: "", narration: "" },
      lens: { right: {}, left: {}, narration: "" },
      gonioscopy: { right: {}, left: {} },
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