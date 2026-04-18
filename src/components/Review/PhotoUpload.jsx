import { useRef, useState } from 'react'
import { runAiScan } from '../../utils/aiScan'

export default function PhotoUpload({ photos, onAdd, onRemove }) {
  const fileRef   = useRef(null)
  const camRef    = useRef(null)
  const videoRef  = useRef(null)
  const [camOpen, setCamOpen]       = useState(false)
  const [stream,  setStream]        = useState(null)
  const [aiResult, setAiResult]     = useState(null)
  const [scanning, setScanning]     = useState(false)

  /* ── file upload ── */
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => addPhoto(ev.target.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  /* ── camera ── */
  const openCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      setStream(s)
      setCamOpen(true)
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = s }, 100)
    } catch {
      /* fallback: open file picker with capture */
      camRef.current?.click()
    }
  }

  const closeCamera = () => {
    stream?.getTracks().forEach((t) => t.stop())
    setStream(null)
    setCamOpen(false)
  }

  const captureFrame = () => {
    const video  = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width  = video.videoWidth  || 640
    canvas.height = video.videoHeight || 480
    canvas.getContext('2d').drawImage(video, 0, 0)
    addPhoto(canvas.toDataURL('image/jpeg', 0.85))
    closeCamera()
  }

  /* ── shared add + AI scan ── */
  const addPhoto = async (dataUrl) => {
    onAdd(dataUrl)
    setScanning(true)
    setAiResult(null)
    const detections = await runAiScan()
    setAiResult(detections)
    setScanning(false)
  }

  return (
    <div>
      {/* Buttons row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button
          type="button"
          onClick={openCamera}
          style={optBtn}
          onMouseEnter={(e) => applyHover(e, true)}
          onMouseLeave={(e) => applyHover(e, false)}
        >
          <span style={{ fontSize: 20 }}>📷</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>Take photo</span>
        </button>

        <label style={{ ...optBtn, cursor: 'pointer' }}
          onMouseEnter={(e) => applyHover(e, true)}
          onMouseLeave={(e) => applyHover(e, false)}
        >
          <span style={{ fontSize: 20 }}>🖼</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>Upload photo</span>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </label>

        {/* hidden input for camera fallback */}
        <input ref={camRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleFile} />
      </div>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
          {photos.map((src, i) => (
            <div key={i} style={{ position: 'relative', width: 66, height: 54, borderRadius: 'var(--r-sm)', overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
              <img src={src} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Remove photo ${i + 1}`}
                style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--red)', color: 'white',
                  border: '1.5px solid white',
                  fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', lineHeight: 1,
                }}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {/* AI scan result */}
      {(scanning || aiResult) && (
        <div style={{
          background: 'var(--green-light)',
          border: '1px solid #86efac',
          borderRadius: 'var(--r-md)',
          padding: '10px 12px',
          display: 'flex', alignItems: 'flex-start', gap: 9,
        }}
          role="status" aria-live="polite"
        >
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--green)', flexShrink: 0, marginTop: 3,
            animation: scanning ? 'pulse 1.5s infinite' : 'none',
          }} />
          <div>
            <div style={{ fontSize: 12, color: 'var(--green-dark)', fontWeight: 500, lineHeight: 1.5 }}>
              {scanning ? 'Analyzing photo for accessibility features...' : 'AI detected:'}
            </div>
            {aiResult && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 5 }}>
                {aiResult.map(([label, type]) => (
                  <span key={label} style={{
                    padding: '3px 8px', borderRadius: 'var(--r-full)',
                    fontSize: 11, fontWeight: 600,
                    background: type === 'pos' ? 'var(--green-light)' : 'var(--red-light)',
                    color:      type === 'pos' ? 'var(--green-dark)'  : 'var(--red)',
                    border: `1px solid ${type === 'pos' ? '#86efac' : '#fca5a5'}`,
                  }}>{label}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live camera modal */}
      {camOpen && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15,23,42,0.6)',
          zIndex: 300, display: 'flex',
          alignItems: 'flex-end', justifyContent: 'center',
          minHeight: 400,
        }}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-xl) var(--r-xl) 0 0', width: '100%', padding: '20px 20px 28px' }}>
            <div style={{ width: 32, height: 3, background: 'var(--surface-3)', borderRadius: 2, margin: '0 auto 16px' }} />
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'var(--r-lg)', background: '#0f172a' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 14 }}>
              <button
                type="button"
                onClick={closeCamera}
                style={{ ...sideBtn }}
              >✕</button>
              <button
                type="button"
                onClick={captureFrame}
                aria-label="Capture photo"
                style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--surface)',
                  border: '3px solid var(--surface-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                  boxShadow: '0 2px 10px rgba(22,163,74,0.4)',
                }} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (stream) {
                    const tracks = stream.getVideoTracks()
                    tracks.forEach((t) => { t._facingMode = t._facingMode === 'user' ? 'environment' : 'user' })
                  }
                }}
                style={{ ...sideBtn }}
              >🔄</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const optBtn = {
  flex: 1, background: 'var(--surface)',
  border: '1.5px dashed var(--border-2)',
  borderRadius: 'var(--r-md)',
  padding: '14px 8px',
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', gap: 5,
  transition: 'all var(--t)',
}
const sideBtn = {
  width: 38, height: 38, borderRadius: 'var(--r-md)',
  background: 'var(--surface-2)', border: '1px solid var(--border)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 15, cursor: 'pointer', fontFamily: 'var(--font)',
}
const applyHover = (e, on) => {
  e.currentTarget.style.borderColor = on ? 'var(--green)' : 'var(--border-2)'
  e.currentTarget.style.background  = on ? 'var(--green-light)' : 'var(--surface)'
}
