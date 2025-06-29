import CourseCard from "./CourseCard";

export default function CoursesList() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 9 }, (_, index) => (
        <CourseCard
          key={index}
          title="Disability Data Collection Methods"
          description="Video tutorial on using the Washington Group Questionnaire for disability data collection in humanitarian contexts."
          imageUrl="/images/resources/image.jpg"
          date="10/05/2023"
          size="2.4 MB"
          downloads={347}
          ratings={3.2}
          isFeatured
          isPdf
        />
      ))}
    </div>
  );
}
