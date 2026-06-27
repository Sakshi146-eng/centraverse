import BackButton from "../../../components/back-button"
import { notFound } from "next/navigation"
import { cardList } from "../../../lib/data"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const card = cardList.find((c) => c.id === id)

  if (!card) {
    notFound()
  }

  return (
    <main
      style={{
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        color: "var(--white)",
        fontFamily: "var(--font-body)",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Back Button */}
        <BackButton />

        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontStyle: "italic",
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {card.title}
          </h1>

          <div
            style={{
              width: "100%",
              height: "50vh",
              minHeight: "400px",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <img
              src={card.img}
              alt={card.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Content Placeholder */}
        <section
          style={{
            backgroundColor: "var(--bg-card)",
            padding: "3rem",
            borderRadius: "1rem",
            border: "1px dashed var(--border)",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--white)" }}>Project Overview</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.6, color: "var(--off-white)" }}>
            This is a placeholder for the content of the {card.title} project. You can add text, videos,
            galleries, or any other details about this specific card here. The design follows the
            overall premium aesthetic of the site.
          </p>
        </section>
      </div>
    </main>
  )
}
