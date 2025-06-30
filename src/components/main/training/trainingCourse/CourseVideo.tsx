import ReactPlayer from "react-player";

export default function CourseVideo() {
  return (
    <ReactPlayer
        src="/videos/JavaScript.mp4"
        controls
        width="100%"
        height={"100%"}
        config={{
          youtube: {
            color: "white",
          },
        }}
      />
  );
}
