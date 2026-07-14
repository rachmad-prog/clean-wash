export default function OutletFilter({ cities, selectedCity, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      <button
        onClick={() => onChange('')}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
          !selectedCity ? 'bg-primary-600 text-white shadow-pill' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
        }`}
      >
        Semua Outlet
      </button>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onChange(city)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            selectedCity === city ? 'bg-primary-600 text-white shadow-pill' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
