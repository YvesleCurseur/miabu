

const InputField = ({ name, type, label, value, error, onChange }) => (
  <>
    <label htmlFor={name} className="block text-xl font-medium text-gray-700">
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
      className={`mt-1 block w-full px-3 py-2 border placeholder-gray-400 focus:outline-none focus:border-red-500 sm:text-sm ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && (
      <div>
      <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    )}
  </>
);

export default InputField