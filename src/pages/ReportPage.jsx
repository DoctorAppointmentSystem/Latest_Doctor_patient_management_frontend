import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const ReportPage = () => {
  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: reportRef, 
  });

  return (
    <div className="w-full">
      {/* Print Button */}
      <div className="flex justify-end fixed w-full p-4 bg-primary">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-acent text-primary rounded-lg shadow hover:bg-highlight"
        >
          Print Report
        </button>
      </div>

      <div className="h-16">

      </div>

      {/* Printable Area */}
      <div
        ref={reportRef}
        className="w-full mx-auto p-6 bg-white rounded-lg flex flex-col mt-2"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p>Professor</p>
            <h1 className="text-3xl font-bold"> Dr. Ahmad Zeeshan Jamil</h1>
            <div className="text-sm">
              <p>MBBS, FRCS (Glasgow)</p>
              <p>FCPS, FCPS (VRO)</p>
              <p>MCPS, ICO (UK)</p>
            </div>
            <p className="text-sm">Sahiwal Medical College Sahiwal</p>
          </div>

          <div>logo</div>

          <div className="text-right">
            <p>پروفیسر</p>
            <h1 className="text-3xl font-bold"> ڈاکٹر احمد ذیشان جمیل</h1>
            <div className="text-sm">
              <p>ایم بی بی ایس، ایف آر سی ایس (گلاسگو)</p>
              <p>ایف سی پی ایس، ایف سی پی ایس (وی آر او)</p>
              <p>ایم سی پی ایس، آئی سی او (یو کے)</p>
            </div>
            <p className="text-sm">ساہیوال میڈیکل کالج، ساہیوال</p>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p>
              <span className="font-bold">Test</span> (40-years Male){" "}
            </p>
            <p className="text-[15px]">First Visit: June 20, 2025</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="border p-1 rounded-lg">June 20, 2025 6:52 p.m.</p>
            <p className="border p-1 rounded-lg w-[70%]">VCO Taken ✓</p>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex justify-between items-start">
          <div>
            <p>Test (40-years Male) | First Visit: June 20, 2025</p>
            <p>
              Systemic Disease History: DM from 10 years, HTN from 10 years
            </p>
            <p>VA: R 6/9, L 6/9</p>
            <p>Old Glasses</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p>Right Eye</p>
                <p>Sph -0.00, Cyl -1.00, Axis 90</p>
              </div>
              <div>
                <p>Left Eye</p>
                <p>Sph -0.00, Cyl -1.00, Axis 90</p>
              </div>
            </div>
            <div className="mt-4">
              <h3>Keratometry</h3>
              <div className="grid grid-cols-5 gap-4">
                <div>Right Eye</div>
                <div>K1 44.0</div>
                <div>K2 44.0</div>
                <div>AL</div>
                <div>P</div>
                <div>AC</div>
                <div>Aim</div>
                <div>Left Eye</div>
                <div>K1 44.0</div>
                <div>K2 44.0</div>
                <div>AL</div>
                <div>P</div>
                <div>AC</div>
                <div>Aim</div>
              </div>
            </div>
            <div className="mt-4">
              <h3>IOP</h3>
              <div className="grid grid-cols-4 gap-4">
                <div>For</div>
                <div>IOP</div>
                <div>Pachymetry</div>
                <div>CF</div>
                <div>Final</div>
                <div>(R)</div>
                <div>12</div>
                <div></div>
                <div></div>
                <div></div>
                <div>(L)</div>
                <div>12</div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p>Method:</p>
            </div>
          </div>
          <div className="text-right">
            <p>June 20, 2025 6:52 p.m.</p>
            <p>VCO Taken ✓</p>
            <h3>Rx</h3>
            <ol className="list-decimal list-inside">
              <li>2BLINK EYE DROPS</li>
              <li>ACYCLOVIR 200 TABLET</li>
            </ol>
            <p>Next Visit after 7 days</p>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex justify-between items-end">
          <div>
            <img
              src="/qr.png" // ✅ replace with your own image in public folder
              alt="QR Code"
              className="w-20 h-20"
            />
            <p>03407030076</p>
          </div>
          <div className="text-right">
            <p>سوئم رکن فیڈریشن آف پاکستان</p>
            <p>UAN: (040)111555558, 03407037661</p>
          </div>
        </div>
      </div>
    </div>
  );
};
