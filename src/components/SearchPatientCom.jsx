import PatientTable from "./PatientTable"
import SearchComEmbend from "./SearchComEmbend"
import SimpleSearch from "./SimpleSearch"

function SearchPatientCom() {
  return (
    <div className='flex flex-col gap-4'>

      <SearchComEmbend />

      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4">
       <SimpleSearch />
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-semibold text-primary">Find or Select form today's appointments, created or visited list below</h2>
            <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg">Show Checked Out</button>
          </div>

          <PatientTable />
        </div>

      </div>
    </div>
  )
}

export default SearchPatientCom