// Vinyl player — decorative pixel-art display. No overlay or hover card.
// The Now Playing card has been removed; the vinyl art stays as a grounded room object.

export default function VinylPlayer() {
  return (
    <div className="ab-vinyl">
      <img
        src="/images/about/pixel-art-vinyl-table.png"
        alt="Pixel-art vinyl player"
        className="av-art"
        style={{ aspectRatio: '1536 / 1024' }}
      />
      <style>{`
        .ab-vinyl {
          position: absolute;
          left: 1.8%;
          top: 40.8%;
          width: 49%;
          z-index: 1;
          line-height: 0;
        }
        .av-art {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          user-select: none;
        }
        @media (max-width: 760px) {
          .ab-vinyl {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 200px !important;
          }
        }
      `}</style>
    </div>
  )
}
