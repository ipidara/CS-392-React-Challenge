import Modal from './Modal';

export interface Course {
  term: string;
  number: string;
  title: string;
  meets: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
}

const ScheduleModal = ({ isOpen, onClose, courses }: ScheduleModalProps) => {
  const hasCourses = courses.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-black">Course Plan</h2>

        {hasCourses ? (
          <ul className="divide-y">
            {courses.map((c, i) => (
              <li key={`${c.number}-${i}`} className="py-2">
                <div className="text-sm text-black">{c.number} — {c.title}</div>
                <div className="text-sm text-black">{c.meets}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-700 space-y-2">
            <p>You haven’t selected any courses yet!</p>
            <p className="text-gray-600">
              Click on a course below to add it to your schedule.
            </p>
          </div>
        )}

        <div className="pt-2">
          <button
            className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleModal;