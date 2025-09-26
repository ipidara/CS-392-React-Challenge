interface CourseListProps {
  courses: Record<string, {
    term: string;
    number: string;
    title: string;
  }>
}

const CourseList = ({ courses }: CourseListProps) => (
  <ul>
    {
        Object.entries(courses).map(([id, course]) => (
      <li key={id}>
        {course.term} CS {course.number}: {course.title}
      </li>
      ))
     }
  </ul>
)

export default CourseList;