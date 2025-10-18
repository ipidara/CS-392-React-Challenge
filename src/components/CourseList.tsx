import { useEffect, useState } from 'react';

interface CourseListProps {
  courses: Record<string, {
    term: string,
    number: string,
    title: string,
    meets: string
  }>
  onSelectionChange?: (ids: string[]) => void;
}

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const CourseList = ({ courses, onSelectionChange }: CourseListProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    onSelectionChange?.(selected);
  }, [selected, onSelectionChange]);

  const toggleSelected = (id: string) => {
    setSelected(prev => toggleList(id, prev));
  };

  return (
    <div className="container mx-auto px-4 w-svw">
      <h2 className="text-2xl">Selected Courses</h2>
      <ul className="ml-6 h-75 overflow-auto border border-[#4a505f] p-4 bg-[#e0e0e0] text-black mb-7">
        {
          selected.map(id => {
            const course = courses[id];
            return (
              <li key={`selected-${id}`}>
                {course ? `${course.term} CS ${course.number}: ${course.title}` : id}
              </li>
            );
          })
        }
      </ul>
      <ul className="grid grid-cols-3 gap-5">
        {
          Object.entries(courses).map(([id, course]) => {
            const isSelected = selected.includes(id);
            return (
              <li key={id} onClick={() => { 
                toggleSelected(id)}
                } className={`bg-[#e0e0e0] text-[#282c34] rounded-xl min-h-75 border-5 border-[#4a505f] text-left p-4
                ${isSelected 
                  ? 'bg-blue-200 border-blue-500 shadow-lg' 
                  : 'bg-[#e0e0e0] border-[#4a505f] hover:bg-blue-100'}
              `}>
                
                <h3 className="mx-5 mt-8 ml-4"> {course.term} CS {course.number} </h3>
                <p className="mt-3 text-2xl ml-4 mb-8 min-h-25 font-light"> {course.title} </p>
                <div className="border-t border-[#475161]">
                <p className="text-center text-xl mt-3 font-light"> 
                    {course.meets}
                </p>
              </div>
          </li>
          )}
          )
        }

      </ul>
    </div>
  )
}

export default CourseList;