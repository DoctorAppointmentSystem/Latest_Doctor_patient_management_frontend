// import React, { useEffect, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import { getVisitById } from "../api/visits";

// export const ReportPage = () => {
//   const reportRef = useRef();
//   const visitId = "68e94852f9abd1dcc9fcceaf"; // Example visit ID, replace with actual ID as needed

//   const handlePrint = useReactToPrint({
//     contentRef: reportRef, 
//   });



  // useEffect(() => {
  //   const fetchVisitData = async () => {
  //     try {
  //         const data = await getVisitById(visitId); 
  //         console.log("Fetched visit data:", data);
  //     }
  //     catch (error) {
  //       console.error("Error fetching visit data:", error);
  //     }
  //   };

  //   fetchVisitData();
  // }, []);

//   return (
//     <div className="w-full">
//       {/* Print Button */}
//       <div className="flex justify-end fixed w-full p-4 bg-primary">
//         <button
//           onClick={handlePrint}
//           className="px-4 py-2 bg-acent text-primary rounded-lg shadow hover:bg-highlight"
//         >
//           Print Report
//         </button>
//       </div>

//       <div className="h-16">

//       </div>

//       {/* Printable Area */}
//       <div
//         ref={reportRef}
//         className="w-full mx-auto p-6 bg-white rounded-lg flex flex-col mt-2"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <p>Professor</p>
//             <h1 className="text-3xl font-bold"> Dr. Ahmad Zeeshan Jamil</h1>
//             <div className="text-sm">
//               <p>MBBS, FRCS (Glasgow)</p>
//               <p>FCPS, FCPS (VRO)</p>
//               <p>MCPS, ICO (UK)</p>
//             </div>
//             <p className="text-sm">Sahiwal Medical College Sahiwal</p>
//           </div>

//           <div>logo</div>

//           <div className="text-right">
//             <p>پروفیسر</p>
//             <h1 className="text-3xl font-bold"> ڈاکٹر احمد ذیشان جمیل</h1>
//             <div className="text-sm">
//               <p>ایم بی بی ایس، ایف آر سی ایس (گلاسگو)</p>
//               <p>ایف سی پی ایس، ایف سی پی ایس (وی آر او)</p>
//               <p>ایم سی پی ایس، آئی سی او (یو کے)</p>
//             </div>
//             <p className="text-sm">ساہیوال میڈیکل کالج، ساہیوال</p>
//           </div>
//         </div>

//         <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center">
//           <div>
//             <p className="flex gap-2">
//               <span className="font-bold">User Name</span> (40-years Male){" "}
//               <div className="flex gap-2">
//               <h3 className="font-bold">City :</h3>
//               <span>Sahiwal</span>
//               </div>
//             </p>
//             <p className="text-[15px]">
//               <p>
//                 Mob +923030458064 <span className="mx-2">(W/O) AltafHussain</span> Visit : sep 25,2025
//               </p>
//             </p>
//           </div>
//           <div className="flex flex-col gap-2">
//             <p className="border p-1 rounded-lg">June 20, 2025 6:52 p.m.</p>
//             <p className="border p-1 rounded-lg w-[70%]">VCO Taken ✓</p>
//           </div>
//         </div>

//         <div className="border-t border-gray-300 my-4"></div>
//         <div className="flex justify-between items-start">
//           <div>
//             <p>Test (40-years Male) | First Visit: June 20, 2025</p>
//             <p>
//               Systemic Disease History: DM from 10 years, HTN from 10 years
//             </p>
//             <p>VA: R 6/9, L 6/9</p>
//             <p>Old Glasses</p>
//             <div className="grid grid-cols-2 gap-4 mt-2">
//               <div>
//                 <p>Right Eye</p>
//                 <p>Sph -0.00, Cyl -1.00, Axis 90</p>
//               </div>
//               <div>
//                 <p>Left Eye</p>
//                 <p>Sph -0.00, Cyl -1.00, Axis 90</p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <h3>Keratometry</h3>
//               <div className="grid grid-cols-5 gap-4">
//                 <div>Right Eye</div>
//                 <div>K1 44.0</div>
//                 <div>K2 44.0</div>
//                 <div>AL</div>
//                 <div>P</div>
//                 <div>AC</div>
//                 <div>Aim</div>
//                 <div>Left Eye</div>
//                 <div>K1 44.0</div>
//                 <div>K2 44.0</div>
//                 <div>AL</div>
//                 <div>P</div>
//                 <div>AC</div>
//                 <div>Aim</div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <h3>IOP</h3>
//               <div className="grid grid-cols-4 gap-4">
//                 <div>For</div>
//                 <div>IOP</div>
//                 <div>Pachymetry</div>
//                 <div>CF</div>
//                 <div>Final</div>
//                 <div>(R)</div>
//                 <div>12</div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div>(L)</div>
//                 <div>12</div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//               <p>Method:</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <p>June 20, 2025 6:52 p.m.</p>
//             <p>VCO Taken ✓</p>
//             <h3>Rx</h3>
//             <ol className="list-decimal list-inside">
//               <li>2BLINK EYE DROPS</li>
//               <li>ACYCLOVIR 200 TABLET</li>
//             </ol>
//             <p>Next Visit after 7 days</p>
//           </div>
//         </div>
//         <div className="border-t border-gray-300 my-4"></div>
//         <div className="flex justify-between items-end">
//           <div>
//             <img
//               src="/qr.png" // ✅ replace with your own image in public folder
//               alt="QR Code"
//               className="w-20 h-20"
//             />
//             <p>03407030076</p>
//           </div>
//           <div className="text-right">
//             <p>سوئم رکن فیڈریشن آف پاکستان</p>
//             <p>UAN: (040)111555558, 03407037661</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const ReportPage = () => {
  const reportRef = useRef();
  const visitId = "68e94852f9abd1dcc9fcceaf";

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "Patient-Report",
  });

    useEffect(() => {
    const fetchVisitData = async () => {
      try {
          const data = await getVisitById(visitId); 
          console.log("Fetched visit data:", data);
      }
      catch (error) {
        console.error("Error fetching visit data:", error);
      }
    };

    fetchVisitData();
  }, []);

  return (
    <div className="bg-gray-200 p-8">
      {/* --- Print Button (Hidden on Print) --- */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Print Report
        </button>
      </div>

      {/* --- Printable Area (A4 Paper Size) --- */}
      <div
        ref={reportRef}
        className="w-[210mm] min-h-[297mm] mx-auto p-6 bg-white shadow-lg text-sm"
      >
        {/* --- Header --- */}
        <header className="flex justify-between items-start mb-4">
          <div className="text-left">
            <p className="font-semibold">Professor</p>
            <h1 className="text-2xl font-bold"> Dr. Ahmad Zeeshan Jamil</h1>
            <p>MBBS, FRCS (Glasgow)</p>
            <p>FCPS, FCPS (VRO)</p>
            <p>MCPS, ICO (UK)</p>
            <p>Sahiwal Medical College Sahiwal</p>
          </div>
          <div className="w-24 h-24 flex items-center justify-center">
            {/* Replace with your logo */}
                      </div>
          <div className="text-right font-['Noto_Nastaliq_Urdu']">
            <p className="font-semibold">پروفیسر</p>
            <h1 className="text-2xl font-bold"> ڈاکٹر احمد ذیشان جمیل</h1>
            <p>ایم بی بی ایس، ایف آر سی ایس (گلاسگو)</p>
            <p>ایف سی پی ایس، ایف سی پی ایس (وی آر او)</p>
            <p>ایم سی پی ایس، آئی سی او (یو کے)</p>
            <p>ساہیوال میڈیکل کالج، ساہیوال</p>
          </div>
        </header>

        {/* --- Patient Details --- */}
        <section className="border border-black p-2 rounded-md flex justify-between items-center text-xs">
          <div>
            <p><span className="font-bold">Rukshanda Yasmeen</span> (52-years Female) | <span className="font-bold">City:</span> Sahiwal</p>
            <p>Mob: +92 3346119871 | (W/O) Altaf Hussain | First Visit: Sept 9, 2025</p>
          </div>
          <div className="text-right">
            <p>Pt. Id. 9</p>
          </div>
        </section>

        {/* --- Main Content --- */}
        <main className="grid grid-cols-2 gap-x-6 mt-1 flex-grow">
          {/* --- Left Column --- */}
          <div className="space-y-3">
            <div className="border border-black rounded-md p-2">
              <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1">Systemic Disease History</h3>
              <p>DM from 15 years, HTN from 15 years.</p>
            </div>

            <div className="border border-black rounded-md p-2 grid grid-cols-2">
                <div><span className="font-bold">VA:</span></div>
                <div>
                  <p>(R) 6/18</p>
                  <p>(L) 6/24</p>
                </div>
            </div>

            <div className="border border-black rounded-md p-2">
              <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1">IOP</h3>
              <div className="grid grid-cols-5 text-center font-semibold">
                <span>For</span><span>IOP</span><span>Pachymetry</span><span>CF</span><span>Final</span>
              </div>
              <div className="grid grid-cols-5 text-center">
                <span>(R)</span><span>15</span><span></span><span></span><span></span>
                <span>(L)</span><span>15</span><span></span><span></span><span></span>
              </div>
              <p className="mt-2"><span className="font-bold">Method:</span></p>
            </div>

            <div className="border border-black rounded-md p-2">
              <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1">History</h3>
              <p><span className="font-bold">Ocular History:</span> (B/L) Intravitreal anti VEGF elsewhere, Retinal Laser elsewhere.</p>
              <p><span className="font-bold">Presenting Complaints:</span> (B/L) Decreased vision.</p>
            </div>

            <div className="border border-black rounded-md p-2 space-y-1">
              <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1">Examination</h3>
              <p><span className="font-bold">Lens:</span> (B/L) Cataract.</p>
              <p><span className="font-bold">AC:</span> (B/L) Clear.</p>
              <p><span className="font-bold">Pupil:</span> (B/L) PERLA.</p>
              <p><span className="font-bold">Cornea:</span> (B/L) Clear.</p>
              <p><span className="font-bold">Vitreous:</span> (R) Vitreous haemorrhage. (L) Taut posteror hyaloid.</p>
              <p><span className="font-bold">Fundus:</span> (L) Macular exudation, Macular micraneurysms. (B/L) Laser marks.</p>
              <p><span className="font-bold">Optic Disk:</span> (L) Temporal Pallor.</p>
            </div>

            <div className="border border-black rounded-md p-2">
              <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1">Diagnosis</h3>
              <p><span className="font-bold">Diagnosis:</span> Diabetic Retinopathy.</p>
            </div>
          </div>

          {/* --- Right Column --- */}
          <div className="space-y-3">
            <div className="border border-black rounded-md p-2 min-h-[150px]">
              <h3 className="font-bold text-center bg-gray-200 -m-2 mb-2 p-1">Rx</h3>
              <p>1- NEPOPT EYE DROPS</p>
              <p className="font-['Noto_Nastaliq_Urdu'] text-right">ایک قطرہ ہر دو گھنٹے بعد دونوں آنکھوں میں ۔ ایک ماہ</p>
            </div>

            <div className="border border-black rounded-md p-2 space-y-2 text-xs">
              <p>Referred to medical specialist for the management of systemic disease/s</p>
              <p><span className="font-bold">Advised:</span></p>
              <p>CBC, HbA1c, Blood sugar random, Fasting lipid profile, RFT's.</p>
              <p><span className="font-bold">Advised:</span></p>
              <p>Intravitreal anti VEGF injections (Patizra/Eylea/Vabysmo) in left eye. Three injections, one injection each month.</p>
              <p>Dilated fundi examination before and after each intravitreal injection.</p>
              <p>followed by Macular focal laser Left eye + PRP enhancement both eyes.</p>
            </div>

            <div className="border border-black rounded-md p-2">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="font-bold">
                    <td></td><td>SPH</td><td>CYL</td><td>AXIS</td><td>VA</td><td>Add</td><td>N.V</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">R</td><td></td><td></td><td></td><td>6/18</td><td>+2.75</td><td>N8</td>
                  </tr>
                  <tr>
                    <td className="font-bold">L</td><td></td><td></td><td></td><td>6/24</td><td>+2.75</td><td>N8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* --- Footer --- */}
        <footer className="mt-auto pt-4 flex justify-between items-end">
          <div className="text-left">
            <div className="w-20 h-20 border border-black flex items-center justify-center text-gray-400">QR Code</div>
            <p className="text-xs">02734919528JEC</p>
          </div>
          <div className="text-center text-xs font-['Noto_Nastaliq_Urdu']">
            <p>وامق ہسپتال نزد پرانی چونگی، ساہیوال</p>
            <p><span className="font-sans font-bold">اوقات کلینک:</span> شام 3 تا 6 بجے</p>
            <p>بروز سوموار، منگل، بدھ، جمعرات، ہفتہ</p>
            <p>ا آنے سے پہلے صبح 9 سے 10 بجے تک رابطہ کرکے تشریف لائیں</p>
            <p className="font-sans font-bold">03407030076</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-['Noto_Nastaliq_Urdu']">منڈیگمری، پوہڑ، ساہیوال</p>
            <p className="font-['Noto_Nastaliq_Urdu']">اچ نزد برول جمعہ</p>
            <p><span className="font-bold">UAN:</span> (040)111555</p>
          </div>
        </footer>
      </div>
    </div>
  );
};