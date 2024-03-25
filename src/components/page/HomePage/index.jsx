import { useState } from "react";
import useQuery from "../../../hook/useQuery";
import { courseService } from "@/services/courseService";
import HeroSection from "./HeroSection";
import CourseComingSection from "./CourseComingSection ";
import CoursesSection from "./CoursesSection ";
import TeacherSection from "./TeacherSection ";
import FeaturedSection from "./FeaturedSection ";
import TestimonialSection from "./TestimonialSection ";
import FaqSection from "./FaqSection ";
import GallerySection from "./GallerySection ";
import CallRegisterSection from "./CallRegisterSection ";
import { teamService } from "../../../services/teamService";
import { questionService } from "../../../services/questionService";
import { galleryService } from "../../../services/galleryService";

const HomePage = () => {
  // COURSES
  const {
    data: coursesData,
    error: coursesError,
    loading: coursesLoading,
  } = useQuery(courseService.getCourses);

  const { courses, pagination } = coursesData || {};

  const comingCourses = coursesData?.courses?.filter(
    (course) =>
      course.startDate && new Date(course.startDate) > new Date("2024-09-04")
  );

  // TEAM
  const {
    data: teamData,
    error: teamError,
    loading: teamLoading,
  } = useQuery(teamService.getTeams);
  const teams = teamData?.teams || [];

  // FAQ
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionsData?.questions || [];

  // GALLERY
  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];

  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={comingCourses} loading={coursesLoading} />
      <CoursesSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamLoading} />
      <FeaturedSection />
      <TestimonialSection />
      <FaqSection questions={questions} loading={questionsLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
