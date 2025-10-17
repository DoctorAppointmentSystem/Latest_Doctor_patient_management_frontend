import React, { useRef, useEffect, useState, useContext } from "react";
import { getVisitById } from "../api/visits"; // ✅ Make sure this path exists
import { getPatientsById } from "../api/patient";
import { VisitContext } from "../context";

export const ReportPage = () => {
  const reportRef = useRef();
  // const visitId = "68f1441e20559deddd254c3e"; // Example visit ID
  const [visitDataPage, setVisitDataPage] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const { visitData, setVisitData } = useContext(VisitContext);
  const visitId = visitData?.visitId; // Dynamically get visitId from context

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const data = await getVisitById(visitId);
        console.log("Fetched visit data:", data.data);

        setVisitDataPage(data.data);

      } catch (error) {
        console.error("Error fetching visit data:", error);
      }
    };

    fetchVisitData();

  }, [visitId]);

  useEffect(() => {
    if (visitDataPage) {
      const fetchPatientData = async () => {
        try {
          const patientId = visitDataPage.patientId._id;
          console.log("Patient ID from visit data:", patientId);

          const response = await getPatientsById(patientId);
          console.log("Fetched patient data:", response.data);
          setPatientData(response.data.data);

        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      };

      fetchPatientData();
    }
  }, [visitDataPage]);

  useEffect(() => {
    if (visitDataPage) {
      console.log("✅ Updated Visit Data State:", visitDataPage);
      console.log("✅ Corresponding Patient Data State:", patientData);
    }
  }, [visitDataPage, patientData]);

  return (
    <>
      {/* ✅ FIXED: Removed jsx/global attributes */}
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .printable-area {
              box-shadow: none !important;
              margin: 0;
              border: none;
            }
            .no-break-inside {
              break-inside: avoid;
            }
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        `}
      </style>

      <div className="bg-gray-200 font-sans p-4 sm:p-8">
        {/* --- Print Button --- */}
        <div className="flex justify-center sm:justify-end mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-highlight focus:outline-none  transition-colors duration-200"
          >
            Print or Save Report
          </button>
        </div>

        {/* --- Printable Report --- */}
        <div
          ref={reportRef}
          className="printable-area w-[210mm] min-h-[297mm] mx-auto p-8 bg-white shadow-2xl text-sm"
        >
          <div className="flex flex-col justify-between h-full min-h-[270mm]">
            {/* --- Main Content --- */}
            <div>
              {/* --- Header --- */}
              <header className="flex justify-between items-start pb-4 border-b-2 border-gray-800">
                <div className="text-left text-xs">
                  <p className="font-semibold text-gray-700">Professor</p>
                  <h1 className="text-xl font-bold text-black">Dr. Ahmad Zeeshan Jamil</h1>
                  <p className="text-gray-600">MBBS, FRCS (Glasgow)</p>
                  <p className="text-gray-600">FCPS, FCPS (VRO)</p>
                  <p className="text-gray-600">MCPS, ICO (UK)</p>
                  <p className="mt-1 text-gray-600">Sahiwal Medical College Sahiwal</p>
                </div>

                <div className="w-24 h-24 flex items-center justify-center text-gray-400">
                  {/* Logo Placeholder */}
                </div>

                <div className="text-right text-xs" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                  <p className="font-semibold text-gray-700">پروفیسر</p>
                  <h1 className="text-xl font-bold text-black">ڈاکٹر احمد ذیشان جمیل</h1>
                  <p className="text-gray-600">ایم بی بی ایس، ایف آر سی ایس (گلاسگو)</p>
                  <p className="text-gray-600">ایف سی پی ایس، ایف سی پی ایس (وی آر او)</p>
                  <p className="text-gray-600">ایم سی پی ایس، آئی سی او (یو کے)</p>
                  <p className="mt-1 text-gray-600">ساہیوال میڈیکل کالج، ساہیوال</p>
                </div>
              </header>

              {/* --- Patient Details --- */}
              <section className="border border-gray-400 mt-4 p-2 rounded-md flex justify-between items-center text-xs">
                <div>
                  <p>
                    <span className="font-bold">{patientData?.patient_name}</span> ({patientData?.age}-years {patientData?.gender})

                    <span className="font-bold">City:</span> {patientData?.city} |
                  </p>
                  <p className="text-gray-700">
                    Mob: +92{patientData?.phone_number} | {patientData?.guardian.relation} {patientData?.guardian.name} | First Visit: {patientData?.updatedAt ? new Date(patientData.updatedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Pt. Id. 9</p>
                </div>
              </section>

              {/* --- Main Grid --- */}
              <main className="grid grid-cols-2 gap-x-6 mt-3 flex-grow">
                {/* --- Left Column --- */}
                <div className="space-y-3 text-xs">
                  <div className="border border-gray-300 rounded-md p-2 no-break-inside">
                    <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1 border-b border-gray-300">
                      Disease History
                    </h3>

                    <div className="rounded-md p-2 no-break-inside">

                      {visitDataPage?.history?.systemHistory?.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.history.systemHistory.map((item, index) => (
                            <li key={index}>
                              {item.enabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — {item.duration}  ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — {item.duration}  ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>

                      ) : (
                        <p>No systemic diseases reported.</p>
                      )}
                      {visitDataPage?.history?.ocularHistory?.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.history.ocularHistory.map((item, index) => (
                            <li key={index}>
                              {item.enabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — {item.duration}  ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — {item.duration}  ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No ocular diseases reported.</p>
                      )}
                      {visitDataPage?.history?.presentingComplaints?.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.history.presentingComplaints.map((item, index) => (
                            <li key={index}>
                              {item.enabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — {item.duration}  ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — {item.duration}  ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No presenting Complaints reported.</p>
                      )}
                    </div>

                  </div>
                  <div className="border border-gray-300 rounded-md p-2 no-break-inside">
                    <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1 border-b border-gray-300">
                      Vision & Refraction
                    </h3>
                    <table className="w-full text-center text-[10px]">
                      <thead className="font-bold">
                        <tr>
                          <td></td>
                          <td>SPH</td>
                          <td>CYL</td>
                          <td>AXIS</td>
                          <td>VA</td>
                          <td>Add</td>
                          <td>N.V</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-bold">R</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>6/18</td>
                          <td>+2.75</td>
                          <td>N8</td>
                        </tr>
                        <tr>
                          <td className="font-bold">L</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>6/24</td>
                          <td>+2.75</td>
                          <td>N8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="border border-gray-300 rounded-md p-2 space-y-1 no-break-inside">
                    <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1 border-b border-gray-300">
                      Examination
                    </h3>
                    <div>
                      {visitDataPage?.examination?.ac.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.ac.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No ac reported.</p>
                      )}

                      {visitDataPage?.examination?.cdRatio.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.cdRatio.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No cdRatio reported.</p>
                      )}

                      {visitDataPage?.examination?.conjunctiva.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.conjunctiva.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No conjunctiva reported.</p>
                      )}

                      {visitDataPage?.examination?.cornea.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.cornea.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No cornea reported.</p>
                      )}

                      {visitDataPage?.examination?.findings.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.findings.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No findings reported.</p>
                      )}

                      {visitDataPage?.examination?.fundus.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.fundus.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No fundus reported.</p>
                      )}

                      {visitDataPage?.examination?.iris.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.iris.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No iris reported.</p>
                      )}

                      {visitDataPage?.examination?.lens.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.lens.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No lens reported.</p>
                      )}

                      {visitDataPage?.examination?.lids.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.lids.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No lids reported.</p>
                      )}

                      {visitDataPage?.examination?.opticDisk.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.opticDisk.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No opticDisk reported.</p>
                      )}

                      {visitDataPage?.examination?.otherExternalFindings.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.otherExternalFindings.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No otherExternalFindings reported.</p>
                      )}

                      {visitDataPage?.examination?.pupil.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.pupil.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No pupil reported.</p>
                      )}

                      {visitDataPage?.examination?.vitreous.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.examination.vitreous.map((item, index) => (
                            <li key={index}>
                              {item.notesEnabled ? (
                                <>
                                  <span className="font-bold">{item.disease} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.disease} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No vitreous reported.</p>
                      )}
                    </div>
                    
                  </div>

                  <div className="border border-gray-300 rounded-md p-2 no-break-inside">
                    <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1 border-b border-gray-300">
                      Diagnosis
                    </h3>
                    <div>
                      {visitDataPage?.diagnosis?.diagnoses.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.diagnosis.diagnoses.map((item, index) => (
                            <li key={index}>
                              {item.isFinal ? (
                                <>
                                  <span className="font-bold">{item.text} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.text} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No presenting Complaints reported.</p>
                      )}

                      {visitDataPage?.diagnosis?.managementPlans.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.diagnosis.managementPlans.map((item, index) => (
                            <li key={index}>
                              {item.isFinal ? (
                                <>
                                  <span className="font-bold">{item.text} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.text} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No management Plans reported.</p>
                      )}

                      {visitDataPage?.diagnosis?.treatmentPlans.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {visitDataPage.diagnosis.treatmentPlans.map((item, index) => (
                            <li key={index}>
                              {item.isFinal ? (
                                <>
                                  <span className="font-bold">{item.text} — ({item.eye})</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.text} — ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No treatment Plans reported.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- Right Column --- */}
                <div className="space-y-3 no-break-inside">
                  <div className="border border-gray-300 rounded-md p-2 min-h-[400px]">
                    <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1 border-b border-gray-300">
                      Rx
                    </h3>
                    <div className="text-xs pt-2">
                      <div>
                        {visitDataPage?.prescription?.medicines.length > 0 ? (
                        <ul className="list-disc list-inside flex flex-col gap-2">
                          {visitDataPage.prescription.medicines.map((item, index) => (
                            <li key={index} className="flex gap-4 items-center">
                              {item.isFreeProvided ? (
                                <>
                                  <span>{item.medicine} — {item.dosage} - {item.duration} ({item.eye})</span> <span className=" bg-acent text-primary font-medium rounded-4xl px-2 py-1">free</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.medicine} — {item.dosage} - {item.duration} ({item.eye})</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No presenting Complaints reported.</p>
                      )}
                      </div>
                      <p
                        className="text-right pt-1"
                        style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                      >
                        ایک قطرہ ہر دو گھنٹے بعد دونوں آنکھوں میں ۔ ایک ماہ
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-md p-2 no-break-inside">
                    <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1 border-b border-gray-300">
                      IOP
                    </h3>
                    <div className="grid grid-cols-5 text-center font-semibold text-[10px]">
                      <span>For</span>
                      <span>IOP</span>
                      <span>Pachymetry</span>
                      <span>CF</span>
                      <span>Final</span>
                    </div>
                    <div className="grid grid-cols-5 text-center text-[11px]">
                      <span>(R)</span>
                      <span>15</span>
                      <span>-</span>
                      <span>-</span>
                      <span>-</span>
                      <span>(L)</span>
                      <span>15</span>
                      <span>-</span>
                      <span>-</span>
                      <span>-</span>
                    </div>
                    <p className="mt-1 text-[11px]">
                      <span className="font-bold">Method:</span> Applanation Tonometry
                    </p>
                  </div>
                </div>
              </main>
            </div>

            {/* --- Footer --- */}
            <footer className="mt-auto pt-4 border-t-2 border-gray-800 flex justify-between items-end text-[10px]">
              <div className="text-left">
                <div className="w-20 h-20 border border-gray-400 flex items-center justify-center text-gray-400 mb-1">
                  QR Code
                </div>
                <p>02734919528JEC</p>
              </div>

              <div className="text-center" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                <p>وامق ہسپتال نزد پرانی چونگی، ساہیوال</p>
                <p>
                  <span className="font-sans font-bold">اوقات کلینک:</span> شام 3 تا 6 بجے
                </p>
                <p>بروز سوموار، منگل، بدھ، جمعرات، ہفتہ</p>
                <p>آنے سے پہلے صبح 9 سے 10 بجے تک رابطہ کرکے تشریف لائیں</p>
                <p className="font-sans font-bold text-xs mt-1">03407030076</p>
              </div>

              <div className="text-right">
                <p style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>منڈیگمری، پوہڑ، ساہیوال</p>
                <p style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>اچ نزد برول جمعہ</p>
                <p className="font-sans font-bold mt-1">UAN: (040)111555</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
