import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import ScheduleModal from './ScheduleModal';

interface Course {
  term: string;
  number: string;
  title: string;
  meets: string;
}

interface TermPageProps {
  courses: Record<string, Course>;
}

const TermPage = ({ courses }: TermPageProps) => {
  const [selection, setSelection] = useState('Fall');
  const [planOpen, setPlanOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCourses = Object.fromEntries(
    Object.entries(courses).filter(([_, course]) => course.term === selection)
  );

  const selectedCourses = selectedIds
    .map(id => filteredCourses[id])
    .filter(Boolean);


  return (
    <div>
      <div className="flex items-center justify-between">
      <TermSelector selection={selection} setSelection={setSelection} />
      <button
        className="px-4 py-2 rounded-lg bg-transparent border-white border-2 text-white hover:bg-white hover:text-black"
        onClick={() => setPlanOpen(true)}
      >
        Course Plan
      </button>
    </div>
    <CourseList courses={filteredCourses} onSelectionChange={setSelectedIds} />
    <ScheduleModal isOpen={planOpen} onClose={() => setPlanOpen(false)} courses={selectedCourses} />
    </div>
  );
};

export default TermPage;