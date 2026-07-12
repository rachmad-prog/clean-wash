export default function OutletFilter({ cities, selectedCity, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      <button
        onClick={() => onChange('')}
        className={`px-4 py-2 rounded-full text-sm font-medium border ${
          !selectedCity ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-300 text-slate-600'
        }`}
      >
        Semua Kota
      </button>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onChange(city)}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            selectedCity === city ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-300 text-slate-600'
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
