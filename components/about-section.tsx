"use client"

export default function AboutSection() {
  return (
    <div className="w-full px-4 md:px-8 py-20">
      <h2 className="text-5xl md:text-6xl font-bold text-center mb-12" style={{ color: "#F8EEDF" }}>
        About
        <span style={{ color: "#8E1616" }}> Me</span>
      </h2>

      <div className="max-w-3xl mx-auto">
        <div
          className="p-8 md:p-12 rounded-2xl border"
          style={{
            backgroundColor: "rgba(232, 201, 153, 0.05)",
            borderColor: "rgba(142, 22, 22, 0.3)",
          }}
        >
          <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: "#E8C999" }}>
            I'm Shreyas, a passionate video editor and logo designer with expertise in creating cinematic visual content
            that tells compelling stories. With years of experience in the industry, I've worked on diverse projects
            ranging from product showcases to brand montages.
          </p>

          <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: "#E8C999" }}>
            My approach combines technical precision with creative vision, ensuring every frame serves a purpose.
            Whether it's color grading, motion graphics, or logo design, I bring a unique aesthetic to every project
            through Centraverse.
          </p>

          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-8 border-t"
            style={{ borderColor: "rgba(142, 22, 22, 0.3)" }}
          >
            {["Editing", "Color Grade", "Motion Design", "Logo Design", "VFX", "Sound Design"].map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 rounded-lg text-sm font-medium text-center"
                style={{
                  backgroundColor: "rgba(142, 22, 22, 0.2)",
                  color: "#8E1616",
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
