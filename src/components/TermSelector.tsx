interface TermSelectorProps {
  selection: string;
  setSelection: (term: string) => void;
}

const terms = ['Fall', 'Winter', 'Spring'];

const TermSelector = ({ selection, setSelection }: TermSelectorProps) => (
  <div className="flex justify-center gap-4 my-4">
    {terms.map(term => (
      <button
        key={term}
        className={`px-4 py-2 rounded-lg border 
          ${term === selection ? 'bg-white text-black' : 'bg-transparent text-white border-[#ffffff]'}
        `}
        data-cy={term}
        onClick={() => setSelection(term)}
      >
        {term}
      </button>
    ))}
  </div>
);

export default TermSelector;