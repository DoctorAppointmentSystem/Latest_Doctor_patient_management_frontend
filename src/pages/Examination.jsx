import React from 'react';
import PLayout from '../pages/PatientHome';
function Examination() {
  return (
  <div>
    {/* <div className="p-6 bg-gray-100 min-h-screen"> */}
      {/* <div className="w-full mx-auto bg-white p-6 rounded shadow px-10"> */}
        {/* Header */}
        {/* <div className="border-b pb-4 mb-6"> */}
          {/* <h2 className="text-2xl font-semibold text-blue-700">Examination Page</h2> */}
          {/* <p className="text-gray-500">Doctor can record physical exam, vitals, and observations</p> */}
        {/* </div> */}

        

        {/* lens*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">lens _</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="lens_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="lens_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder='lens_max-250 character' className='p-2 border border-gray-300 rounded'/>
          <input type='text' placeholder='for R/L/B' className='p-2 border border-gray-300'/>
          <input type='text' placeholder='lens_max-250 character' className='p-2 border border-gray-300'/>
          <input type='text' placeholder='for R/L/B' className='p-2 border border-gray-300'/>
        </div>

        {/* AC */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">AC_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="AC_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="AC_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder='AC_max-250 character' className='p-2 border border-gray-300 rounded'/>
          <input type='text' placeholder='for R/L/B' className='p-2 border border-gray-300'/>
          <input type='text' placeholder='AC_max-250 character' className='p-2 border border-gray-300'/>
          <input type='text' placeholder='for R/L/B' className='p-2 border border-gray-300'/>
        </div>

        {/*Iris*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">iris_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="iris_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="iris_max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>
        {/*pipil*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">pupil_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="pupil_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="pupil_max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>
        {/* Cornea */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Cornea_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="cornea_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="cornea_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder='cornea_max-250 character' className='p-2 border border-gray-300 rounded'/>
          <input type='text' placeholder='for R/L/B' className='p-2 border border-gray-300'/>
          <input type='text' placeholder='cornea_max-250 character' className='p-2 border border-gray-300'/>
          <input type='text' placeholder='for R/L/B' className='p-2 border border-gray-300'/>
        </div>
        {/*conjunctiva*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Conjunctiva_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Conjunctiva_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Conjunctiva_max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>
        {/*lids*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Lids_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Lids_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Lids_max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>
        {/*vitreous */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Vitreous_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Vitreous_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Vitreous_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Vitreous_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded"/>
        </div>
        {/*Fundus */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Fundus_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Fundus_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Fundus_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Fundus_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded"/>
          <input type="text" placeholder="Fundus_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Fundus_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded"/>
          <input type="text" placeholder="Fundus_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded"/>
        </div>
        {/*CD Ratio */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">CD Ratio_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="CD Ratio__max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="CD Ratio__max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>
        {/*Optic disk*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Optic disk_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Optic disk__max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Optic disk__max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>
        {/*Finding*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Finding_</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input type="text" placeholder="Finding__max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Duration" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Finding__max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Duration" className="p-2 border border-gray-300 rounded" />
        </div>
        {/*Other external findings*/}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Other external findings_</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Other external findings_max-250 character" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Other external findings__max-250 character" className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="for R/L/B" className="p-2 border border-gray-300 rounded" />
        </div>





        {/* Action Buttons */}
        {/* <div className="flex justify-end gap-4">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Examination
          </button>
        </div> */}
      </div>
    
  
  );
}

export default Examination;
