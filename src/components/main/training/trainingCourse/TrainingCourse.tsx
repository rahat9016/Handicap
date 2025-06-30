"use client";
import { useParams } from "next/navigation";

export default function TrainingCourse() {
  const params = useParams<{ local: string; id: string }>();
  console.log(params.id);
  return <div>TrainingCourse</div>;
}
