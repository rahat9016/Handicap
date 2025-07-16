import CourseCard from "./CourseCard";

export default function CoursesList() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 9 }, (_, index) => (
        <CourseCard
          id={index}
          key={index}
          title="Disability Data Collection Methods"
          description="Video tutorial on using the Washington Group Questionnaire for disability data collection in humanitarian contexts."
          imageUrl="/images/resources/image.jpg"
          isFeatured
          level="Beginner"
          duration="2.00 Hours"
        />
      ))}
    </div>
  );
}
