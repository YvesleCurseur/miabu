

const InputField = ({ name, type, label, value, error, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      autoComplete={name}
      required
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && (
      <div>
      <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    )}
  </div>
);

export default InputField